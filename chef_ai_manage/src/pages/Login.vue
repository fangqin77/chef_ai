<template>
  <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#f5f6f8">
    <a-card style="width:360px">
      <h2 style="text-align:center;margin-bottom:16px">Chef AI 管理端</h2>
      <a-form layout="vertical" @submit.prevent="onSubmit">
        <a-form-item label="用户名">
          <a-input v-model:value="username" placeholder="admin" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input-password v-model:value="password" placeholder="******" />
        </a-form-item>
        <a-button type="primary" block :loading="loading" @click="onSubmit">登录</a-button>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { adminLogin } from '../services/adminApi';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('admin');
const password = ref('');
const loading = ref(false);

const onSubmit = async () => {
  if (!username.value || !password.value) return message.warning('请输入用户名和密码');
  loading.value = true;
  try {
    const { data } = await adminLogin(username.value, password.value);
    if (data?.success) {
      const token = data?.data?.adminToken || data?.adminToken || data?.token;
      if (token) {
        localStorage.setItem('ADMIN_TOKEN', token);
        message.success('登录成功');
        router.push('/audit/posts');
      } else {
        message.error('登录响应缺少 Token');
      }
    } else {
      message.error(data?.message || '登录失败');
    }
  } catch (e: any) {
    message.error(e?.response?.data?.message || e?.message || '登录异常');
  } finally {
    loading.value = false;
  }
};
</script>
