import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core';
import { defaultSchedule, type ScheduleItem } from '@/models/scheduleitem';

export const useScheduleStore = defineStore('schedule', () => {
  const schedule = useLocalStorage<ScheduleItem[]>('schedule', defaultSchedule())
 
  return {
    getByIndex: (index: number): ScheduleItem => schedule.value[index % schedule.value.length],
  }
});

export type ScheduleStore = ReturnType<typeof useScheduleStore>;