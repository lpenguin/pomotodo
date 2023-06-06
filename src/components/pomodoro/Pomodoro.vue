<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { Pomodoro } from "@/models/pomodoro";
import { } from "bootstrap";
import moment from 'moment';

const props = defineProps<{
  pomodoro: Pomodoro
}>();

function getFormattedTime() {
  const etaSeconds = props.pomodoro.time - props.pomodoro.timeElapsed;
  return moment.utc(etaSeconds * 1000).format('mm:ss');
}

</script>

<template>
  <h2 class="display-5 text-center">
    {{ pomodoro.title }}
  </h2>
  <h1 class="display-1 text-center" style="font-size: 7rem;">
    {{ getFormattedTime() }}
  </h1>
  <div>
    <div class="progress">
      <div class="progress-bar" :style="'width:' + pomodoro.timeElapsed / (pomodoro.time - 1) * 100 + '%'" role="progressbar"
        aria-label="Basic example" v-bind:aria-valuenow="pomodoro.timeElapsed" aria-valuemin="0"
        v-bind:aria-valuemax="pomodoro.time">
      </div>
    </div>
  </div>

  <!-- <div>
      <i>#{{ pomodoro.index }}, {{ pomodoro.timeElapsed }} / {{ pomodoro.time }} seconds</i>
    </div> -->
</template>