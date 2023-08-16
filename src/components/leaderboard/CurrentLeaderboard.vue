<script setup lang="ts">
import { computed, inject, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia'
import { useGamePlayStore } from '@/stores/gamePlayStore';
import { watch, ref } from 'vue';
import IconCurrency from '@/components/icons/IconCurrency.vue';
import { formatAmount, calculateProfitOrLoss } from '@/utils/utility';
import { useQuery } from '@vue/apollo-composable'
import type { ApolloError } from '@apollo/client/errors';
import type { IApolloResult } from '@/utils/commonInterfaces';
import type { ParticipantSearchEdge, ParticipantSearchConnection, ParticipantSearchFilterInput, Participant } from '@/graphql/schemaTypes';
import { getLeaderboardByContestIdQuery } from '@/graphql/queries';

const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore)

const gamePlayStore = useGamePlayStore();

const currentLeaderboardList = ref<Array<LeaderboardRow>>([]);

interface LeaderboardRow {
  id: string,
  userId: string,
  profileImage: string,
  username: string,
  stockCode: string,
  balanceAmount: number,
  stockUnitBuyPrice: number,
  stockUnits: number,
  betType: 'S' | 'B' | string,
}

const { contestId, participantDetails, joinedStatus, CRYPTO_BTC, CRYPTO_DOGE, CRYPTO_SOL, CRYPTO_ETH, CRYPTO_XRP, currentParticipantCount } = storeToRefs(gamePlayStore)

const pusher: any = inject('pusher');
var channel = pusher.subscribe('grafbase-channel');

watch(userInfo, (newValue, oldValue) => {
  const newArray = currentLeaderboardList.value;
  for (let i = 0; i < newArray.length; i++) {
    const item = newArray[i];
    if (item.userId == newValue.userId) {
      participantDetails.value = {
        id: item.id,
        user: {
          id: item.userId,
          username: item.username,
          profileImage: item.profileImage
        },
        balanceAmount: item.balanceAmount,
        betType: item.betType,
        stockCode: item.stockCode,
        stockUnitBuyPrice: item.stockUnitBuyPrice,
        stockUnits: item.stockUnits,
        contestId: contestId.value
      }
    }
  }
});

channel.bind('leaderboard', function (data: any) {
  const participantDetails1 = data.data as Participant;
  if (data.op === "update") {
    getCurrentLeaderboard(contestId.value);
  } else if (data.op === "add") {
    setTimeout(function () {
      getCurrentLeaderboard(contestId.value);
    }, 2000);
  }
});

watch(contestId, (newContestId, oldContestId) => {
  if (newContestId !== oldContestId && newContestId != '') {
    getCurrentLeaderboard(newContestId);
  }
});

const getCurrentLeaderboard = async (contestId: string) => {
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
          if (participant.user.id == userInfo.value.userId) {
            participantDetails.value = participant;
            joinedStatus.value = true;
          }
          return ({
            id: participant.id,
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
      }
    });
    onError((error: ApolloError) => {
      console.log("error", error);
      return null
    })
  } catch (error) {
    console.log("Error in fetching messages", error);
  }
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