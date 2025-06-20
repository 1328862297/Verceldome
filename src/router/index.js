import { createRouter, createWebHistory } from 'vue-router'
 

// 导入视图组件
import HomeView from '../layout/index.vue'
import login from '../pages/login.vue'
import pdflist from '../pages/pdflist.vue'
import WordPage from '../pages/wordPage.vue'
import typelist from '../pages/typelist.vue'
import typeworks from '../pages/typeworks.vue'
import background from '../pages/background.vue'
const  router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Collection',
      component: background
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wordPage',
      name: 'WordPage',
      component: WordPage,
    },
    {
      path: '/typelist',
      name: 'typelist',
      component: typelist,
    },
    {
      path: '/typeworks',
      name: 'typeworks',
      component: typeworks,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // 路由懒加载
    //   component: () => import('../views/AboutView.vue')
    // },
    // {
    //   // 404 页面
    //   path: '/:pathMatch(.*)*',
    //   name: 'not-found',
    //   component: () => import('../views/NotFoundView.vue')
    // }
  ]
})
 
export default router