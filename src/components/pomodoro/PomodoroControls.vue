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
    complete: [],
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
        <select class="form-select form-select-sm fs-5"
            @change="emit('selectTodoById', ($event.target as HTMLSelectElement).value)">
            <option></option>
            <option v-for="todo in activeTodos" v-bind:key="todo.id" v-bind:selected="todo.id === pomodoro.todoId"
                v-bind:value="todo.id">
                {{ todo.name }}
            </option>
        </select>

        <button type="button" class="btn btn-primary btn-lg" style="min-width: 6rem;" @click="buttonState.onClick">
            {{ buttonState.text }}
        </button>
        <button type="button" class="btn btn-primary btn-lg dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
            aria-expanded="false">
            <span class="visually-hidden">Additional actions...</span>
        </button>
        <ul class="dropdown-menu">
            <li>
                <button class="dropdown-item" @click="emit('next')">
                    Skip
                </button>
            </li>
            <li>
                <button class="dropdown-item" @click="emit('complete')">
                    Complete
                </button>
            </li>
        </ul>
    </div>
</template>