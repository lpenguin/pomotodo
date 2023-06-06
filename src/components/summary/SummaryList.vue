<script setup lang="ts">
import { computed } from "vue";
import moment from 'moment';
import { groupedBy } from '@/utils/array/groupedBy'
import type { TodoHistoryItem } from "@/models/todohistoryitem";

const props = defineProps<{history: TodoHistoryItem[]}>();
const summaryItems = computed(getSummaryItems);

interface DaySummary {
    date: Date;
    items: SummaryItem[];
}

interface SummaryItem {
    name: string;
    id: string;
    timeElapsed: number;
    pomodoros: number;
}

function formatTime(time: number): string {
    return moment.utc(time * 1000).format('HH:mm:ss');
}

function formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD ddd');
}

function getSummaryItems(): DaySummary[] {
    const groupedByDay = groupedBy(props.history, todo => moment(todo.date).startOf('day').toDate().getTime());
    return [...groupedByDay]
        .reverse()
        .map(([date, items]) => ({
            date: new Date(date),
            items: groupedBy(items, todo => todo.todoId)
                .map(([id, items]) => ({
                    name: items[items.length - 1].name,
                    id: id,
                    timeElapsed: items.reduce((acc, item) => acc + item.timeElapsed, 0),
                    pomodoros: items.length,
                }))
        }
        ));
}

</script>
<template>
    
    <div class="row">
        <div class="col-md-6">
            <div class="row" v-for="daySummary in summaryItems" v-bind:key="daySummary.date.getDate()">
                <h3>{{ formatDate(daySummary.date) }}</h3>

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Time Elapsed</th>
                            <th scope="col"># Pomodoros</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in daySummary.items" v-bind:key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ formatTime(item.timeElapsed) }}</td>
                            <td>{{ item.pomodoros }}</td>
                        </tr>
                    </tbody>
                </table>
                <hr />
            </div>

        </div>
    </div>
</template>