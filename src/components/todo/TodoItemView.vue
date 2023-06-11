<script setup lang="ts">
import type { Todo } from '@/models/todo';
import { ref } from 'vue';

const props = defineProps<{
    todo: Todo
}>();

const viewedTodo = ref({ ...props.todo });

const emit = defineEmits<{
    change: [todo: Todo],
    edit: [],
}>();

</script>


<template>
    <div class="row align-items-center">
        <div class="col-1" style="width: 0;">
            <input class="form-check-input" type="checkbox" v-model="viewedTodo.isDone"
                @input="emit('change', viewedTodo)" />
        </div>
        <div class="col-8">
            <span :class="{
                'text-decoration-line-through': todo.isDone,
                'text-secondary': todo.isDone
            }">
                {{ todo.name }}
            </span>
        </div>
        <div class="col-3 text-end">
            <span class="me-3">{{ todo.pomodoros }} / {{ todo.estimatedPomodoros }}</span>

            <button class="btn btn-secondary btn-sm align-items-right" @click="() => emit('edit')">
                <i class="bi bi-pencil"></i>
            </button>
        </div>
    </div>
</template>