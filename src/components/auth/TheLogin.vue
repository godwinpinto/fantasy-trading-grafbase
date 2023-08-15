<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia'

const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore)
const { signInWithGoogle } = useUserStore();



</script>
<template>

    <div v-if="userInfo.userId == ''">
        <div class="navbar bg-base-300 justify-center items-center">
            <span class="normal-case text-xl font-bold">Login to Enter Game</span>
        </div>
        <div class="justify-center items-center">
            <article class="prose dark:prose-invert pl-7">
                You are just a <span class="font-bold">Sign In</span> away from learning to invest.
            </article>
        </div>
        <div class="flex justify-center items-center">
            <div class="space-x-4">
                <br />
                <button @click="signInWithGoogle"
                    class="bg-white text-black py-2 px-4 rounded flex items-center space-x-2 focus:outline-none focus:ring focus:ring-blue-200">
                    <img src="@/assets/google_logo.svg" alt="Google Logo" class="w-6 h-6" />
                    <span>Sign In with Google</span>
                </button>
            </div>
        </div>
    </div>
</template>