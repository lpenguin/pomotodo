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
        <div class="col-md-8">
            <input class="form-check-input" type="checkbox" v-model="viewedTodo.isDone"
                @input="emit('change', viewedTodo)" />
            &nbsp;
            <span v-if="todo.isDone">
                <del>{{ todo.name }}</del>
            </span>
            <span v-else>{{ todo.name }}</span>
        </div>
        <div class="col-md-4 text-end">
            <span class="me-3">{{ todo.pomodoros }} / {{ todo.estimatedPomodoros }}</span>

            <button class="btn btn-secondary btn-sm" @click="() => emit('edit')">
                <i class="bi bi-pencil"></i>
            </button>
        </div>
    </div>
</template>