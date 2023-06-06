import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core';
import { fromScheduleItem, type Pomodoro } from '@/models/pomodoro';
import { useScheduleStore } from './schedule';
import { computed } from 'vue';

export const usePomodoroStore = defineStore('pomodoro', () => {
  const scheduleStore = useScheduleStore();
  const pomodoro = useLocalStorage<Pomodoro>('pomodoro', fromScheduleItem(scheduleStore.getByIndex(0), 0));
  
  return {
    pomodoro: computed<Pomodoro>(() => pomodoro.value),
    update: (other: Pomodoro) => { pomodoro.value = other },
  }
})

export type PomodoroStore = ReturnType<typeof usePomodoroStore>