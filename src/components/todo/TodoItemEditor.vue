<script setup lang="ts">
import type { Todo } from '@/models/todo';
import { ref } from 'vue';

const props = defineProps<{
  todo: Todo
}>();

const editedTodo = ref({ ...props.todo });

const emit = defineEmits<{
  change: [todo: Todo],
  delete: [todo: Todo],
}>();


function onFormSubmit() {
  emit('change', editedTodo.value);
}
</script>


<template>
    <form class="row g-3 border border-secondary-subtle rounded m-2 pb-2"
      @submit.prevent="onFormSubmit">
      <div class="col-12">
        <div class="row justify-content-between">
          <div class="col-11">
            <h5>{{ editedTodo.name }}</h5>
          </div>
          <div class="col-1">
            <button type="button" class="btn-close" aria-label="Close" @click="() => emit('change', todo)"></button>
          </div>
        </div>
      </div>


      <div class="col-12">
        <label for="inputName" class="form-label">Task name</label>
        <input type="text" class="form-control" id="inputName" placeholder="Task name" v-model="editedTodo.name">
      </div>
      <div class="col-md-6">
        <label for="inputPomodoros" class="form-label">Pomodoros</label>
        <input type="number" min="0" class="form-control" id="inputPomodoros" v-model="editedTodo.pomodoros">
      </div>
      <div class="col-md-6">
        <label for="inputEstimatedPomodoros" class="form-label">Estimated pomodoros</label>
        <input type="number" min="0" class="form-control" id="inputEstimatedPomodoros"
          v-model="editedTodo.estimatedPomodoros">
      </div>
      <div class="col-12">
        <div class="row  justify-content-between">
          <div class="col-2">
            <button type="button" class="btn btn-danger" @click="() => emit('delete', todo)">
              Delete
            </button>
          </div>
          <div class="col-2">
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </form>
    <hr class="mb-2 mt-2" />
</template>