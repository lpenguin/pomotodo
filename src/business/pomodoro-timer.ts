import { fromScheduleItem, type Pomodoro } from "@/models/pomodoro";
import { Timer } from "@/utils/timer";
import type { PomodoroStore } from "@/stores/pomodoro";
import type { TodoStore } from "@/stores/todo";
import type { ScheduleStore } from "@/stores/schedule";
import type { HistoryStore } from "@/stores/history";
import type { NotificationManager } from "./notification-manager";

interface Options {
    pomodoroStore: PomodoroStore;
    todoStore: TodoStore;
    scheduleStore: ScheduleStore;
    historyStore: HistoryStore;
    notificationManager: NotificationManager;
}

export class PomodoroTimer {
    private readonly pomodoroStore: PomodoroStore;
    private readonly todoStore: TodoStore;
    private readonly scheduleStore: ScheduleStore;
    private readonly historyStore: HistoryStore;
    private readonly notificationManager: NotificationManager;
    private readonly timer: Timer = new Timer({ update: () => this.update() });

    constructor(options: Options) {
        this.pomodoroStore = options.pomodoroStore;
        this.todoStore = options.todoStore;
        this.scheduleStore = options.scheduleStore;
        this.historyStore = options.historyStore;
        this.notificationManager = options.notificationManager;
    }

    public unmount() {
        this.timer.stop();
    }

    public mount() {
        this.notificationManager.requestPermission().then(granted => {
            console.log('Notification permission granted: ' + granted);
        });

        if (this.pomodoroStore.pomodoro.isStarted) {
            this.update();
            this.timer.start();
        }
    }

    public stop() {
        this.timer.stop();
        this.pomodoroStore.update({
            ...this.pomodoroStore.pomodoro,
            isStarted: false
        });
    }

    public start() {
        this.pomodoroStore.update({
            ...this.pomodoroStore.pomodoro,
            lastUpdateTime: Date.now(),
            isStarted: true
        });
        this.timer.start();
        this.update();
    }

    public next(): Pomodoro {
        this.timer.stop();
        const oldPomodoro = this.pomodoroStore.pomodoro;
        const oldScheduleItem = this.scheduleStore.getByIndex(oldPomodoro.index);

        const nextScheduleItem = this.scheduleStore.getByIndex(oldPomodoro.index + 1);
        const nextPomodoro = {
            ...fromScheduleItem(nextScheduleItem, oldPomodoro.index + 1),
            todoId: oldPomodoro.todoId,
        };
        this.pomodoroStore.update(nextPomodoro);

        const todo = oldPomodoro.todoId === undefined
            ? undefined
            : this.todoStore.getById(oldPomodoro.todoId);

        if (todo !== undefined) {
            if (oldScheduleItem.increasePomodoros) {
                this.todoStore.update({
                    ...todo,
                    pomodoros: todo.pomodoros + 1
                });
                this.historyStore.add({
                    todoId: todo.id,
                    name: todo.name,
                    date: new Date(),
                    timeElapsed: oldPomodoro.timeElapsed,
                })
            }
        }

        return nextPomodoro;
    }

    private update(): void {
        const oldPomodoro = this.pomodoroStore.pomodoro;

        if (oldPomodoro.lastUpdateTime === undefined) {
            return
        }

        const newUpdateDate = Date.now();
        const oldUpdateTime = oldPomodoro.lastUpdateTime;

        const elapsed = (newUpdateDate - oldUpdateTime) / 1000;
        const newPomodoro: Pomodoro = {
            ...oldPomodoro,
            timeElapsed: Math.min(oldPomodoro.time, oldPomodoro.timeElapsed + elapsed),
            lastUpdateTime: newUpdateDate,
        };

        this.pomodoroStore.update(newPomodoro);

        if (newPomodoro.timeElapsed >= newPomodoro.time) {
            const nextPomodoro = this.next();
            this.notificationManager.show('Pomodoro finished', nextPomodoro.title);
        }
    }
}