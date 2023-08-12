<script setup lang="ts">
import CurrentLeaderboard from '@/components/leaderboard/CurrentLeaderboard.vue';
import WeeklyLeaderboard from '@/components/leaderboard/WeeklyLeaderboard.vue';
import MontlyLeaderboard from '@/components/leaderboard/MonthlyLeaderboard.vue';
import { ref } from 'vue';

const selectedTab = ref('C');
</script>
<template>
  <div class="navbar bg-base-300">
    <span class="normal-case text-xl font-bold">LeaderBoard</span>
  </div>
  <article class="prose dark:prose-invert pl-2">
    Welcome to the game leaderboard
  </article>
  <div class="tabs">
    <a class="tab tab-lg tab-lifted " :class="selectedTab === 'C' ? 'tab-active' : ''" @click="selectedTab = 'C'">Current
      Game</a>
    <a class="tab tab-lg tab-lifted " :class="selectedTab === 'W' ? 'tab-active' : ''" @click="selectedTab = 'W'">Last 7
      days</a>
    <a class="tab tab-lg tab-lifted" :class="selectedTab === 'M' ? 'tab-active' : ''" @click="selectedTab = 'M'">Last 30
      days</a>
  </div>
  <CurrentLeaderboard v-if="selectedTab === 'C'" />
  <WeeklyLeaderboard v-else-if="selectedTab === 'W'" />
  <MontlyLeaderboard v-else-if="selectedTab === 'M'" />
</template>