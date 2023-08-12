<script setup lang="ts">
import { useGamePlayStore } from '@/stores/gamePlayStore';
import { storeToRefs } from 'pinia'
import { onBeforeMount } from "vue";
import { useUserStore } from '@/stores/userStore';

const gamePlayStore = useGamePlayStore();

const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore)

const { contestId, participantDetails, contestDetails, currentParticipantCount } = storeToRefs(gamePlayStore)
const { getActiveContest, joinGame } = useGamePlayStore();

onBeforeMount(() => {
    getActiveContest();
})
</script>
<template>
    <div v-if="contestId != '' && userInfo.userId != '' && participantDetails.user.id == ''">
        <div class="col-span-2 divider font-extrabold"></div>
        <div class="grid grid-cols-2 mx-5 content-center justify-center gap-2">
            <article class="prose text-sm pt-4 col-span-2">
                You need to join the game to participate. Hurry up! before the entries get full.
            </article>

            <div class="content-center col-span-2">
                <button class="btn btn-accent btn-sm justify-center w-full"
                    @click="joinGame(contestId, userInfo.userId)">Join the Game ({{ currentParticipantCount }}/{{
                        contestDetails.maxParticipants }} entries)</button>
            </div>
        </div>
    </div>
</template>