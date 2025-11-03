import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../pages/Login.vue';
import AdminLayout from '../layout/AdminLayout.vue';
import PostsAudit from '../pages/PostsAudit.vue';
import CommentsAudit from '../pages/CommentsAudit.vue';
import Reports from '../pages/Reports.vue';
import RecipesManage from '../pages/RecipesManage.vue';

const routes: RouteRecordRaw[] = [
  { path: '/login', component: Login },
  { path: '/', redirect: '/audit/posts' },
  {
    path: '/',
    component: AdminLayout,
    children: [
      { path: '/audit/posts', component: PostsAudit },
      { path: '/audit/comments', component: CommentsAudit },
      { path: '/reports', component: Reports },
      { path: '/recipes', component: RecipesManage }
    ]
  }
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
