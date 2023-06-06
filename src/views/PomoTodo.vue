<script setup lang="ts">
import PomodoroView from "@/components/pomodoro/Pomodoro.vue";
import PomodoroControls from '@/components/pomodoro/PomodoroControls.vue';
import TodoList from '@/components/pomodoro/TodoList.vue';
import { computed, onMounted, onUnmounted } from "vue";

import { usePomodoroStore } from "@/stores/pomodoro";
import { useScheduleStore } from "@/stores/schedule";
import { useTodoStore } from "@/stores/todo";
import { useHistoryStore } from "@/stores/history";

import { PomodoroTimer } from "@/business/pomodoro-timer.js";
import { NotificationManager } from "@/business/notification-manager.js";

const pomodoroStore = usePomodoroStore();
const scheduleStore = useScheduleStore();
const todoStore = useTodoStore();
const historyStore = useHistoryStore();

const activeTodos = computed(() => todoStore.getAll().filter(todo => !todo.isDone));

const pomodoroTimer = new PomodoroTimer({
    pomodoroStore,
    historyStore,
    todoStore,
    scheduleStore,
    notificationManager: new NotificationManager()
});



onMounted(() => {
    pomodoroTimer.mount();
});

onUnmounted(() =>  {
    pomodoroTimer.unmount();
});
</script>

<template>
    <div class="container" style="max-width: 40rem;">
        <PomodoroView :pomodoro="pomodoroStore.pomodoro" />

        <PomodoroControls :pomodoro="pomodoroStore.pomodoro" :active-todos="activeTodos" @start="e => pomodoroTimer.start()"
            @pause="e => pomodoroTimer.stop()" @next="e => pomodoroTimer.next()"
            @selectTodoById="todoId => pomodoroStore.update({ ...pomodoroStore.pomodoro, todoId })" />

        <TodoList :todos="todoStore.getAll()" @add="todoStore.add" @change="todoStore.update" />
    </div>
</template>