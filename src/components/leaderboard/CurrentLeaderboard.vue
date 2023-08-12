<script setup lang="ts">
import { computed, inject, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia'
import { useGamePlayStore } from '@/stores/gamePlayStore';
import { watch, ref } from 'vue';
import IconCurrency from '@/components/icons/IconCurrency.vue';
import { formatAmount, calculateProfitOrLoss } from '@/utils/utility';
import { provideApolloClient, useMutation, useQuery } from '@vue/apollo-composable'
import type { ApolloError } from '@apollo/client/errors';
import type { IApolloResult } from '@/utils/commonInterfaces';
import { updateContestMutation, createContestStockMutation, createContestStockFeedMutation, updateContestStockFeedMutation, createContestMutation } from '@/graphql/mutations';
import { apolloClient } from '@/utils/apolloLink'
import type { ParticipantSearchEdge, ParticipantSearchConnection, ParticipantSearchFilterInput, ContestStock, ContestStockSearchEdge, ContestStockSearchConnection, ContestStockSearchFilterInput, IntOperationsInput, ContestByInput, ContestUpdateInput, Contest, ContestStockCreateInput, ContestStockFeedSearchFilterInput, ContestStockFeedSearchConnection, ContestStockFeedUpdateInput, ContestStockFeedByInput, ContestCreateInput, ContestSearchConnection, ContestSearchFilterInput, FloatOperationsInput, Participant, ParticipantCreateInput, ParticipantCreatePayload, ParticipantUpdateInput, UserCreateInput, UserCreatePayload, UserSearchConnection, UserSearchFilterInput } from '@/graphql/schemaTypes';
import { activeContestQuery, getLeaderboardByContestIdQuery, getContestStockFeedByContestIdQuery, getContestStockByContestIdQuery } from '@/graphql/queries';


const userStore = useUserStore();

const scrollChat = ref<HTMLElement | null>(null);

const { userInfo } = storeToRefs(userStore)

const gamePlayStore = useGamePlayStore();

const { contestId, participantDetails, joinedStatus, CRYPTO_BTC, CRYPTO_DOGE, CRYPTO_SOL, CRYPTO_ETH, CRYPTO_XRP, currentParticipantCount } = storeToRefs(gamePlayStore)

interface LeaderboardRow {
  userId: string,
  profileImage: string,
  username: string,
  stockCode: string,
  balanceAmount: number,
  stockUnitBuyPrice: number,
  stockUnits: number,
  betType: 'S' | 'B' | string,
}

const currentLeaderboardList = ref<Array<LeaderboardRow>>([]);



const pusher: any = inject('pusher');
var channel = pusher.subscribe('grafbase-channel');
channel.bind('leaderboard', function (data: any) {
  const participantDetails = data.data as Participant;
  if (data.op === "update") {
    const newArray = currentLeaderboardList.value;
    for (let i = 0; i < newArray.length; i++) {
      const item = newArray[i];
      if (item.userId == participantDetails.user.id) {
        const val = {
          userId: participantDetails.user.id,
          profileImage: participantDetails.user.profileImage,
          username: participantDetails.user.username,
          balanceAmount: participantDetails.balanceAmount,
          betType: participantDetails.betType,
          stockCode: participantDetails.stockCode,
          stockUnitBuyPrice: participantDetails.stockUnitBuyPrice,
          stockUnits: participantDetails.stockUnits
        }
        currentLeaderboardList.value[i] = val;
        break;
      }
    }

  } else if (data.op === "add") {
    const val = {
      userId: participantDetails.user.id,
      profileImage: participantDetails.user.profileImage,
      username: participantDetails.user.username,
      balanceAmount: participantDetails.balanceAmount,
      betType: participantDetails.betType,
      stockCode: participantDetails.stockCode,
      stockUnitBuyPrice: participantDetails.stockUnitBuyPrice,
      stockUnits: participantDetails.stockUnits
    }
    currentLeaderboardList.value.push(val);
    currentParticipantCount.value = currentLeaderboardList.value.length;
  } else {
    console.log("OTHERS")
  }
  /*   const stockFeed = data as ContestStockFeed;
  
            const stockDataObject: any = JSON.parse(stockFeed.stockFeed);
            CRYPTO_BTC.value = stockDataObject.BTC;
            CRYPTO_DOGE.value = stockDataObject.DOGE;
            CRYPTO_SOL.value = stockDataObject.SOL;
            CRYPTO_ETH.value = stockDataObject.ETH;
            CRYPTO_XRP.value = stockDataObject.XRP; */

});

const subscription = async () => {
  /*   const sub = API.graphql<GraphQLSubscription<OnCreateParticipantSubscription>>(graphqlOperation(subscriptions.onCreateParticipant)).subscribe({
      next: ({ provider, value }) => {
        if (value.data) {
          const participantDetails: any = value.data.onCreateParticipant;
          const val = {
            userId: participantDetails.user.id,
            profileImage: participantDetails.user.profileImage,
            username: participantDetails.user.username,
            balanceAmount: participantDetails.balanceAmount,
            betType: participantDetails.betType,
            stockCode: participantDetails.stockCode,
            stockUnitBuyPrice: participantDetails.stockUnitBuyPrice,
            stockUnits: participantDetails.stockUnits
          }
          currentLeaderboardList.value.push(val);
          currentParticipantCount.value = currentLeaderboardList.value.length;
        }
        console.log({ provider, value })
      },
      error: (error) => console.warn(error)
    }); */
}

const subscriptionUpdate = async () => {
  /*   const sub = API.graphql<GraphQLSubscription<OnUpdateParticipantSubscription>>(graphqlOperation(subscriptions.onUpdateParticipant)).subscribe({
      next: ({ provider, value }) => {
        console.log("NEW UPDATE MESSAGE", value)
        if (value.data) {
          const participantDetails: any = value.data.onUpdateParticipant;
          const newArray = currentLeaderboardList.value;
          for (let i = 0; i < newArray.length; i++) {
            const item = newArray[i];
            if (item.userId == participantDetails.user.id) {
              const val = {
                userId: participantDetails.user.id,
                profileImage: participantDetails.user.profileImage,
                username: participantDetails.user.username,
                balanceAmount: participantDetails.balanceAmount,
                betType: participantDetails.betType,
                stockCode: participantDetails.stockCode,
                stockUnitBuyPrice: participantDetails.stockUnitBuyPrice,
                stockUnits: participantDetails.stockUnits
              }
              currentLeaderboardList.value[i] = val;
              break;
            }
          }
  
        }
        console.log({ provider, value })
      },
      error: (error) => console.warn(error)
    }); */
}

watch(contestId, (newContestId, oldContestId) => {
  if (newContestId !== oldContestId && newContestId != '') {
    getCurrentLeaderboard(newContestId);
  }
});

const getCurrentLeaderboard = async (contestId: string) => {
  console.log("something here");
  try {


    const variables: ParticipantSearchFilterInput = {
      contestId: {
        eq: contestId
      }
    };
    const { onResult, onError } = useQuery(getLeaderboardByContestIdQuery, { filter: variables });
    onResult((results: IApolloResult) => {
      if (results.loading) return
      const participantResponse = results.data.participantSearch as ParticipantSearchConnection;

      if (participantResponse.edges.length > 0) {
        const userList: LeaderboardRow[] = participantResponse.edges.map((edge: ParticipantSearchEdge) => {
          const participant = edge.node;
          console.log("userInfo.value.userId", userInfo.value.userId);
          if (participant.user.id == userInfo.value.userId) {
            participantDetails.value = participant;
            console.log("participantDetails.value", participantDetails.value);
            joinedStatus.value = true;
          }
          return ({
            userId: participant.user.id,
            profileImage: participant.user.profileImage,
            username: participant.user.username,
            balanceAmount: participant.balanceAmount,
            betType: participant.betType,
            stockCode: participant.stockCode,
            stockUnitBuyPrice: participant.stockUnitBuyPrice,
            stockUnits: participant.stockUnits
          }) as LeaderboardRow
        });
        currentLeaderboardList.value = userList;
        currentParticipantCount.value = currentLeaderboardList.value.length;
        console.log("existingMessages.data.listMessages.items", userList);
      }
    });
    onError((error: ApolloError) => {
      console.log("error", error);
      return null
    })

  } catch (error) {
    console.log("Error in fetching messages", error);
  }
  //  subscription();
  //  subscriptionUpdate();
}

onBeforeMount(() => {
  if (contestId.value != '') {
    getCurrentLeaderboard(contestId.value);
  }
});

const computerLeaderboard = computed(() => {
  return currentLeaderboardList.value.map((item) => {
    let balanceAmount = 0;
    if (item.balanceAmount != 0) {
      balanceAmount = item.balanceAmount;
    } else {
      balanceAmount = item.stockUnitBuyPrice * item.stockUnits + calculateProfitOrLoss(item.betType, item.stockUnitBuyPrice, (item.stockCode == 'BTC' ?
        CRYPTO_BTC.value : item.stockCode == 'ETH' ?
          CRYPTO_ETH.value : item.stockCode == 'SOL' ?
            CRYPTO_SOL.value : item.stockCode == 'XRP' ?
              CRYPTO_XRP.value : CRYPTO_DOGE.value), item.stockUnits)
    }
    return ({
      ...item,
      balance: balanceAmount,
    })
  }).sort((a, b) => b.balance - a.balance);
})
</script>
<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>
            Rank
          </th>
          <th>User</th>
          <th>Current Investment</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody v-auto-animate>
        <!-- row 1 -->
        <tr v-for="(user, index) in computerLeaderboard" :key="user.userId">
          <td>
            {{ index + 1 }}
          </td>
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img :src="user.profileImage" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ user.username }}</div>
                <div class="text-sm opacity-50"></div>
              </div>
            </div>
          </td>
          <td>
            <div>
              <div class="badge badge-accent badge-outline badge-ghost p-4">
                <IconCurrency /> {{ formatAmount(user.balance) }}
              </div>
            </div>
          </td>
          <td>{{ user.balanceAmount != 0 ? "Hold" : "Invested" }}</td>
        </tr>
      </tbody>
    </table>
    <article class="prose pl-7 text-lg pt-4">
      Notes:
    </article>
    <article class="prose dark:prose-sm pl-7 italic">
      <ul>
        <li><span class="font-bold">Hold</span>: means not invested in any stock at the moment</li>
        <li><span class="font-bold">Invested</span>: means invested in a stock at the moment</li>
      </ul>
    </article>
  </div>
</template>