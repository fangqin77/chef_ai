<template>
  <a-layout style="height:100vh">
    <a-layout-sider collapsible :style="{ position:'sticky', top:'0', height:'100vh', overflow:'auto' }">
      <div style="height:48px;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600">Chef AI 管理</div>
      <a-menu theme="dark" mode="inline" :selectedKeys="[active]" @click="onMenu">
        <a-menu-item key="/audit/posts">
          <template #icon><span class="anticon">📝</span></template>
          <span class="menu-text">帖子审核</span>
        </a-menu-item>
        <a-menu-item key="/audit/comments">
          <template #icon><span class="anticon">💬</span></template>
          <span class="menu-text">评论审核</span>
        </a-menu-item>
        <a-menu-item key="/reports">
          <template #icon><span class="anticon">🚩</span></template>
          <span class="menu-text">举报处理</span>
        </a-menu-item>
        <a-menu-item key="/recipes">
          <template #icon><span class="anticon">🍳</span></template>
          <span class="menu-text">菜谱管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="height:100vh">
      <a-layout-header style="background:#fff;display:flex;justify-content:flex-end">
        <a-button type="link" @click="logout">退出登录</a-button>
      </a-layout-header>
      <a-layout-content style="margin:16px; height: calc(100vh - 64px - 32px); overflow:auto">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
const route = useRoute();
const router = useRouter();
const active = computed(()=>route.path);
const onMenu = ({ key }: any) => router.push(key);
const logout = () => { localStorage.removeItem('ADMIN_TOKEN'); router.push('/login'); };
</script>

<style>
/* 使文本在 sider 收起时自动隐藏，仅展示图标 */
.ant-layout-sider-collapsed .menu-text { display: none; }
.ant-layout-sider .ant-menu-item { display: flex; align-items: center; }
.ant-layout-sider .ant-menu-item .anticon { width: 20px; display: inline-flex; justify-content: center; }
</style>
