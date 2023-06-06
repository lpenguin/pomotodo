import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core';
import type { TodoHistoryItem } from '@/models/todohistoryitem';

export const useHistoryStore = defineStore('history', () => {
    const history = useLocalStorage<TodoHistoryItem[]>('history', []);

    return {
        add: (item: TodoHistoryItem) => {
            history.value.push(item);
        },
        getAll: (): TodoHistoryItem[] => {
            return [...history.value];
        }
    };
});

export type HistoryStore = ReturnType<typeof useHistoryStore>;