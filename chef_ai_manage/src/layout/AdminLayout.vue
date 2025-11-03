<template>
  <a-layout style="height:100vh">
    <a-layout-sider collapsible :style="{ position:'sticky', top:'0', height:'100vh', overflow:'auto' }">
      <div style="height:48px;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600">Chef AI 管理</div>
      <a-menu theme="dark" mode="inline" :selectedKeys="[active]" @click="onMenu">
        <a-menu-item key="/audit/posts">帖子审核</a-menu-item>
        <a-menu-item key="/audit/comments">评论审核</a-menu-item>
        <a-menu-item key="/reports">举报处理</a-menu-item>
        <a-menu-item key="/recipes">菜谱管理</a-menu-item>
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
