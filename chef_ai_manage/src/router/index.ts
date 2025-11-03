import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../pages/Login.vue';
import PostsAudit from '../pages/PostsAudit.vue';

const routes: RouteRecordRaw[] = [
  { path: '/login', component: Login },
  { path: '/', redirect: '/audit/posts' },
  { path: '/audit/posts', component: PostsAudit }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('ADMIN_TOKEN');
  if (to.path !== '/login' && !token) return next('/login');
  next();
});

export default router;
