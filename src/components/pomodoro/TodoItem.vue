<script setup lang="ts">
import type { Todo } from '@/models/todo';
import { ref } from 'vue';

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}

const isEditorEnabled = ref(false);

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  change: [todo: Todo]
}>();

function nameChange(event: HTMLElementEvent<HTMLInputElement>) {
  const newTodo = {
    ...props.todo,
    name: event.target.value
  };

  emit('change', newTodo);
}

function isDoneChange(event: HTMLElementEvent<HTMLInputElement>) {
  const newTodo: Todo = {
    ...props.todo,
    isDone: event.target.checked
  };
  emit('change', newTodo);
}

function estimatedPomodorosChange(event: HTMLElementEvent<HTMLInputElement>) {
  const newTodo: Todo = {
    ...props.todo,
    estimatedPomodoros: event.target.valueAsNumber
  };

  emit('change', newTodo);
}

function pomodorosChange(event: HTMLElementEvent<HTMLInputElement>) {
  const newTodo: Todo = {
    ...props.todo,
    pomodoros: event.target.valueAsNumber
  };

  emit('change', newTodo);
}

</script>


<template>
  <div class="">
    <div v-if="isEditorEnabled" class="input-group">
      <div class="input-group-text">
        <input class="form-check-input" type="checkbox" v-bind:checked="todo.isDone"
          @input="isDoneChange($event as HTMLElementEvent<HTMLInputElement>)" />
      </div>

      <input class="form-control w-50" type="text" :value="todo.name" placeholder="Name"
        @input="nameChange($event as HTMLElementEvent<HTMLInputElement>)" />

      <input class="form-control" type="number" min="0" v-bind:value="todo.pomodoros"
        @input="pomodorosChange($event as HTMLElementEvent<HTMLInputElement>)" />

      <span class="input-group-text">
        /
      </span>

      <input class="form-control" type="number" min="1" v-bind:value="todo.estimatedPomodoros"
        @input="estimatedPomodorosChange($event as HTMLElementEvent<HTMLInputElement>)" />

      <button class="form-control" @click="isEditorEnabled = false">
        Save
      </button>
    </div>
    <div v-else class="row align-items-center">
      <div class="col-md-1">
        <input class="form-check-input" type="checkbox" v-bind:checked="todo.isDone"
          @input="isDoneChange($event as HTMLElementEvent<HTMLInputElement>)" />
      </div>
      <div class="col-md-8">
        <span v-if="todo.isDone">
          <del>{{ todo.name }}</del>
        </span>
        <span v-else>{{ todo.name }}</span>
      </div>
      <div class="col-md-3 text-end">
        <span class="me-3">{{ todo.pomodoros }} / {{ todo.estimatedPomodoros }}</span>

        <button class="btn btn-secondary btn-sm" @click="isEditorEnabled = true">
          <i class="bi bi-pencil"></i>
        </button>
      </div>
    </div>
    <hr class="mb-2 mt-2"/>
  </div>
</template>

<style>
.small-span {
  width: 50px;
}
</style>