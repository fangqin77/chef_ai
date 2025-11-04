<template>
  <div style="padding:16px">
    <div style="display:flex;gap:8px;margin-bottom:12px">
      <a-input v-model:value="keyword" placeholder="支持菜名/分类/食材/调料/做法搜索" style="width:240px" @pressEnter="loadData(1)" />
      <a-button type="primary" @click="loadData(1)">查询</a-button>
      <a-button @click="openEdit()">新增菜谱</a-button>
    </div>

    <a-table :data-source="list" :columns="columns" :pagination="pagination" row-key="id" @change="onTableChange" bordered size="small" :scroll="{ x: 1000 }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='type_id'">
          <!-- 分类可能为多选：后端返回已合并的 category_name（例如“汤类、川菜”） -->
          <span>{{ record.category_name || categoryLabel(record.id) || categoryLabel(record.type_id) }}</span>
        </template>
        <template v-else-if="column.key==='image'">
          <a-image :src="record.feature" :width="64" :height="40" :preview="{ src: record.feature }" fallback="https://via.placeholder.com/64x40?text=img" />
        </template>
        <template v-else-if="column.key==='actions'">
          <a-space>
            <a-button size="small" @click="openEdit(record)">编辑</a-button>
            <a-popconfirm title="确认删除该菜谱？" @confirm="remove(record.id)">
              <a-button size="small" danger>删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal v-model:open="editOpen" :title="editForm.id ? '编辑菜谱' : '新增菜谱'" @ok="save" width="820px">
      <a-form :model="editForm" layout="vertical">
        <a-row :gutter="12">
          <a-col :span="12">
            <a-form-item label="菜名 (name)">
              <a-input v-model:value="editForm.name" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="分类（可多选）">
              <a-select v-model:value="editForm.categoryIds" :options="categoryOptions" placeholder="选择分类" mode="multiple" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="图片 (feature: URL)">
              <a-input v-model:value="editForm.feature" placeholder="粘贴图片URL" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="图片预览">
              <a-image :src="editForm.feature" :width="160" :height="100" fallback="https://via.placeholder.com/160x100?text=img" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="食材 (ingredients)">
              <a-textarea v-model:value="editForm.ingredients" :rows="3" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="调料 (condiments)">
              <a-textarea v-model:value="editForm.condiments" :rows="3" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="做法 (method)">
              <a-textarea v-model:value="editForm.method" :rows="6" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { fetchRecipes, createRecipe, updateRecipe, deleteRecipe, fetchRecipeCategories } from '../services/adminApi';

const list = ref<any[]>([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(10);
const keyword = ref('');

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '菜名', dataIndex: 'name', key: 'name', width: 200 },
  { title: '分类', dataIndex: 'type_id', key: 'type_id', width: 120 },
  { title: '图片', dataIndex: 'feature', key: 'image', width: 120 },
  { title: '操作', key: 'actions', width: 180 }
];

const pagination = ref({ current: page.value, pageSize: pageSize.value, total: total.value, showTotal: (t:number)=>`共 ${t} 条` });
function onTableChange(pag: any) {
  page.value = pag.current;
  pageSize.value = pag.pageSize;
  loadData();
}

const editOpen = ref(false);
const editForm = reactive<any>({ id: null, name: '', categoryIds: [], typeId: undefined, feature: '', ingredients: '', condiments: '', method: '' });
const categoryOptions = ref<any[]>([]);
const categoryMap = ref<Record<string, string>>({});
function categoryLabel(id?: any) {
  if (id === undefined || id === null) return '';
  const key = String(id);
  return categoryMap.value[key] ?? key;
}

function openEdit(row?: any) {
  if (row) {
    const ids = (row.category_ids ? String(row.category_ids).split(',').map((s:string)=> Number(s)).filter((n:number)=> !isNaN(n)) : []);
    Object.assign(editForm, { id: row.id, name: row.name, categoryIds: ids, typeId: row.type_id ?? row.typeId, feature: row.feature, ingredients: row.ingredients, condiments: row.condiments, method: row.method });
  }
  else Object.assign(editForm, { id: null, name: '', typeId: undefined, feature: '', ingredients: '', condiments: '', method: '' });
  editOpen.value = true;
}

async function save() {
  try {
    if (!editForm.name) return message.warning('请输入菜名');
    if (editForm.id) {
      const payload = { id: editForm.id, name: editForm.name, categoryIds: editForm.categoryIds, feature: editForm.feature, ingredients: editForm.ingredients, condiments: editForm.condiments, method: editForm.method };
      const { data } = await updateRecipe(editForm.id, payload);
      if (!data?.success) throw new Error(data?.message || '更新失败');
      message.success('更新成功');
    } else {
      const payload = { name: editForm.name, categoryIds: editForm.categoryIds, feature: editForm.feature, ingredients: editForm.ingredients, condiments: editForm.condiments, method: editForm.method };
      const { data } = await createRecipe(payload);
      if (!data?.success) throw new Error(data?.message || '新增失败');
      message.success('新增成功');
    }
    editOpen.value = false;
    loadData();
  } catch (e:any) {
    message.error(e?.response?.data?.message || e?.message || '保存异常');
  }
}

async function remove(id:number) {
  try {
    const { data } = await deleteRecipe(id);
    if (!data?.success) throw new Error(data?.message || '删除失败');
    message.success('删除成功');
    loadData();
  } catch (e:any) {
    message.error(e?.response?.data?.message || e?.message || '删除异常');
  }
}

async function loadData(p?: number) {
  if (p) page.value = p;
  try {
    const { data } = await fetchRecipes({ page: page.value, pageSize: pageSize.value, keyword: keyword.value });
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
}

onMounted(async () => { await loadCategories(); await loadData(1); });

async function loadCategories() {
  try {
    const { data } = await fetchRecipeCategories();
    const list = data?.data || data || [];
    categoryOptions.value = list.map((c:any)=>({ label: `${c.category_name || c.typeName || c.categoryName || c.category_id}`, value: (c.category_id ?? c.nodeId ?? c.categoryId) }))
      .filter((opt:any)=> opt.value !== undefined && opt.value !== null);
    // 构建映射表，便于渲染分类名称（统一用字符串 key，避免数字/字符串不一致）
    categoryMap.value = {};
    list.forEach((c:any) => {
      const id = c.category_id ?? c.nodeId ?? c.categoryId;
      if (id === undefined || id === null) return;
      const name = c.category_name || c.typeName || c.categoryName || String(id);
      categoryMap.value[String(id)] = name;
    });
  } catch (e:any) { /* 可忽略 */ }
}
</script>
