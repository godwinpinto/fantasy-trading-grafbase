<script setup lang="ts">
import { ref } from 'vue';
import { provideApolloClient, useMutation, useQuery } from '@vue/apollo-composable'
import type { ApolloError } from '@apollo/client/errors';
import type { IApolloResult } from '@/utils/commonInterfaces';
import { updateContestMutation, createContestStockMutation, createContestStockFeedMutation, updateContestStockFeedMutation, createContestMutation } from '@/graphql/mutations';
import { apolloClient } from '@/utils/apolloLink'
import type { ContestStockFeed,IntOperationsInput,ContestByInput, ContestUpdateInput, Contest, ContestStockCreateInput, ContestStockFeedSearchFilterInput, ContestStockFeedSearchConnection, ContestStockFeedUpdateInput, ContestStockFeedByInput, ContestCreateInput, ContestSearchConnection, ContestSearchFilterInput, FloatOperationsInput, Participant, ParticipantCreateInput, ParticipantCreatePayload, ParticipantUpdateInput, UserCreateInput, UserCreatePayload, UserSearchConnection, UserSearchFilterInput } from '@/graphql/schemaTypes';
import { activeContestQuery, getContestStockFeedByContestIdQuery } from '@/graphql/queries';
import { sendMessageAPI } from '@/utils/sendMessageAPI';

const websocketUrl =
  'wss://streamer.cryptocompare.com/v2?api_key='+import.meta.env.VITE_GRAFBASE_STOCK_API_KEY;

const newApolloClient = provideApolloClient(apolloClient);

const stockData = new Map<string, number>();
stockData.set('BTC', 0);
stockData.set('ETH', 0);
stockData.set('XRP', 0);
stockData.set('DOGE', 0);
stockData.set('SOL', 0);

let webSocket: WebSocket;

const onMessage = (event: MessageEvent) => {
  const data: any = JSON.parse(event.data);
  if (data.TYPE === '0') {
    stockData.set(data.FSYM, data.P);
  }
}

const onOpen = () => {
  const firstRequest = {
    action: 'SubAdd',
    subs: [
      '0~Coinbase~BTC~USD',
      '0~Coinbase~ETH~USD',
      '0~Coinbase~XRP~USD',
      '0~Coinbase~DOGE~USD',
      '0~Coinbase~SOL~USD',
    ],
  };
  webSocket.send(JSON.stringify(firstRequest));
}

const onError = (error: Event) => {
  console.error('WebSocket error:', error);
}

const onClose = (event: CloseEvent) => {
  console.log('WebSocket connection closed:', event);
  setTimeout(() => {
    connectWebSocket();
  }, 10000);
}

const connectWebSocket = () => {
  webSocket = new WebSocket(websocketUrl);
  webSocket.onmessage = onMessage;
  webSocket.onopen = onOpen;
  webSocket.onerror = onError;
  webSocket.onclose = onClose;
}

connectWebSocket();

let oldStockData:any="";
setInterval(() => {
  if (feedId.value) {
    const stockDataObject = Object.fromEntries(stockData);
    //console.log("stockDataObject", stockDataObject);
    if(oldStockData!="" && oldStockData==JSON.stringify(stockDataObject)){
      return
    }else{
      oldStockData=JSON.stringify(stockDataObject)
    }
    updateFeedData(JSON.stringify(stockDataObject), contestIdOverall.value, feedId.value);
  }

}, 10000);

const addStocks = async (stockCode: string, stockDescription: string, stockImage: string, stockPrice: number, contestId: string) => {
  try {
    const variables: ContestStockCreateInput = {
      "stockCode": stockCode,
      "stockDescription": stockDescription,
      "stockImage": stockImage,
      "stockPrice": stockPrice,
      "contestId": contestId,
      contest: {
        link: contestId
      }
    };

    const { mutate: createContestStockMutate, onDone: onCreateContestStockResult, onError: onCreateContestStockError } = useMutation(createContestStockMutation, { variables: { input: variables } })
    onCreateContestStockResult((results: any) => {
      console.log("ContestStock joined successfully", results);
    });
    onCreateContestStockError((error: ApolloError) => {
      console.log("error create error", error);
    });
    createContestStockMutate();

  } catch (error) {
    console.log("cannot add stocks", error);
  }
}


const addFeedData = async (stockFeedJson: string, contestId: string) => {
  try {
    const variables = {
      "stockFeed": stockFeedJson,
      "contestId": contestId,
      contest: {
        link: contestId
      }

    };

    const { mutate: createContestStockFeedMutate, onDone: onCreateContestStockFeedResult, onError: onCreateContestStockFeedError } = useMutation(createContestStockFeedMutation, { variables: { input: variables } })
    onCreateContestStockFeedResult((results: any) => {
      console.log("ContestStockFeed created successfully", results);
    });
    onCreateContestStockFeedError((error: ApolloError) => {
      console.log("error create error", error);
    });
    createContestStockFeedMutate();


  } catch (error) {
    console.log("cannot create feeds", error);
  }
}

const contestIdOverall = ref('');
const feedId = ref('');

const updateFeedData = async (stockFeedJson: string, contestId: string, feedUniqueId: string) => {
  try {
    const updatedObject: ContestStockFeedUpdateInput = {
      "stockFeed": stockFeedJson,
      "contestId": contestId,
      contest: {
        link: contestId
      }
    };

    const byId: ContestStockFeedByInput = {
      id: feedUniqueId
    }

    const { mutate: updateContestStockFeedMutate, onDone: onUpdateContestStockFeedResult, onError: onUpdateContestStockFeedError } = useMutation(updateContestStockFeedMutation, { variables: { input: updatedObject, by: byId } })
    onUpdateContestStockFeedResult((results: any) => {
      const contestStockFeed = results.data.contestStockFeedUpdate.contestStockFeed as ContestStockFeed;
      sendMessageAPI(contestStockFeed,"grafbase-channel","ticker")
    });
    onUpdateContestStockFeedError((error: ApolloError) => {
      console.log("error ContestStockFeed error", error);
    });
    updateContestStockFeedMutate();

  } catch (error) {
    console.log("cannot update feed", error);
  }
}


const createNewContest = async (contestName: string, contestDescription: string): Promise<any> => {
  const currentUTCDate = new Date();
  currentUTCDate.setDate(currentUTCDate.getDate() + 7);
  const updatedUTCDate = currentUTCDate.toISOString();

  const variables: ContestCreateInput = {
    "name": contestName,
    "description": contestDescription,
    "status": "A",
    "maxParticipants": 20,
    "contestDate": updatedUTCDate
  };

  const { mutate: createContestMutate} = useMutation(createContestMutation, { variables: { input: variables } })
  try {
    const results = await createContestMutate();
    if(results){
    const contest = results.data.contestCreate.contest;

    if (contest) {
      console.log("new contest", contest);
      console.log("Contest created successfully");
      return contest;
    } else {
      console.log("Contest creation failed");
      return null;
    }
  }else{
    return null
  }
  } catch (error) {
    console.log("error create error", error);
    return null;
  }

}

const getActiveContest = (): Promise<Contest | null> => {
  return new Promise((resolve, reject) => {
    const variables: ContestSearchFilterInput = {
      status: {
        in: ["A"]
      }
    };
  
    const { onResult, onError } = useQuery(activeContestQuery, { filter: variables });
  
    onResult((results: IApolloResult) => {
      if (results.loading) return;
      const contestResponse = results.data.contestSearch as ContestSearchConnection;
      console.log("contestResponsecontestResponsecontestResponsecontestResponse",contestResponse)
      if (contestResponse.edges.length === 1) {
        const contestNode = contestResponse.edges[0].node;
        contestIdOverall.value=contestNode.id
        resolve(contestNode);
      } else {
        resolve(null); // No active contest found
      }

    });
  
    onError((error: ApolloError) => {
      console.log("error", error);
      reject(error);
    });
  });
};

const getFeed = async (): Promise<void> => {

  const variables: ContestStockFeedSearchFilterInput = {
    contestId: {
      eq: contestIdOverall.value
    }
  };
  const { onResult, onError } = useQuery(getContestStockFeedByContestIdQuery, { filter: variables });
  onResult((results: IApolloResult) => {
    if (results.loading) return

    console.log("resultsresultsresults",results)
    console.log("contestIdOverall.value",contestIdOverall.value)
    const contestStockFeedResponse = results.data.contestStockFeedSearch as ContestStockFeedSearchConnection;
    if (contestStockFeedResponse.edges.length == 1) {
      const contestStockFeedNode = contestStockFeedResponse.edges[0].node;
      feedId.value = contestStockFeedNode.id;
    }
  });
  onError((error: ApolloError) => {
    console.log("error", error);
    return null
  })
}

const closePreviousContest = async (contestId: string, contestData: any): Promise<void> => {
  const currentUTCDate = new Date();
  currentUTCDate.setDate(currentUTCDate.getDate() + 7);
  const updatedUTCDate = currentUTCDate.toISOString();

  try {
    contestData.status = 'C';

    //    contestNewDataUpdate='C'

    const updatedObject: ContestUpdateInput = {
      "name": contestData.name,
      "description": contestData.description,
      "status": "C",
      "maxParticipants": {
        set:contestData.maxParticipants
      },
      "contestDate": contestData.contestDate
    };



    const byId: ContestByInput = {
      id: contestData.id
    }

    const { mutate: updateContestMutate, onDone: onUpdateContestResult, onError: onUpdateContestError } = useMutation(updateContestMutation, { variables: { input: updatedObject, by: byId } })
    onUpdateContestResult((results: any) => {
      console.log("Contest updated successfully", results);
    });
    onUpdateContestError((error: ApolloError) => {
      console.log("error Contest error", error);
    });
    await updateContestMutate();


/*    const creationDetails: any = await API.graphql(graphqlOperation(
      updateContest,
      {
        input: { ...updatedObject },
        condition: { status: { eq: 'A' } }
      }
    ));
 */  } catch (error) {
    console.log("cannot contest stock", error);
  }
}
//close contest

const startNewContestCreation = async () => {

  const stockDataObject = Object.fromEntries(stockData);
  const currentContest = await getActiveContest();
  console.log("currentContest",currentContest)
  if (currentContest) {
    await closePreviousContest(currentContest.id, currentContest);
    console.log("Delete previous",currentContest.id)
  }
  const newContestData = await createNewContest("Crypto wars1", "Learn Crypto1");
  console.log("new Contest",newContestData)
  contestIdOverall.value = newContestData.id;
  addFeedData(JSON.stringify(stockDataObject), newContestData.id);
  addStocks('BTC', 'Bitcoin', 'bitcoin.png', stockData.get('BTC') ?? 0, newContestData.id);
  addStocks('ETH', 'Ethereum', 'ethereum.png', stockData.get('ETH') ?? 0, newContestData.id);
  addStocks('DOGE', 'Dogecoin', 'doge.png', stockData.get('DOGE') ?? 0, newContestData.id);
  addStocks('XRP', 'Ripple', 'xrp.png', stockData.get('XRP') ?? 0, newContestData.id);
  addStocks('SOL', 'Solana', 'solana.png', stockData.get('SOL') ?? 0, newContestData.id);

}

getActiveContest().then(() => {
  console.log("GET FEED")
  getFeed();
});
</script>


<template>
  <main>
    <RouterLink to="/">Home</RouterLink>

    <div class="flex flex-col bg-base-300 min-h-screen">
      <div class="flex-1 flex flex-col sm:flex-row">
        <main class="flex-1">
          <div class="col-span-2 divider font-extrabold"></div>

          <div class="grid grid-cols-2 mx-5 content-center justify-center gap-2">
            <div class="content-center col-span-2">
              <button class="btn btn-accent btn-sm justify-center w-full" @click="startNewContestCreation">Stop Previous
                and Create new contest</button>
            </div>
          </div>
        </main>


        <aside class="sm:w-1/4 ">

        </aside>
      </div>

    </div>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
