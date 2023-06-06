<script setup lang="ts">
import type { Pomodoro } from '@/models/pomodoro';
import type { Todo } from '@/models/todo';
import { computed } from 'vue';

interface PrimaryButtonState {
    text: string;
    onClick: () => void;
}


const props = defineProps<{
    pomodoro: Pomodoro,
    activeTodos: Todo[],
}>();

const emit = defineEmits<{
    start: [],
    pause: [],
    next: [],
    selectTodoById: [id: string],
}>();

const buttonState = computed(getButtonState);

function getButtonState(): PrimaryButtonState {
    if (props.pomodoro.isStarted) {
        return {
            text: 'Pause',
            onClick: () => emit('pause'),
        }
    }
    else {
        return {
            text: props.pomodoro.timeElapsed === 0
                ? 'Start'
                : 'Continue',
            onClick: () => emit('start'),
        }
    }
}

</script>
<template>
    <div class="input-group mb-3 mt-3">
        <select class="form-select form-select-sm fs-4"
            v-bind:disabled="props.pomodoro.isStarted"
            @change="emit('selectTodoById', ($event.target as HTMLSelectElement).value)">
            <option></option>
            <option v-for="todo in activeTodos" v-bind:key="todo.id" v-bind:selected="todo.id === pomodoro.todoId"
                v-bind:value="todo.id">
                {{ todo.name }}
            </option>
        </select>
        <button class="btn btn-primary btn-lg" @click="buttonState.onClick" style="min-width: 6rem;">
            {{ buttonState.text }}
        </button>
        <button class="btn btn-outline-primary" @click="emit('next')">
            <i class="bi bi-arrow-bar-right"></i>
        </button>
    </div>
</template>