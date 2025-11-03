import http from './http';

export interface PageParams { page?: number; pageSize?: number; [k: string]: any }

export const adminLogin = (username: string, password: string) =>
  http.post('/admin/auth/login', { username, password });

export const fetchAuditPosts = (params: PageParams) =>
  http.get('/admin/community/posts', { params });

export const auditPost = (id: number | string, action: 'approve' | 'reject', reason?: string) =>
  http.post(`/admin/community/posts/${id}/audit`, { action, reason });
