import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { calculateProfitOrLoss, formatAmount } from '@/utils/utility';
import { provideApolloClient, useMutation, useQuery } from '@vue/apollo-composable'
import type { ApolloError } from '@apollo/client/errors';
import type { IApolloResult } from '@/utils/commonInterfaces';
import { createParticipantMutation, updateParticipantMutation } from '@/graphql/mutations';
import { apolloClient } from '@/utils/apolloLink'
import type { ContestSearchConnection, ContestSearchFilterInput, FloatOperationsInput, Participant, ParticipantByInput, ParticipantCreateInput, ParticipantCreatePayload, ParticipantUpdateInput, UserCreateInput, UserCreatePayload, UserSearchConnection, UserSearchFilterInput } from '@/graphql/schemaTypes';
import { activeContestQuery, userExistsQuery } from '@/graphql/queries';
import { sendMessageAPI } from '@/utils/sendMessageAPI';

export interface IParticipant {
    id: string
    user: {
        id: string
        username: string
        profileImage: string
    },
    balanceAmount: number
    stockCode: string
    betType: string
    stockUnitBuyPrice: number
    stockUnits: number
    contestId: string
}

export const useGamePlayStore = defineStore('gamePlayStore', () => {

    provideApolloClient(apolloClient);

    const contestId = ref('')
    const joinedStatus = ref(false)
    const currentParticipantCount = ref(0)
    const CRYPTO_BTC = ref(0)
    const CRYPTO_ETH = ref(0)
    const CRYPTO_SOL = ref(0)
    const CRYPTO_XRP = ref(0)
    const CRYPTO_DOGE = ref(0)

    const participantDetails = ref<IParticipant>({
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
    })
    const contestDetails = ref();



    
    const getActiveContest = async () => {
        const variables: ContestSearchFilterInput = {
            status: {
                eq: "A"
            }
        };
        const { onResult, onError } = useQuery(activeContestQuery, { filter: variables });
        onResult((results: IApolloResult) => {
            if (results.loading) return
            const contestResponse = results.data.contestSearch as ContestSearchConnection;
            if (contestResponse.edges.length == 1) {
                const contestNode = contestResponse.edges[0].node;
                contestId.value = contestNode.id
                contestDetails.value = contestNode
            }
        });
        onError((error: ApolloError) => {
            console.log("error", error);
        })

    }



    const joinGame = async (contestId: string, userId: string) => {
        try {
            const variables: ParticipantCreateInput = {
                balanceAmount: 1000000,
                stockCode: '',
                stockUnitBuyPrice: 0,
                stockUnits: 0,
                userId: userId,
                user: {
                    link: userId
                },
                betType: '',
                contestId: contestId,
                contest: {
                    link: contestId
                }
            };


            const { mutate: createParticipantMutate, onDone: onCreateParticipantResult, onError: onCreateParticipantError } = useMutation(createParticipantMutation, { variables: { input: variables } })
            onCreateParticipantResult((results: any) => {
                const participant = results.data.participantCreate.participant as Participant;
                sendMessageAPI({op:"add",data:participant},"grafbase-channel","leaderboard")
                if (participant) {
                    participantDetails.value = participant
                }
            });
            onCreateParticipantError((error: ApolloError) => {
                console.log("error create error", error);
            });
            createParticipantMutate();


        } catch (error) {
            console.log("cannot join game", error);
        }
    }

    const investOrWithdraw = async (action: string, stockCode: string, betType: string) => {


        try {
            let balanceAmount = 0;
            const currVal = participantDetails.value
            let stockUnitBuyPrice = 0;
            let stockUnits = 0;
            if (action === 'I') {
                balanceAmount = 0;
                stockUnitBuyPrice = (stockCode == 'BTC' ? CRYPTO_BTC.value : stockCode == 'ETH' ? CRYPTO_ETH.value : stockCode == 'SOL' ? CRYPTO_SOL.value : stockCode == 'XRP' ? CRYPTO_XRP.value : CRYPTO_DOGE.value)
                stockUnits = currVal.balanceAmount / stockUnitBuyPrice
                if (stockUnitBuyPrice == 0) {
                    alert("Please wait for rates to refresh");
                    return
                }

            } else if (action === 'W') {
                balanceAmount = currVal.stockUnitBuyPrice * currVal.stockUnits + calculateProfitOrLoss(currVal.betType, currVal.stockUnitBuyPrice, (currVal.stockCode == 'BTC' ?
                    CRYPTO_BTC.value : currVal.stockCode == 'ETH' ?
                        CRYPTO_ETH.value : currVal.stockCode == 'SOL' ?
                            CRYPTO_SOL.value : currVal.stockCode == 'XRP' ?
                                CRYPTO_XRP.value : CRYPTO_DOGE.value), currVal.stockUnits)
                stockCode = '';
                betType = '';
                stockUnitBuyPrice = 0;
                stockUnits = 0;
                if (balanceAmount == 0) {
                    alert("Please wait for rates to refresh");
                    return
                }

            }


            const updatedObject: ParticipantUpdateInput = {
                balanceAmount: {
                    set:balanceAmount
                },
                stockCode: stockCode,
                stockUnitBuyPrice: {set:
                    stockUnitBuyPrice
                },
                stockUnits: {
                    set:stockUnits
                },
                betType: betType,
            };
            
            const byId: ParticipantByInput = {
                id:currVal.id
            }

            const { mutate: updateParticipantMutate, onDone: onUpdateParticipantResult, onError: onUpdateParticipantError } = useMutation(updateParticipantMutation, { variables: { input: updatedObject,by:byId } })
            onUpdateParticipantResult((results: any) => {
                const participant = results.data.participantUpdate.participant as Participant;
                sendMessageAPI({op:"update",data:participant},"grafbase-channel","leaderboard")
                if (participant) {
                    participantDetails.value = participant
                }
                console.log("participant details updated", results);
            });
            onUpdateParticipantError((error: ApolloError) => {
                console.log("error Update error", error);
            });
            updateParticipantMutate();

        } catch (error) {
            console.log("error in onvest or withdraw", error);
        }
    }

    const calculateInvestedAmount = computed(() => {
        try {
            const currVal = participantDetails.value;
            let balanceAmount = 0;

            balanceAmount = calculateProfitOrLoss(currVal.betType, currVal.stockUnitBuyPrice, (currVal.stockCode == 'BTC' ?
                CRYPTO_BTC.value : currVal.stockCode == 'ETH' ?
                    CRYPTO_ETH.value : currVal.stockCode == 'SOL' ?
                        CRYPTO_SOL.value : currVal.stockCode == 'XRP' ?
                            CRYPTO_XRP.value : CRYPTO_DOGE.value), currVal.stockUnits)

            return formatAmount(balanceAmount);
        } catch (error) {
            console.log("unable to calculate stock price", error);
            return "0"
        }
    })

    return { contestId, joinedStatus, participantDetails, contestDetails, getActiveContest, calculateInvestedAmount, CRYPTO_BTC, CRYPTO_DOGE, CRYPTO_ETH, CRYPTO_SOL, CRYPTO_XRP, joinGame, investOrWithdraw, currentParticipantCount }
})
