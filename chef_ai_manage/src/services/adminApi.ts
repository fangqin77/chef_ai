import http from './http';

export interface PageParams { page?: number; pageSize?: number; [k: string]: any }

export const adminLogin = (username: string, password: string) =>
  http.post('/admin/auth/login', { username, password });

export const fetchAuditPosts = (params: PageParams) =>
  http.get('/admin/community/posts', { params });

export const auditPost = (id: number | string, action: 'approve' | 'reject', reason?: string) =>
  http.post(`/admin/community/posts/${id}/audit`, { action, reason });

export const fetchAdminComments = (params: PageParams) =>
  http.get('/admin/community/comments', { params });

export const auditComment = (id: number | string, action: 'approve' | 'reject', reason?: string) =>
  http.post(`/admin/community/comments/${id}/audit`, { action, reason });

export const fetchReports = (params: PageParams) =>
  http.get('/admin/community/reports', { params });

export const resolveReport = (id: number | string, decision: 'approved' | 'rejected') =>
  http.post(`/admin/community/reports/${id}/resolve`, { decision });

// 菜谱管理
export const fetchRecipes = (params: PageParams) =>
  http.get('/admin/recipes', { params });
export const createRecipe = (body: any) =>
  http.post('/admin/recipes', body);
export const updateRecipe = (id: number | string, body: any) =>
  http.put(`/admin/recipes/${id}`, body);
export const deleteRecipe = (id: number | string) =>
  http.delete(`/admin/recipes/${id}`);

export const fetchRecipeCategories = () =>
  http.get('/admin/recipes/categories');

// 收藏相关
export const favoriteRecipe = (id: number | string) =>
  http.post(`/admin/recipes/${id}/favorite`);
export const unfavoriteRecipe = (id: number | string) =>
  http.delete(`/admin/recipes/${id}/favorite`);
export const fetchFavoriteRecipes = (params: PageParams) =>
  http.get('/admin/recipes/favorites', { params });
