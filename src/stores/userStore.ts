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
import { Auth0Client, User, createAuth0Client } from "@auth0/auth0-spa-js";

export interface UserInfo {
  username: string
  userId: string
  email: string
  profileImage: string
}


export const useUserStore = defineStore('userStore', () => {

  const gamePlayStore = useGamePlayStore();
  const { participantDetails } = storeToRefs(gamePlayStore)

  provideApolloClient(apolloClient);

  let auth0: Auth0Client;
  const auth0Config = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  };

  createAuth0Client(auth0Config).then((client) => {
    auth0 = client;
  });


  const userInfo = ref<UserInfo>({
    username: '',
    userId: '',
    email: '',
    profileImage: ''
  });


  const setUserDetails = (userInfoVal: UserInfo) => {
    userInfo.value = userInfoVal
  }

  const signInWithGoogle = async () => {
    await auth0.loginWithPopup();
    const token2 = await auth0.getIdTokenClaims();
    const user = await auth0.getUser();
    localStorage.setItem('auth:token', token2?.__raw ?? '')
    localStorage.setItem('auth:user', JSON.stringify(user))
    console.log(user)
    asyncSetUser();
  }

  const asyncSetUser = async () => {
    try {
      let userDetails: any;
      try {
        const user = await auth0.getUser();
        userDetails = user;
      } catch (error1) {
        const localUser = localStorage.getItem('auth:user')
        if (!userDetails && localUser && localUser != '') {
          userDetails = JSON.parse(localUser) as User;
        }
      }

      if (userDetails && userDetails.name) {
        const filter: UserSearchFilterInput = {
          email: {
            eq: userDetails.email
          }
        };
        const { onResult, onError } = useQuery(userExistsQuery, { filter: filter });
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



  const signOut = async () => {
    try {
      localStorage.setItem('auth:token', '')
      localStorage.setItem('auth:user', '')
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
      await auth0.logout({ logoutParams: { localOnly: true, returnTo: window.location.toString() } })

    } catch (error) {
      console.log("Something went wrong in signout", error);
    }
  }

  return { userInfo, setUserDetails, signInWithGoogle, asyncSetUser, signOut }
})

