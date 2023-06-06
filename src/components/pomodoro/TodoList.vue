<script setup lang="ts">
import type { Todo } from '@/models/todo';
import TodoItem from './TodoItem.vue';
import { ref } from 'vue';


defineProps<{todos: Todo[]}>();

const emit = defineEmits<{
    add: [todo: Todo],
    change: [todo: Todo],
}>();

const nextTodoName = ref<string>('');

function addTodo() {
    emit('add',{
        id: crypto.randomUUID(),
        name: nextTodoName.value,
        isDone: false,
        estimatedPomodoros: 1,
        pomodoros: 0
    });

    nextTodoName.value = '';
}
</script>
                
<template>
        <p class="h2 mt-4 mb-3">Things to do</p>
    <div>
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @change="e => emit('change', e )" />

        <div class="input-group">
            <input type="text" v-model="nextTodoName" class="form-control" placeholder="Name" />
            <button @click="addTodo" type="button" class="btn btn-primary">Add</button>
        </div>
    </div>
</template>