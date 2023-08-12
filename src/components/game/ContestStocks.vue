<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia'
import IconCurrency from '@/components/icons/IconCurrency.vue'
import IconUp from '@/components/icons/IconUp.vue'
import IconDown from '@/components/icons/IconDown.vue'
import JoinGame from '@/components/game/JoinGame.vue'
import { useGamePlayStore } from '@/stores/gamePlayStore';
import { watch, ref, onBeforeMount, inject } from 'vue';
import { formatAmount } from '@/utils/utility';
import { provideApolloClient, useMutation, useQuery } from '@vue/apollo-composable'
import type { ApolloError } from '@apollo/client/errors';
import type { IApolloResult } from '@/utils/commonInterfaces';
import { updateContestMutation, createContestStockMutation, createContestStockFeedMutation, updateContestStockFeedMutation, createContestMutation } from '@/graphql/mutations';
import { apolloClient } from '@/utils/apolloLink'
import type { ContestStockFeed,ContestStock, ContestStockSearchEdge, ContestStockSearchConnection, ContestStockSearchFilterInput, IntOperationsInput, ContestByInput, ContestUpdateInput, Contest, ContestStockCreateInput, ContestStockFeedSearchFilterInput, ContestStockFeedSearchConnection, ContestStockFeedUpdateInput, ContestStockFeedByInput, ContestCreateInput, ContestSearchConnection, ContestSearchFilterInput, FloatOperationsInput, Participant, ParticipantCreateInput, ParticipantCreatePayload, ParticipantUpdateInput, UserCreateInput, UserCreatePayload, UserSearchConnection, UserSearchFilterInput } from '@/graphql/schemaTypes';
import { activeContestQuery, getContestStockFeedByContestIdQuery, getContestStockByContestIdQuery } from '@/graphql/queries';


const userStore = useUserStore();
const selectedStock = ref('BTC');
const betType = ref('B');
const { userInfo } = storeToRefs(userStore)
const gamePlayStore = useGamePlayStore();
const { investOrWithdraw } = useGamePlayStore();
const { contestId, participantDetails, calculateInvestedAmount, CRYPTO_BTC, CRYPTO_DOGE, CRYPTO_SOL, CRYPTO_ETH, CRYPTO_XRP } = storeToRefs(gamePlayStore)

interface StocksRow {
  stockId: string,
  stockCode: string,
  stockDescription: string,
  stockImage: string,
  stockPrice: number,
  stockGain: number
}

const currentStocksList = ref<Array<StocksRow>>([]);

watch(contestId, (newContestId, oldContestId) => {
  if (newContestId !== oldContestId && newContestId != '') {
    getCurrentStocks(newContestId);
    getCurrentFeed(contestId.value);
  }
});



const pusher: any = inject('pusher');
var channel = pusher.subscribe('grafbase-channel');
channel.bind('ticker', function (data: any) {
     const stockFeed = data as ContestStockFeed;

          const stockDataObject: any = JSON.parse(stockFeed.stockFeed);
          CRYPTO_BTC.value = stockDataObject.BTC;
          CRYPTO_DOGE.value = stockDataObject.DOGE;
          CRYPTO_SOL.value = stockDataObject.SOL;
          CRYPTO_ETH.value = stockDataObject.ETH;
          CRYPTO_XRP.value = stockDataObject.XRP;

});

const getCurrentStocks = async (contestId: string) => {
  try {

    const variables: ContestStockSearchFilterInput = {
      contestId: {
        eq: contestId
      }
    };
    const { onResult, onError } = useQuery(getContestStockByContestIdQuery, { filter: variables });
    onResult((results: IApolloResult) => {
      if (results.loading) return
      const contestStockResponse = results.data.contestStockSearch as ContestStockSearchConnection;

      if (contestStockResponse.edges.length > 0) {

        const stockList: StocksRow[] = contestStockResponse.edges.map((edge: ContestStockSearchEdge) => {

          const stock = edge.node as ContestStock
          return ({
            stockId: stock.id,
            stockCode: stock.stockCode,
            stockDescription: stock.stockDescription,
            stockImage: stock.stockImage,
            stockPrice: stock.stockPrice,
            stockGain: 0
          })
        });
        currentStocksList.value = stockList;
        console.log("existingStocks.data.listContestStocks.items", stockList);
      }
    });
    onError((error: ApolloError) => {
      console.log("error", error);
      return null
    })

  } catch (error) {
    console.log("Error in fetching stocks list", error);
  }
}


const getCurrentFeed = async (contestId: string) => {
  try {

    const variables: ContestStockFeedSearchFilterInput = {
      contestId: {
        eq: contestId
      }
    };
    const { onResult, onError } = useQuery(getContestStockFeedByContestIdQuery, { filter: variables });
    onResult((results: IApolloResult) => {
      if (results.loading) return
      const contestStockFeedResponse = results.data.contestStockFeedSearch as ContestStockFeedSearchConnection;
      if (contestStockFeedResponse.edges.length == 1) {
        const contestStockFeedNode = contestStockFeedResponse.edges[0].node;
        const stockDataObject: any = JSON.parse(contestStockFeedNode.stockFeed);
        CRYPTO_BTC.value = stockDataObject.BTC;
        CRYPTO_DOGE.value = stockDataObject.DOGE;
        CRYPTO_SOL.value = stockDataObject.SOL;
        CRYPTO_ETH.value = stockDataObject.ETH;
        CRYPTO_XRP.value = stockDataObject.XRP;
      }
    });
    onError((error: ApolloError) => {
      console.log("error", error);
      return null
    })


  } catch (error) {
    console.log("Error in fetching stocks feed", error);
  }
}

onBeforeMount(() => {
  if (contestId.value != '') {
    getCurrentStocks(contestId.value);
    getCurrentFeed(contestId.value);
  }
});

watch(participantDetails.value, (newValue, oldValue) => {
  console.log("participants updated", newValue, oldValue)
});
</script>
<template>
  <div class="navbar bg-base-300">
    <span class="normal-case text-xl font-bold ml-5">Contest Stocks</span>
  </div>
  <article class="prose dark:prose-invert pl-7">
    Realtime Stock Feed from cryptocompare.com
  </article>
  <div class="overflow-x-none">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Stock & Market Price</th>
          <th>Price Movement <br />(since contest start)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in currentStocksList">
          <th>
            <label v-if="userInfo.userId != '' && participantDetails.id != ''">
              <input type="radio" name="stock" class="radio" v-model="selectedStock" :value="stock.stockCode" />
            </label>
          </th>
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img v-if="stock.stockCode == 'BTC'" src="@/assets/bitcoin.png" alt="Bitcoin Icon" />
                  <img v-if="stock.stockCode == 'DOGE'" src="@/assets/doge.png" alt="Doge Coin Icon" />
                  <img v-if="stock.stockCode == 'ETH'" src="@/assets/ethereum.png" alt="Ethereum Icon" />
                  <img v-if="stock.stockCode == 'SOL'" src="@/assets/solana.png" alt="Solana Icon" />
                  <img v-if="stock.stockCode == 'XRP'" src="@/assets/xrp.png" alt="Ripple Icon" />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ stock.stockDescription }} - {{ stock.stockCode }}</div>
                <div class="badge badge-accent badge-ghost p-4">
                  <IconCurrency />{{
                    (stock.stockCode == 'BTC' ? CRYPTO_BTC : stock.stockCode == 'ETH' ? CRYPTO_ETH : stock.stockCode ==
                      'SOL' ? CRYPTO_SOL : stock.stockCode == 'XRP' ? CRYPTO_XRP : CRYPTO_DOGE).toFixed(4)
                  }}
                </div>
              </div>
            </div>
          </td>
          <th>
            <div class="badge badge-outline badge-sm p-4"
              :class="((stock.stockCode == 'BTC' ? CRYPTO_BTC : stock.stockCode == 'ETH' ? CRYPTO_ETH : stock.stockCode == 'SOL' ? CRYPTO_SOL : stock.stockCode == 'XRP' ? CRYPTO_XRP : CRYPTO_DOGE) - stock.stockPrice) >= 0 ? 'badge-accent' : 'badge-secondary'">
              <IconCurrency />{{
                ((stock.stockCode == 'BTC' ? CRYPTO_BTC : stock.stockCode == 'ETH' ? CRYPTO_ETH : stock.stockCode == 'SOL' ?
                  CRYPTO_SOL : stock.stockCode == 'XRP' ? CRYPTO_XRP : CRYPTO_DOGE) - stock.stockPrice).toFixed(4)
              }}
              <IconUp
                v-if="((stock.stockCode == 'BTC' ? CRYPTO_BTC : stock.stockCode == 'ETH' ? CRYPTO_ETH : stock.stockCode == 'SOL' ? CRYPTO_SOL : stock.stockCode == 'XRP' ? CRYPTO_XRP : CRYPTO_DOGE) - stock.stockPrice) > 0" />
              <IconDown
                v-if="((stock.stockCode == 'BTC' ? CRYPTO_BTC : stock.stockCode == 'ETH' ? CRYPTO_ETH : stock.stockCode == 'SOL' ? CRYPTO_SOL : stock.stockCode == 'XRP' ? CRYPTO_XRP : CRYPTO_DOGE) - stock.stockPrice) < 0" />
            </div>
          </th>
        </tr>
      </tbody>
    </table>
    <JoinGame />
    <div v-if="userInfo.userId != '' && participantDetails.id != ''">
      <div class="divider font-extrabold">Make your investment choice</div>
      <table class="table">
        <tbody>
          <tr>
            <th>Current Balance <div class="badge badge-accent badge-ghost p-4">
                <IconCurrency /> {{ formatAmount(participantDetails.balanceAmount) }}
              </div>
            </th>
            <th>Invested Amount <div class="badge badge-accent badge-ghost p-4">
                <IconCurrency />{{ formatAmount(participantDetails.stockUnitBuyPrice * participantDetails.stockUnits) }}
              </div>
            </th>
            <th v-if="participantDetails.stockCode != ''">Current P/L <div class="badge badge-accent badge-ghost p-4">
                <IconCurrency />{{ calculateInvestedAmount }}
              </div>
            </th>
          </tr>
          <tr v-if="participantDetails.stockCode != ''">
            <th colspan="3">
              You Bought: <div class="badge badge-accent badge-ghost p-4">
                {{ participantDetails.stockCode }} - {{ participantDetails.betType == 'S' ? 'Sell' : 'Buy' }}, for units:
                {{
                  formatAmount(participantDetails.stockUnits) }} @
                <IconCurrency /> {{ formatAmount(participantDetails.stockUnitBuyPrice) }}/unit
              </div>
            </th>
          </tr>
        </tbody>
      </table>
      <div class="grid grid-cols-2 mx-10 content-center justify-center gap-2">
        <div class="form-control justify-self-start" v-if="participantDetails.balanceAmount != 0">
          <label class="label cursor-pointer">
            <input type="radio" v-model="betType" class="radio checked:bg-red-500" value="S" />
            <span class="label-text ml-3 font-extrabold"> Sell</span>
          </label>
        </div>
        <div class="form-control justify-self-start" v-if="participantDetails.balanceAmount != 0">
          <label class="label cursor-pointer">
            <input type="radio" v-model="betType" class="radio checked:bg-blue-500" value="B" />
            <span class="label-text  ml-3 font-extrabold">Buy</span>
          </label>
        </div>
        <div class="content-center col-span-2" v-if="participantDetails.balanceAmount != 0">
          <button class="btn btn-accent btn-sm justify-center w-full"
            @click="investOrWithdraw('I', selectedStock, betType)">Invest</button>
        </div>
        <div class="content-center col-span-2" v-if="participantDetails.balanceAmount == 0">
          <button class="btn btn-accent btn-sm justify-center w-full" @click="investOrWithdraw('W', '', '')">Withdraw
            Investment</button>
        </div>
      </div>
      <article class="prose pl-7 text-lg pt-4" v-if="participantDetails.balanceAmount != 0">
        Notes:
      </article>
      <article class="prose dark:prose-sm pl-7 italic" v-if="participantDetails.balanceAmount != 0">
        <ul>
          <li>Buy implies that if stock price goes up, so does your investment.</li>
          <li>Sell implies that if stock price goes down, so will your investment (this is called short selling).</li>
        </ul>
      </article>
    </div>
  </div>
</template>