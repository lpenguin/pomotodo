<script setup lang="ts">
import type { Todo } from '@/models/todo';
import TodoItem from './TodoItem.vue';
import { computed, reactive, ref } from 'vue';
import { sortedBy } from '@/utils/array';


defineProps<{todos: Todo[]}>();

const emit = defineEmits<{
    add: [todo: Todo],
    change: [todo: Todo],
    delete: [todo: Todo],
}>();

const nextTodoName = ref<string>('');

function orderedTodos(todos: Todo[]): Todo[] {
    const indexedTodos = todos.map((todo, i) => [todo, i] as [Todo, number]);
    const sortedByIsDone = sortedBy(indexedTodos, indexedTodo => `${indexedTodo[0].isDone} ${indexedTodo[1]}`)
    return sortedByIsDone.map(indexedTodo => indexedTodo[0])
}

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

<style>
.todo-item-list-move,
.todo-item-list-enter-active,
.todo-item-list-leave-active {
  transition: all 0.5s ease;
}
.todo-item-list-enter-from,
.todo-item-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
<template>
    <p class="h2 mt-4 mb-3">Things to do</p>
    <div>
        <TransitionGroup name="todo-item-list" tag="div">
            <TodoItem
                v-for="todo in orderedTodos(todos)" 
                :key="todo.id" 
                :todo="todo"
                @change="e => emit('change', e )" 
                @delete="e => emit('delete', e )"
            />
        </TransitionGroup>

        <form @submit.prevent="addTodo">
            <div class="input-group">
                <input type="text" v-model="nextTodoName" class="form-control" placeholder="Task name" />
                <button type="submit" class="btn btn-primary">Add</button>
            </div>
        </form>
    </div>
</template>