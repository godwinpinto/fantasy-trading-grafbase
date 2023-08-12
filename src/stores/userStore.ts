import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGamePlayStore } from '@/stores/gamePlayStore';
import { storeToRefs } from 'pinia'
import { provideApolloClient, useMutation, useQuery } from '@vue/apollo-composable'
import { userExistsQuery } from '@/graphql/queries';
import type { UserCreateInput, UserCreatePayload, UserSearchConnection, UserSearchFilterInput } from '@/graphql/schemaTypes';
import type { ApolloError } from '@apollo/client/errors';
import type { IApolloResult } from '@/utils/commonInterfaces';
import { createNewUser } from '@/graphql/mutations';
import { apolloClient } from '@/utils/apolloLink'
import { useAuth0 } from '@auth0/auth0-vue';

export interface UserInfo {
  username: string
  userId: string
  email: string
  profileImage: string
}


export const useUserStore = defineStore('userStore', () => {

  const newApolloClient = provideApolloClient(apolloClient);

  const userInfo = ref<UserInfo>({
    username: '',
    userId: '',
    email: '',
    profileImage: ''
  })


/*   const authInfo = {
    attributes: {
      name: "godwin",
      email: "godwin.pinto86@gmail.com",
      picture: ""
    }
  } */

  const gamePlayStore = useGamePlayStore();
  const { loginWithPopup,logout} = useAuth0();
  const { participantDetails } = storeToRefs(gamePlayStore)

  const setUserDetails = (userInfoVal: UserInfo) => {
    userInfo.value = userInfoVal
  }

  const signInWithGoogle = () => {
    console.log("signin");
    loginWithPopup();
  }

  async function asyncSetUser(user:any) {
    try {
        console.log("usersssss",user);
      const userDetails: any = user;
      if (userDetails && userDetails.name) {
        console.log("user", userDetails);

        const variables: UserSearchFilterInput = {
          email: {
            eq: userDetails.email
          }
        };
        const { onResult, onError } = useQuery(userExistsQuery, { filter: variables });
        onResult((results: IApolloResult) => {
          if (results.loading) return
          const userResponse = results.data.userSearch as UserSearchConnection;
          if (userResponse.edges.length == 1) {
            const userNode = userResponse.edges[0].node;
            userInfo.value = {
              username: userDetails.name,
              userId: userNode.id,
              email: userDetails.email,
              profileImage: userDetails.picture
            }
            console.log("already present")
          } else {
            const email = userDetails.email;
            const username = userDetails.name;
            const profileImage = userDetails.picture;
            const createUserVariable: UserCreateInput = {
              email: email,
              profileImage: profileImage,
              username: username
            }

            const { mutate: createUserMutate, onDone: onCreateUserResult, onError: onCreateUserError } = useMutation(createNewUser, { variables: { input: createUserVariable } })
            onCreateUserResult((results: any) => {
              const userCreateResponse = results.data.userCreate as UserCreatePayload;

              userInfo.value = {
                username: userDetails.name,
                userId: userCreateResponse.user?.id ?? 'undefined',
                email: userDetails.email,
                profileImage: userDetails.picture
              }

              console.log("create user success", results);
            });
            onCreateUserError((error: ApolloError) => {
              console.log("error create error", error);
            });
            createUserMutate();
          }
        })
        onError((error: ApolloError) => {
          console.log("error", error);
        })

      } else {
        console.log("user is not logged in");
      }
    } catch (error) {
      console.log("Something went wrong in authentication", error)
    }
  }



  const signOut = async() => {
    try {
      participantDetails.value = {
        id: '',
        user: {
          id: '',
          username: '',
          profileImage: ''
        },
        balanceAmount: 0,
        betType: '',
        stockCode: '',
        stockUnitBuyPrice: 0,
        stockUnits: 0,
        contestId: ''
      }
      await logout({logoutParams:{localOnly: true}})

    } catch (error) {
      console.log("Something went wrong in signout", error);
    }
  }

  return { userInfo, setUserDetails, signInWithGoogle, asyncSetUser, signOut }
})
