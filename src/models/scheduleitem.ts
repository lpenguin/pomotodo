export interface ScheduleItem {
    title: string;
    time: number;
    increasePomodoros: boolean;
}

export function defaultSchedule(): ScheduleItem[] {
    return [{
        title: 'Time To Work!',
        time: 25 * 60,
        increasePomodoros: true
    },{
        title: 'Time To Take a Break!',
        time: 5 * 60,
        increasePomodoros: false
    }]
}