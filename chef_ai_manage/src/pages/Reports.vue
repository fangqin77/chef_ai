<template>
  <div style="padding:16px">
    <div style="display:flex;gap:8px;margin-bottom:12px">
      <a-select v-model:value="targetType" style="width:160px" :options="targetOptions" />
      <a-select v-model:value="status" style="width:160px" :options="statusOptions" />
      <a-button type="primary" @click="loadData(1)">查询</a-button>
    </div>

    <a-table :data-source="list" :columns="columns" :pagination="pagination" row-key="id" @change="onTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='action'">
          <a-space>
            <a-button size="small" type="primary" @click="resolve(record.id, 'approved')">通过</a-button>
            <a-button size="small" danger @click="resolve(record.id, 'rejected')">驳回</a-button>
            <a-button size="small" danger v-if="record.target_type==='comment'" @click="doDeleteComment(record.target_id)">删除评论</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchReports, resolveReport, deleteComment } from '../services/adminApi';
import { message, Modal } from 'ant-design-vue';

const list = ref<any[]>([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(10);
const targetType = ref<'all'|'post'|'comment'>('all');
const status = ref<'all'|'pending'|'approved'|'rejected'>('pending');

const targetOptions = [
  { label: '全部', value: 'all' },
  { label: '帖子', value: 'post' },
  { label: '评论', value: 'comment' }
];
const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '待处理', value: 'pending' },
  { label: '已通过', value: 'approved' },
  { label: '已驳回', value: 'rejected' }
];

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
  { title: '类型', dataIndex: 'target_type', key: 'target_type', width: 120 },
  { title: '目标ID', dataIndex: 'target_id', key: 'target_id', width: 120 },
  { title: '举报人', dataIndex: 'reporter_id', key: 'reporter_id', width: 120 },
  { title: '原因码', dataIndex: 'reason_code', key: 'reason_code', width: 120 },
  { title: '内容', dataIndex: 'text', key: 'text' },
  { title: '状态', dataIndex: 'status', key: 'status', width: 120 },
  { title: '操作', key: 'action', width: 160 }
];

const pagination = ref({ current: page.value, pageSize: pageSize.value, total: total.value, showTotal: (t:number)=>`共 ${t} 条` });

const loadData = async (p?: number) => {
  if (p) page.value = p;
  try {
    const params: any = { page: page.value, pageSize: pageSize.value };
    if (targetType.value !== 'all') params.target_type = targetType.value;
    if (status.value !== 'all') params.status = status.value;
    const { data } = await fetchReports(params);
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

const resolve = async (id:number, decision:'approved'|'rejected') => {
  try {
    const { data } = await resolveReport(id, decision);
    if (data?.success) {
      message.success('处理成功');
      loadData();
    } else {
      message.error(data?.message || '处理失败');
    }
  } catch (e:any) {
    message.error(e?.response?.data?.message || e?.message || '处理异常');
  }
};

const onTableChange = (pg:any) => {
  page.value = pg.current;
  pageSize.value = pg.pageSize;
  loadData();
};

onMounted(() => loadData(1));

const doDeleteComment = async (commentId:number) => {
  Modal.confirm({
    title: '确认删除该评论？该操作不可恢复！',
    async onOk() {
      try {
        const { data } = await deleteComment(commentId);
        if (data?.success && (data?.data?.deleted ?? true)) {
          message.success('删除成功');
          // 删除后刷新列表，避免报告项仍显示
          await loadData(page.value);
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
