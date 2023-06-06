import type { ScheduleItem } from "./scheduleitem";

export interface Pomodoro {
    time: number;
    timeElapsed: number;
    todoId?: string;
    isStarted: boolean;
    lastUpdateTime?: number; // UTC seconds    
    title: string;
    index: number;
}

export function fromScheduleItem(item: ScheduleItem, index: number): Pomodoro {
    return {
        time: item.time,
        timeElapsed: 0,
        isStarted: false,
        title: item.title,
        index,
    }
}