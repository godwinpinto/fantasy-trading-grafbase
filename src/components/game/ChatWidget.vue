<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia'
import { useGamePlayStore } from '@/stores/gamePlayStore';
import { watch, ref, inject, onBeforeMount } from 'vue';
import { useMutation, useQuery } from '@vue/apollo-composable'
import type { ApolloError } from '@apollo/client/errors';
import type { IApolloResult } from '@/utils/commonInterfaces';
import { createMessageMutation } from '@/graphql/mutations';
import type { MessageCreateInput, Message, MessageSearchEdge, MessageSearchConnection, MessageSearchFilterInput } from '@/graphql/schemaTypes';
import { getMessagesByContestIdQuery } from '@/graphql/queries';
import { sendMessageAPI } from '@/utils/sendMessageAPI'

const userStore = useUserStore();
const scrollChat = ref<HTMLElement | null>(null);
const { userInfo } = storeToRefs(userStore)
const gamePlayStore = useGamePlayStore();
const { contestId } = storeToRefs(gamePlayStore)
const newMessage = ref('');
const messages = ref<Array<message>>([]);
const pusher: any = inject('pusher');
var channel = pusher.subscribe('grafbase-channel');

interface user {
    id: string,
    username: string
}

interface message {
    message: string,
    user: user,
    createdAt: string
    msgDateTime: Date
}

const scrollChatToBottom = () => {
    setTimeout(() => {
        if (scrollChat.value) {
            const element = scrollChat.value.lastElementChild;
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'end' })

            } else {
            }
        }
    }, 500);
}

watch(contestId, (newContestId, oldContestId) => {
    if (newContestId !== oldContestId && newContestId != '') {
        getContestMessages(newContestId);
    }
});

channel.bind('new-message', function (data: any) {
    const messageRecord = data.message as Message;
    const val = {
        message: messageRecord.body ?? '',
        user: messageRecord?.user ?? { id: '', username: '' },
        createdAt: messageRecord?.createdAt ?? '',
        msgDateTime: messageRecord.msgDateTime
    }
    messages.value.push(val);
    scrollChatToBottom();
});

watch(contestId, (newContestId, oldContestId) => {
    if (newContestId !== oldContestId && newContestId != '') {
        getContestMessages(newContestId);
    }
});

const getContestMessages = async (contestId: string) => {
    try {
        const variables: MessageSearchFilterInput = {
            contestId: {
                eq: contestId
            }
        };
        const { onResult, onError } = useQuery(getMessagesByContestIdQuery, { filter: variables });
        onResult((results: IApolloResult) => {
            if (results.loading) return
            const messageResponse = results.data.messageSearch as MessageSearchConnection;
            if (messageResponse.edges.length > 0) {
                const arrayMessages = messageResponse.edges;
                const newMessages: Array<any> = [];
                arrayMessages.forEach((edge: MessageSearchEdge) => {
                    const messagess = edge.node
                    const userr = messagess.user;
                    const newMessage: message = {
                        message: messagess.body,
                        user: {
                            "id": messagess.user.id,
                            "username": messagess.user.username,
                        },
                        createdAt: messagess.createdAt,
                        msgDateTime: messagess.msgDateTime
                    }
                    newMessages.push(newMessage);
                });
                newMessages.sort((a: any, b: any) => new Date(a.msgDateTime).getTime() - new Date(b.msgDateTime).getTime());
                messages.value = newMessages;
                scrollChatToBottom();
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

const sendMessage = async () => {
    const messageContent = newMessage.value;
    if (messageContent == "")
        return
    const currentUTCDate = new Date().toISOString();
    try {
        const variables: MessageCreateInput = {
            "body": newMessage.value,
            "contestId": contestId.value,
            "userId": userInfo.value.userId,
            user: {
                link: userInfo.value.userId
            },
            "msgDateTime": currentUTCDate,
            contest: {
                link: contestId.value
            }
        };
        const { mutate: createMessageMutate, onDone: onCreateMessageResult, onError: onCreateMessageError } = useMutation(createMessageMutation, { variables: { input: variables } })
        onCreateMessageResult((results: any) => {
            const messageResponse = results.data.messageCreate as Message;
            sendMessageAPI(messageResponse, "grafbase-channel", "new-message");
        });
        onCreateMessageError((error: ApolloError) => {
            console.log("error create error", error);
        });
        createMessageMutate();
        newMessage.value = ''
    } catch (error) {
        console.log("cannot send new message", error);
    }
}
onBeforeMount(() => {
    if (contestId.value != '') {
        getContestMessages(contestId.value);
    }
})
</script>
<template>
    <div class="navbar bg-base-300 mb-0 pb-0">
        <span class="normal-case text-xl font-bold">Gameplay Chat</span>
    </div>
    <div class="divider my-0"></div>

    <div class=" flex flex-col">
        <div class="flex-col overflow-y-scroll flex mb-7" style="height:70vh; max-height: 70vh;" ref="scrollChat">
            <div v-for="message in messages" class="chat"
                :class="userInfo.userId == message.user.id ? 'chat-end' : 'chat-start'">
                <div class="chat-header">
                    {{ message.user.username }}
                </div>
                <div class="chat-bubble">{{ message.message }}</div>
            </div>
        </div>
        <div class="flex p-2 space-x-2" v-if="userInfo.userId != ''">
            <div class="flex-1">
                <input type="text" placeholder="Type here" class="input input-bordered input-primary w-full"
                    v-model="newMessage" v-on:keyup.enter="sendMessage" />
            </div>
            <div class="flex-none h-14 w-14">
                <button class="btn bg-white btn-ghost" @click="sendMessage">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>

                </button>
            </div>

        </div>
    </div>
</template>

