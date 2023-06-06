<script setup lang="ts">
import type { TodoHistoryItem } from '@/models/todohistoryitem';
import moment from 'moment';

defineProps<{history: TodoHistoryItem[]}>();

function formatTime(time: number): string {
    return moment.utc(time * 1000).format('HH:mm:ss');
}

function formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

</script>
<template>
    <div class="row">
        <div class="col-md-6">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Time Elapsed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in history" v-bind:key="`${item.date}`">
                        <td>{{ formatDate(item.date) }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ formatTime(item.timeElapsed) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>