import { ref, computed, inject } from 'vue'
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
import {Auth0Client, createAuth0Client} from "@auth0/auth0-spa-js";

export interface UserInfo {
  username: string
  userId: string
  email: string
  profileImage: string
}


export const useUserStore = defineStore('userStore', () => {

  provideApolloClient(apolloClient);

  const userInfo = ref<UserInfo>({
    username: '',
    userId: '',
    email: '',
    profileImage: ''
  });
  const auth0Config = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  };

  let auth0:Auth0Client;
  createAuth0Client(auth0Config).then((client)=>
  {
    auth0=client;
  });
  
  
  const gamePlayStore = useGamePlayStore();
  const { participantDetails } = storeToRefs(gamePlayStore)

  const setUserDetails = (userInfoVal: UserInfo) => {
    userInfo.value = userInfoVal
  }

  const signInWithGoogle = async() => {
    await auth0.loginWithPopup();
    const auth=await auth0.isAuthenticated();
    const token2=await auth0.getIdTokenClaims();
    console.log(token2);

    const token=await auth0.getTokenSilently();
    console.log(token);
    const user =await auth0.getUser();
    console.log(user)
    asyncSetUser();

  }

  async function asyncSetUser() {
    try {
      const auth=await auth0.isAuthenticated();
      const user =await auth0.getUser();
      const userDetails: any = user;
      if (userDetails && userDetails.name) {
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
            });
            onCreateUserError((error: ApolloError) => {
              console.log("error create user", error);
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
      await auth0.logout({logoutParams:{localOnly: true,returnTo:window.location.toString()}})

    } catch (error) {
      console.log("Something went wrong in signout", error);
    }
  }

  return { userInfo, setUserDetails, signInWithGoogle, asyncSetUser, signOut }
})
