<template>
  <div style="padding:16px">
    <div style="display:flex;gap:8px;margin-bottom:12px">
      <a-input v-model:value="keyword" placeholder="关键词" style="width:220px" />
      <a-select v-model:value="auditStatus" style="width:160px" :options="auditOptions" />
      <a-button type="primary" @click="loadData(1)">查询</a-button>
      <a-button @click="reset">重置</a-button>
      <div style="flex:1"></div>
    </div>

    <a-table :data-source="list" :columns="columns" :pagination="pagination" row-key="id" @change="onTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='content'">
          <span>{{ (record.content || '').slice(0, 50) }}</span>
        </template>
        <template v-else-if="column.key==='audit'">
          <a-space>
            <a-button size="small" type="primary" @click="doAudit(record.id, 'approve')">通过</a-button>
            <a-button size="small" danger @click="doAudit(record.id, 'reject')">驳回</a-button>
            <a-button size="small" danger @click="doDelete(record.id)">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchAuditPosts, auditPost, deletePost } from '../services/adminApi';
import { message, Modal } from 'ant-design-vue';

const list = ref<any[]>([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const auditStatus = ref<'pending'|'approved'|'rejected'|'all'>('pending');

const auditOptions = [
  { label: '待审核', value: 'pending' },
  { label: '已通过', value: 'approved' },
  { label: '已驳回', value: 'rejected' },
  { label: '全部', value: 'all' }
];

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
  { title: '用户', dataIndex: 'user_nickname', key: 'user_nickname', width: 160 },
  { title: '内容', dataIndex: 'content', key: 'content' },
  { title: '状态', dataIndex: 'audit_status', key: 'audit_status', width: 120 },
  { title: '操作', key: 'audit', width: 160 }
];

const pagination = ref({ current: page.value, pageSize: pageSize.value, total: total.value, showTotal: (t:number)=>`共 ${t} 条` });

const loadData = async (p?: number) => {
  if (p) page.value = p;
  try {
    const params: any = { page: page.value, pageSize: pageSize.value, keyword: keyword.value };
    if (auditStatus.value !== 'all') params.audit_status = auditStatus.value;
    const { data } = await fetchAuditPosts(params);
    if (data?.success) {
      list.value = data?.data?.list || data?.list || [];
      total.value = data?.data?.total ?? data?.total ?? 0;
      pagination.value = { ...pagination.value, current: page.value, pageSize: pageSize.value, total: total.value };
    } else {
      message.error(data?.message || '加载失败');
    }
  } catch (e:any) {
    message.error(e?.response?.data?.message || e?.message || '加载异常');
  }
};

const doAudit = async (id: number, action: 'approve' | 'reject') => {
  Modal.confirm({
    title: action === 'approve' ? '确认通过该帖子？' : '确认驳回该帖子？',
    async onOk() {
      try {
        const { data } = await auditPost(id, action);
        if (data?.success) {
          message.success(action === 'approve' ? '已通过' : '已驳回');
          loadData();
        } else {
          message.error(data?.message || '操作失败');
        }
      } catch (e:any) {
        message.error(e?.response?.data?.message || e?.message || '操作异常');
      }
    }
  });
};

const onTableChange = (pg:any) => {
  page.value = pg.current;
  pageSize.value = pg.pageSize;
  loadData();
};

const reset = () => {
  keyword.value = '';
  auditStatus.value = 'pending';
  loadData(1);
};

const logout = () => {
  localStorage.removeItem('ADMIN_TOKEN');
  location.href = '/login';
};

onMounted(() => loadData(1));

const doDelete = async (id: number) => {
  Modal.confirm({
    title: '确认删除该帖子？该操作不可恢复！',
    async onOk() {
      try {
        const { data } = await deletePost(id);
        if (data?.success && (data?.data?.deleted ?? true)) {
          message.success('删除成功');
          // 从当前列表移除该项，避免再次请求
          list.value = list.value.filter(item => item.id !== id);
          // 如需分页数据同步，可改为重新加载：
          // await loadData(page.value);
        } else {
          message.error(data?.message || '删除失败');
        }
      } catch (e:any) {
        message.error(e?.response?.data?.message || e?.message || '删除异常');
      }
    }
  });
};
</script>
