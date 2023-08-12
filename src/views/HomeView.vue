<script setup lang="ts">
import Leaderboard from '@/components/leaderboard/TheLeaderboard.vue';
import NavBar from '@/components/global/NavBar.vue';
import ChatWidget from '@/components/game/ChatWidget.vue'
import ContestStocks from '@/components/game/ContestStocks.vue';
import TheLogin from '@/components/auth/TheLogin.vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useUserStore } from '@/stores/userStore';
import { onBeforeMount, ref, watch } from "vue";

const isAuthSetTried = ref(false);
const { asyncSetUser } = useUserStore();
const { loginWithRedirect, user, isAuthenticated } = useAuth0();

watch(user, (newValue, oldValue) => {
  console.log("newValue",newValue);
  console.log("user.value",user.value);
  if (newValue !== oldValue && newValue) {
    asyncSetUser(user.value).then(() => {
      isAuthSetTried.value = true;
    });
  } else {
    isAuthSetTried.value = false;
  }
});


onBeforeMount(() => {

  if (isAuthenticated.value) {
    console.log("on mount true",user)
    asyncSetUser(user.value).then(() => {
      isAuthSetTried.value = true;
    });

  } else {
    console.log("on mount false")
    isAuthSetTried.value = true;

  }
});
</script>
<template>
  <NavBar />{{ user }}
  <main>

    <div class="flex flex-col bg-base-300" v-if="isAuthSetTried">
      <div class="flex-1 flex flex-col sm:flex-row">
        <main class="flex-1">
          <Leaderboard />
        </main>
        <nav class="order-first sm:w-1/4">
          <ContestStocks />
          <TheLogin />
        </nav>
        <aside class="sm:w-1/4 ">
          <ChatWidget />
        </aside>
      </div>
    </div>
  </main>
</template>
