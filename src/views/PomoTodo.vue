<script setup lang="ts">
import PomodoroView from "@/components/pomodoro/Pomodoro.vue";
import PomodoroControls from '@/components/pomodoro/PomodoroControls.vue';
import TodoList from '@/components/pomodoro/TodoList.vue';
import { computed } from "vue";

import { usePomodoroStore } from "@/stores/pomodoro";
import { useScheduleStore } from "@/stores/schedule";
import { useTodoStore } from "@/stores/todo";
import { useHistoryStore } from "@/stores/history";

import { PomodoroTimer } from "@/business/PomodoroTimer";
import { NotificationManager } from "@/business/NotificationManager";

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

</script>

<template>
    <div class="container-sm">
        <div class="row">
            <div class="col-sm-5">
                <PomodoroView :pomodoro="pomodoroStore.pomodoro" />
               
                <PomodoroControls
                    :pomodoro="pomodoroStore.pomodoro"
                    :active-todos="activeTodos"

                    @start="e => pomodoroTimer.start()"
                    @pause="e => pomodoroTimer.stop()"
                    @next="e => pomodoroTimer.next()"
                    @selectTodoById="todoId => pomodoroStore.update({...pomodoroStore.pomodoro, todoId})"
                />

                <TodoList 
                    :todos="todoStore.getAll()" 
                    @add="todoStore.add" 
                    @change="todoStore.update" 
                />
            </div>
        </div>

    </div>
</template>