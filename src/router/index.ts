import { createRouter, createWebHistory } from 'vue-router'
import PomoTodo from '../views/PomoTodo.vue'
import SummaryView from '../views/SummaryView.vue'
import HistoryView from '../views/HistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: PomoTodo
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView
    },
    {
      path: '/summaries',
      name: 'summaries',
      component: SummaryView
    }
  ]
})

export default router
