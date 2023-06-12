import { createRouter, createWebHashHistory } from 'vue-router'
import PomoTodo from '../views/PomoTodo.vue'
import SummaryView from '../views/SummaryView.vue'
import HistoryView from '../views/HistoryView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: PomoTodo,
      meta: {
        title: 'PomoTODO'
      }
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView, 
      meta: {
        title: 'History'
      }
    },
    {
      path: '/summaries',
      name: 'summaries',
      component: SummaryView,
      meta: {
        title: 'Summaries'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string|undefined ?? 'PomoTODO';
  next();
});
export default router
