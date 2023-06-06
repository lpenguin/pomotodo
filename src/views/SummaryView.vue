<script setup lang="ts">
import TodoSummaryList from '@/components/summary/SummaryList.vue';
import { useHistoryStore } from '@/stores/history'
import { computed } from 'vue';

const historyStore = useHistoryStore();
const history = computed(() => historyStore.getAll());
</script>

<template>
  <main>
    <TodoSummaryList :history="history" />
  </main>
</template>