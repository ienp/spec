import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '../layouts/index.vue'

const basicRouter = [
  {
    path: '/',
    redirect: '/home',
    component: () => Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/home.vue'),
        meta: {
          title: 'Home'
        }
      }
    ]
  },
  {
    path: '/setting',
    name: 'Setting',
    component: import('../views/setting/index.vue')
  }
] as RouteRecordRaw[]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRouter as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})
