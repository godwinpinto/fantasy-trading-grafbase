<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia'

const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore)

const { signInWithGoogle, signOut } = useUserStore();

</script>
<template>
  <div class="navbar bg-base-300">
    <div class="flex-1">
      <div class="w-36 rounded-full">
        <img src="@/assets/app-logo.png">
      </div>
    </div>
    <div v-if="userInfo.userId != ''" class="flex items-center space-x-3 mr-6">
      <RouterLink to="/admin">.</RouterLink>

      <div class="avatar">
        <div class="mask mask-squircle w-12 h-12">
          <img :src="userInfo.profileImage" alt="Profile Image" />
        </div>
      </div>
      <div>
        <div class="font-bold">Welcome</div>
        <div class="text-sm opacity-50">{{ userInfo.username }}</div>
      </div>
    </div>

    <div class="flex-none">
      <button class="btn btn-ghost" v-if="userInfo.userId != ''" @click="signOut">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
        <span>Sign out</span>
      </button>
      <button @click="signInWithGoogle" v-if="userInfo.userId == ''"
        class="bg-white text-black py-2 px-4 rounded flex items-center space-x-2 focus:outline-none focus:ring focus:ring-blue-200">
        <img src="@/assets/google_logo.svg" alt="Google Logo" class="w-6 h-6" />
        <span>Sign In with Google</span>
      </button>
    </div>
  </div>
</template>