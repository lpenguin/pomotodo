<script setup lang="ts">
import type { Todo } from '@/models/todo';
import { ref } from 'vue';
import TodoItemEditor from './TodoItemEditor.vue';
import TodoItemView from './TodoItemView.vue';

const isEditorEnabled = ref(false);

defineProps<{
  todo: Todo
}>();


const emit = defineEmits<{
  change: [todo: Todo],
  delete: [todo: Todo],
}>();

</script>


<template>
  <div class="">
    <TodoItemEditor 
      v-if="isEditorEnabled" 
      :todo="todo"
      @change="e => {isEditorEnabled = false; emit('change', e )}"
      @delete="e => emit('delete', e )"   
    />
    <TodoItemView v-else 
      :todo="todo"
      @edit="isEditorEnabled = true"
      @change="e => emit('change', e )"
    />
    <hr class="mb-2 mt-2" />
  </div>
</template>

<style>
.small-span {
  width: 50px;
}</style>