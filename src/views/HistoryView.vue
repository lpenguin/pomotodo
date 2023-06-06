<script setup lang="ts">
import TodoHistoryList from '@/components/history/HistoryList.vue'
import { useHistoryStore } from '@/stores/history';
import { computed } from 'vue';
const historyStore = useHistoryStore();
const history = computed(() => historyStore.getAll());
</script>

<template>
  <main>
    <TodoHistoryList :history="history"/>
  </main>
</template>