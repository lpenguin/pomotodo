import { defineStore } from 'pinia'
import type { Todo } from '@/models/todo';
import { useLocalStorage } from '@vueuse/core';

export const useTodoStore = defineStore('todo', () => {
    const todoList = useLocalStorage<Todo[]>('todo.list', [])

    return {
        add: (todo: Todo) => {
            todoList.value.push(todo);
        },
        update: (todo: Todo) => {
            todoList.value = todoList.value.map(other => other.id === todo.id ? todo : other)
        },
        getById: (todoId: string): Todo | undefined => {
            return todoList.value.find(todo => todo.id === todoId);
        },
        getAll: (): Todo[] => {
            return [...todoList.value];
        },
        remove: (todo: Todo) => {
            todoList.value = todoList.value.filter(other => other.id !== todo.id);
        },
    };
});

export type TodoStore = ReturnType<typeof useTodoStore>;