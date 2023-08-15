<script setup lang="ts">
import Leaderboard from '@/components/leaderboard/TheLeaderboard.vue';
import NavBar from '@/components/global/NavBar.vue';
import ChatWidget from '@/components/game/ChatWidget.vue'
import ContestStocks from '@/components/game/ContestStocks.vue';
import TheLogin from '@/components/auth/TheLogin.vue';
import { useUserStore } from '@/stores/userStore';
import {  onBeforeMount, ref } from "vue";

const isAuthSetTried = ref(false);
const { asyncSetUser } = useUserStore();

onBeforeMount(() => {
  
      isAuthSetTried.value = true;
});
</script>
<template>
  <div class="h-screen">
  <NavBar />
  <main>

    <div class="flex flex-col bg-base-300" v-if="isAuthSetTried">
      <div class="flex-1 flex flex-col sm:flex-row">
        <main class="flex-1">
          <Leaderboard />
        </main>
        <nav class="order-first sm:w-1/3 ">
          <ContestStocks />
          <TheLogin />
        </nav>
        <aside class="sm:w-1/4">
          <ChatWidget />
        </aside>
      </div>
    </div>
  </main>
</div>
</template>
