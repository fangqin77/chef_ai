<script>
export default {
  data() {
    return {
      // 推荐清单模板
      recommendLists: [
        {
          id: 1,
          name: '3天西安吃面路线',
          type: '面食寻味',
          items: [
            'Day1: biángbiáng面 → 碑林博物馆',
            'Day2: 油泼面 → 回民街小吃',
            'Day3: 岐山臊子面 → 城墙骑行'
          ]
        },
        {
          id: 2,
          name: '宝鸡面食一日游',
          type: '面食寻味',
          items: [
            '上午: 岐山臊子面（老字号）',
            '中午: 擀面皮配凉菜',
            '下午: 法门寺参观',
            '晚上: 扶风鹿糕馍'
          ]
        },
        {
          id: 3,
          name: '西安非遗一日打卡',
          type: '非遗体验',
          items: [
            '上午10:00: 皮影戏表演（提前预约）',
            '下午2:00: 剪纸体验课',
            '晚上7:00: 秦腔演出（易俗社）'
          ]
        },
        {
          id: 4,
          name: '春季槐花麦饭',
          type: '季节限定',
          items: [
            '寻找槐花盛开的农家',
            '体验槐花麦饭制作',
            '品尝农家野菜',
            '周边山林踏春'
          ]
        },
        {
          id: 5,
          name: '秋季柿子之旅',
          type: '季节限定',
          items: [
            '富平柿子园采摘',
            '柿饼制作体验',
            '品尝柿子相关美食',
            '购买柿饼伴手礼'
          ]
        },
        {
          id: 6,
          name: '非遗手工体验',
          type: '非遗体验',
          items: [
            '凤翔泥塑工作坊',
            '学习制作泥塑',
            '参观非遗展览馆',
            '购买泥塑作品'
          ]
        }
      ],
      // 我的清单列表
      myChecklists: [
        {
          id: 'my1',
          name: '我的游行清单',
          date: '2025-11-27',
          category: 'food',
          items: [
            { id: 'item1', content: '去老孙家吃羊肉泡馍', checked: false, note: '要加双份臊子' },
            { id: 'item2', content: '碑林博物馆参观', checked: true, note: '' },
            { id: 'item3', content: '买凤翔泥塑作伴手礼', checked: false, note: '' }
          ]
        }
      ],
      // 类别与索引
      categories: [
        { key: 'food', label: '我的美食清单' },
        { key: 'heritage', label: '我的非遗清单' },
        { key: 'season', label: '我的季节清单' }
      ],
      currentCategory: 'food',
      categoryIndexMap: { food: 0, heritage: 0, season: 0 },
      // 日期弹窗
      showDateDialog: false,
      dateTemp: '',
      selectedDate: new Date().toISOString().split('T')[0],
      // 当前显示的清单索引（兼容旧字段，不再直接使用）
      currentListIndex: 0,
      // 底部图标
      bottomIcons: [
        { id: 'qingdan', label: '陕游记', img: '/static/assets/retouch_2025112414391093.png' },
        { id: 'fengwei', label: '陕味集', img: '/static/assets/retouch_2025112414392946.png' },
        { id: 'feiyi', label: '陕非遗', img: '/static/assets/retouch_2025112414400271.png' },
        { id: 'profile', label: '个人中心', img: '/static/assets/retouch_2025112414394823.png' }
      ],
      // 弹窗控制
      showAddDialog: false,
      showTemplateDialog: false,
      showCreateListDialog: false,
      showRecommendDetail: false,
      selectedRecommend: null,
      newItemContent: '',
      newItemNote: '',
      newListName: '',
      // 重命名弹窗与上下文
      showRenameDialog: false,
      renameTemp: '',
      targetRenameList: null,
      // 添加项/日期上下文
      activeListForAdd: null,
      activeDateList: null
    }
  },
  computed: {
    filteredLists() {
      return this.myChecklists.filter(l => l.category === this.currentCategory)
    },
    // 当前选中日期的清单
    displayedLists() {
      return this.filteredLists.filter(l => l.date === this.selectedDate)
    },
    // 按日期分组，当前分类内
    groupedListsByDate() {
      const groups = {}
      this.filteredLists.forEach(l => {
        const d = l.date || '未设置日期'
        if (!groups[d]) groups[d] = []
        groups[d].push(l)
      })
      // 日期倒序（未设置日期放最后）
      const sortedDates = Object.keys(groups).sort((a, b) => {
        if (a === '未设置日期') return 1
        if (b === '未设置日期') return -1
        return a > b ? -1 : (a < b ? 1 : 0)
      })
      return sortedDates.map(d => ({
        date: d,
        lists: groups[d]
      }))
    },
    currentList() {
      const idx = this.categoryIndexMap[this.currentCategory] || 0
      return this.filteredLists[idx] || null
    },
    categoryLabel() {
      const map = { food: '我的美食清单', heritage: '我的非遗清单', season: '我的季节清单' }
      return map[this.currentCategory] || ''
    }
  },
  methods: {
    // 查看推荐清单详情
    viewRecommendDetail(list) {
      this.selectedRecommend = list
      this.showRecommendDetail = true
    },
    
    // 关闭推荐清单详情
    closeRecommendDetail() {
      this.showRecommendDetail = false
      this.selectedRecommend = null
    },
    
    // 从详情页导入清单
    importFromDetail() {
      if (!this.selectedRecommend) return
      
      const newList = {
        id: 'my' + Date.now(),
        name: this.selectedRecommend.name,
        date: this.selectedDate,
        category: this.currentCategory,
        items: this.selectedRecommend.items.map((item, index) => ({
          id: 'item' + Date.now() + index,
          content: item,
          checked: false,
          note: ''
        }))
      }
      this.myChecklists.push(newList)
      this.categoryIndexMap[this.currentCategory] = this.filteredLists.length // 新增在末尾
      this.closeRecommendDetail()
      uni.showToast({ title: '导入成功', icon: 'success' })
    },
    
    // 切换清单（当前类别内循环）
    switchList() {
      const lists = this.filteredLists
      if (lists.length === 0) {
        uni.showToast({ title: '该类别暂无清单', icon: 'none' })
        return
      }
      const cur = this.categoryIndexMap[this.currentCategory] || 0
      this.categoryIndexMap[this.currentCategory] = (cur + 1) % lists.length
    },
    
    // 切换完成状态
    toggleCheck(item, list) {
      item.checked = !item.checked
      if (item.checked) {
        uni.showToast({ title: '已完成', icon: 'success' })
      }
    },
    
    // 删除清单项
    deleteItem(item, list) {
      if (!list) return
      uni.showModal({
        title: '提示',
        content: '确定删除这个清单项吗？',
        success: (res) => {
          if (res.confirm) {
            const index = list.items.findIndex(i => i.id === item.id)
            if (index > -1) {
              list.items.splice(index, 1)
              uni.showToast({ title: '已删除', icon: 'success' })
            }
          }
        }
      })
    },
    
    // 显示添加清单项弹窗
    showAddItem(list) {
      this.activeListForAdd = list || this.currentList || null
      if (!this.activeListForAdd) {
        uni.showToast({ title: '请先创建清单', icon: 'none' })
        return
      }
      this.newItemContent = ''
      this.newItemNote = ''
      this.showAddDialog = true
    },
    
    // 添加清单项
    addItem() {
      if (!this.newItemContent.trim()) {
        uni.showToast({ title: '请输入内容', icon: 'none' })
        return
      }
      const target = this.activeListForAdd
      if (!target) {
        uni.showToast({ title: '请先选择清单', icon: 'none' })
        return
      }
      const newItem = {
        id: 'item' + Date.now(),
        content: this.newItemContent.trim(),
        checked: false,
        note: this.newItemNote.trim()
      }
      target.items.push(newItem)
      this.showAddDialog = false
      this.activeListForAdd = null
      uni.showToast({ title: '添加成功', icon: 'success' })
    },
    
    // 导出清单
    exportList() {
      if (!this.currentList) {
        uni.showToast({ title: '暂无清单', icon: 'none' })
        return
      }
      
      let text = `【${this.currentList.name}】\n日期：${this.currentList.date}\n\n`
      this.currentList.items.forEach((item, index) => {
        const status = item.checked ? '☑' : '☐'
        text += `${index + 1}. ${status} ${item.content}\n`
        if (item.note) {
          text += `   备注：${item.note}\n`
        }
      })
      
      // 将文本复制到剪贴板
      uni.setClipboardData({
        data: text,
        success: () => {
          uni.showToast({ title: '已复制到剪贴板', icon: 'success' })
        }
      })
    },
    
    // 显示清单模板选择
    showTemplates() {
      this.showTemplateDialog = true
    },

    // 切换类别
    switchCategory(key) {
      if (this.currentCategory === key) return
      this.currentCategory = key
      if (!this.filteredLists.length) {
        this.categoryIndexMap[key] = 0
      } else {
        this.categoryIndexMap[key] = this.categoryIndexMap[key] || 0
      }
    },

    // 打开日期选择（全局）
    openDateDialog() {
      this.dateTemp = this.selectedDate
      this.showDateDialog = true
    },

    // 日期变更
    onDateChange(e) {
      this.dateTemp = e.detail.value
    },

    // 确认日期（全局）
    confirmDate() {
      if (this.dateTemp) {
        this.selectedDate = this.dateTemp
        uni.showToast({ title: '已切换日期', icon: 'success' })
      }
      this.showDateDialog = false
    },
    
    // 重命名清单
    renameList(list) {
      this.targetRenameList = list
      this.renameTemp = (list && list.name) || ''
      this.showRenameDialog = true
    },
    
    confirmRename() {
      if (!this.targetRenameList) {
        this.showRenameDialog = false
        return
      }
      const name = (this.renameTemp || '').trim()
      if (!name) {
        uni.showToast({ title: '名称不能为空', icon: 'none' })
        return
      }
      this.targetRenameList.name = name
      this.showRenameDialog = false
      this.targetRenameList = null
      uni.showToast({ title: '已重命名', icon: 'success' })
    },

    // 从本地文件导入
    importFromLocal() {
      const self = this
      if (typeof window !== 'undefined' && uni.chooseFile) {
        uni.chooseFile({
          count: 1,
          type: 'all',
          success(res) {
            const file = res.tempFiles && res.tempFiles[0]
            if (!file) {
              uni.showToast({ title: '未选择文件', icon: 'none' })
              return
            }
            if (typeof FileReader !== 'undefined') {
              const reader = new FileReader()
              reader.onload = function(evt) {
                const text = evt.target.result
                self._handleImportedContent(text)
              }
              reader.onerror = function() {
                uni.showToast({ title: '读取失败', icon: 'none' })
              }
              reader.readAsText(file, 'utf-8')
            } else {
              uni.showToast({ title: '当前环境不支持读取文件', icon: 'none' })
            }
          },
          fail() {
            uni.showToast({ title: '选择失败', icon: 'none' })
          }
        })
      } else {
        uni.showToast({ title: '当前端暂不支持本地导入', icon: 'none' })
      }
    },

    // 处理导入文本/JSON
    _handleImportedContent(text) {
      try {
        const data = JSON.parse(text)
        const lists = Array.isArray(data) ? data : (data.lists || [data])
        lists.forEach(raw => {
          const name = raw.name || '导入清单'
          const date = raw.date || this.selectedDate
          const itemsArr = raw.items || []
          const newList = {
            id: 'my' + Date.now() + Math.random().toString(16).slice(2,6),
            name,
            date,
            category: this.currentCategory,
            items: itemsArr.map((it, idx) => {
              if (typeof it === 'string') {
                return { id: 'item' + Date.now() + idx, content: it, checked: false, note: '' }
              }
              return {
                id: 'item' + Date.now() + idx,
                content: it.content || it.text || '',
                checked: !!it.checked,
                note: it.note || ''
              }
            })
          }
          this.myChecklists.push(newList)
          this.categoryIndexMap[this.currentCategory] = this.filteredLists.length - 1
        })
        uni.showToast({ title: '导入成功', icon: 'success' })
      } catch (e) {
        const lines = (text || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean)
        if (!lines.length) {
          uni.showToast({ title: '文件为空', icon: 'none' })
          return
        }
        const name = lines[0]
        const items = lines.slice(1)
        const newList = {
          id: 'my' + Date.now(),
          name: name || '导入清单',
          date: this.selectedDate,
          category: this.currentCategory,
          items: items.map((s, idx) => ({ id: 'item' + Date.now() + idx, content: s, checked: false, note: '' }))
        }
        this.myChecklists.push(newList)
        this.categoryIndexMap[this.currentCategory] = this.filteredLists.length - 1
        uni.showToast({ title: '导入成功', icon: 'success' })
      }
    },
    
    // 导入模板
    importTemplate(template) {
      const newList = {
        id: 'my' + Date.now(),
        name: template.name,
        date: this.selectedDate,
        category: this.currentCategory,
        items: template.items.map((item, index) => ({
          id: 'item' + Date.now() + index,
          content: item,
          checked: false,
          note: ''
        }))
      }
      this.myChecklists.push(newList)
      this.categoryIndexMap[this.currentCategory] = this.filteredLists.length // 指向新导入
      this.showTemplateDialog = false
      uni.showToast({ title: '导入成功', icon: 'success' })
    },
    
    // 显示创建清单弹窗
    showCreateList() {
      this.newListName = ''
      this.showCreateListDialog = true
    },
    
    // 创建新清单
    createNewList() {
      if (!this.newListName.trim()) {
        uni.showToast({ title: '请输入清单名称', icon: 'none' })
        return
      }
      
      const newList = {
        id: 'my' + Date.now(),
        name: this.newListName.trim(),
        date: this.selectedDate,
        category: this.currentCategory,
        items: []
      }
      
      this.myChecklists.push(newList)
      this.categoryIndexMap[this.currentCategory] = this.filteredLists.length
      this.showCreateListDialog = false
      uni.showToast({ title: '创建成功', icon: 'success' })
    },
    
    // 页面跳转
    goPage(id) {
      const routes = {
        tong: '/pages/index/index',
        fengwei: '/pages/flavor/index',
        qingdan: '/pages/checklist/index',
        profile: '/pages/mine/index',
        feiyi: '/pages/heritage/index'
      }
      const url = routes[id]
      if (!url) {
        uni.showToast({ title: '页面开发中', icon: 'none' })
        return
      }
      
      // 如果是当前页，不跳转
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      if (currentPage && ('/' + currentPage.route) === url) {
        return
      }
      
      if (url === '/pages/index/index') {
        uni.reLaunch({ url })
      } else {
        uni.navigateTo({ url })
      }
    }
  }
}
</script>

<template>
  <page-meta page-style="overflow:auto;min-height:100vh" />
  <view class="checklist-page">
    
    <!-- 左侧推荐清单 -->
    <view class="left-section">
      <view class="recommend-title">推荐清单</view>
      <scroll-view class="recommend-scroll" scroll-y>
        <view 
          v-for="list in recommendLists" 
          :key="list.id" 
          class="recommend-card"
          @tap="viewRecommendDetail(list)"
        >
          <view class="recommend-type">{{ list.type }}</view>
          <view class="recommend-name">{{ list.name }}</view>
        </view>
      </scroll-view>
      
      <!-- 左下角功能按钮 -->
      <view class="left-bottom-actions">
        <view class="left-action-btn" @tap="exportList">
          <text class="left-action-text">导出清单</text>
        </view>
        <view class="left-action-btn" @tap="importFromLocal">
          <text class="left-action-text">一键导入</text>
        </view>
      </view>
    </view>
    
    <!-- 右侧我的清单：按所选日期显示所有清单 -->
    <view class="right-section">
      <view class="my-list">
        <!-- 顶部：全局日期切换与统计 -->
        <view class="list-header">
          <view class="header-top-row">
            <view class="switch-btn" @tap="openDateDialog">
              <text class="switch-icon">📅</text>
            </view>
          </view>
          <view class="list-info">
            <text class="list-name">{{ selectedDate }}</text>
            <text class="list-date">共 {{ displayedLists.length }} 个清单</text>
          </view>
        </view>

        <scroll-view class="list-content" scroll-y>
          <view v-if="displayedLists.length === 0" class="empty-list" style="padding-top:40rpx;">
            <text class="empty-text">该日期暂无清单</text>
            <text class="empty-hint">可创建新清单或从左侧导入</text>
            <view class="create-list-btn" @tap="showCreateList">
              <text class="create-text">+ 创建新清单</text>
            </view>
          </view>

          <view v-for="list in displayedLists" :key="list.id" style="margin-bottom: 20rpx;">
            <view class="list-header" style="margin-bottom: 12rpx;">
              <view class="list-info">
                <text class="list-name" @tap="renameList(list)">{{ list.name }}</text>
                <text v-if="list.date" class="list-date">{{ list.date }}</text>
              </view>
            </view>

            <view>
              <view 
                v-for="item in list.items" 
                :key="item.id" 
                class="list-item"
                @longpress="deleteItem(item, list)"
              >
                <view class="checkbox" :class="{ checked: item.checked }" @tap.stop="toggleCheck(item, list)">
                  <text v-if="item.checked" class="check-mark">✓</text>
                </view>
                <view class="item-content">
                  <text class="item-text" :class="{ 'item-checked': item.checked }">{{ item.content }}</text>
                  <text v-if="item.note" class="item-note">备注：{{ item.note }}</text>
                </view>
              </view>

              <view v-if="list.items.length === 0" class="empty-tip">
                暂无清单项，点击下方添加
              </view>
              <view v-if="list.items.length > 0" class="tip-text">长按清单项可删除</view>

              <!-- 模块内添加按钮 -->
              <view style="margin:12rpx 0;">
                <view class="left-action-btn" @tap="showAddItem(list)">
                  <text class="left-action-text">+ 添加清单项</text>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    
    <!-- 添加清单项弹窗 -->
    <view v-if="showAddDialog" class="dialog-mask" @tap="showAddDialog = false">
      <view class="dialog-content" @tap.stop>
        <view class="dialog-title">添加清单项</view>
        <input 
          class="dialog-input" 
          v-model="newItemContent" 
          placeholder="请输入内容"
          placeholder-style="color: #999"
        />
        <input 
          class="dialog-input" 
          v-model="newItemNote" 
          placeholder="备注（可选）"
          placeholder-style="color: #999"
        />
        <view class="dialog-actions">
          <view class="dialog-btn cancel" @tap="showAddDialog = false">取消</view>
          <view class="dialog-btn confirm" @tap="addItem">确定</view>
        </view>
      </view>
    </view>
    
    <!-- 模板选择弹窗 -->
    <view v-if="showTemplateDialog" class="dialog-mask" @tap="showTemplateDialog = false">
      <view class="template-content" @tap.stop>
        <view class="dialog-title">选择清单模板</view>
        <scroll-view class="template-list" scroll-y>
          <view 
            v-for="template in recommendLists" 
            :key="template.id"
            class="template-item"
            @tap="importTemplate(template)"
          >
            <view class="template-type">{{ template.type }}</view>
            <view class="template-name">{{ template.name }}</view>
            <view class="template-preview">
              <text v-for="(item, idx) in template.items.slice(0, 2)" :key="idx" class="preview-text">
                • {{ item }}
              </text>
              <text v-if="template.items.length > 2" class="preview-more">...</text>
            </view>
          </view>
        </scroll-view>
        <view class="dialog-actions">
          <view class="dialog-btn cancel" @tap="showTemplateDialog = false">关闭</view>
        </view>
      </view>
    </view>
    
    <!-- 创建清单弹窗 -->
    <view v-if="showCreateListDialog" class="dialog-mask" @tap="showCreateListDialog = false">
      <view class="dialog-content" @tap.stop>
        <view class="dialog-title">创建新清单</view>
        <input 
          class="dialog-input" 
          v-model="newListName" 
          placeholder="请输入清单名称"
          placeholder-style="color: #999"
          maxlength="20"
        />
        <view class="dialog-actions">
          <view class="dialog-btn cancel" @tap="showCreateListDialog = false">取消</view>
          <view class="dialog-btn confirm" @tap="createNewList">确定</view>
        </view>
      </view>
    </view>
    
    <!-- 日期选择弹窗 -->
    <view v-if="showDateDialog" class="dialog-mask" @tap="showDateDialog = false">
      <view class="dialog-content" @tap.stop>
        <view class="dialog-title">选择清单日期</view>
        <picker mode="date" :value="dateTemp" start="2000-01-01" end="2100-12-31" @change="onDateChange">
          <view class="dialog-input" style="display:flex;align-items:center;justify-content:space-between;">
            <text>{{ dateTemp || '请选择日期' }}</text>
            <text style="color:#8c5c2a;font-size:24rpx">更改</text>
          </view>
        </picker>
        <view class="dialog-actions">
          <view class="dialog-btn cancel" @tap="showDateDialog = false">取消</view>
          <view class="dialog-btn confirm" @tap="confirmDate">确定</view>
        </view>
      </view>
    </view>

    <!-- 重命名清单弹窗 -->
    <view v-if="showRenameDialog" class="dialog-mask" @tap="showRenameDialog = false">
      <view class="dialog-content" @tap.stop>
        <view class="dialog-title">重命名清单</view>
        <input 
          class="dialog-input" 
          v-model="renameTemp" 
          placeholder="请输入新的清单名称"
          placeholder-style="color: #999"
          maxlength="20"
        />
        <view class="dialog-actions">
          <view class="dialog-btn cancel" @tap="showRenameDialog = false">取消</view>
          <view class="dialog-btn confirm" @tap="confirmRename">确定</view>
        </view>
      </view>
    </view>

    <!-- 推荐清单详情弹窗 -->
    <view v-if="showRecommendDetail && selectedRecommend" class="dialog-mask" @tap="closeRecommendDetail">
      <view class="recommend-detail-content" @tap.stop>
        <view class="detail-header">
          <view class="detail-type">{{ selectedRecommend.type }}</view>
          <text class="detail-close" @tap="closeRecommendDetail">×</text>
        </view>
        <view class="detail-title">{{ selectedRecommend.name }}</view>
        <scroll-view class="detail-list" scroll-y>
          <view class="detail-item" v-for="(item, idx) in selectedRecommend.items" :key="idx">
            <view class="detail-index">{{ idx + 1 }}</view>
            <text class="detail-text">{{ item }}</text>
          </view>
        </scroll-view>
        <view class="detail-actions">
          <view class="detail-btn cancel" @tap="closeRecommendDetail">关闭</view>
          <view class="detail-btn confirm" @tap="importFromDetail">导入到我的清单</view>
        </view>
      </view>
    </view>
    
    <!-- 固定底部图标 -->
    <view class="icons-fixed">
      <image class="chopsticks-fixed" src="/static/assets/retouch_2025111915301620.png" mode="widthFix" />
      <view class="icons-top">
        <view class="icon-block" @tap="goPage('tong')">
          <view class="top-circle-wrap">
            <image class="icon-img" src="/static/assets/retouch_2025112414375907.png" mode="widthFix" />
          </view>
          <text class="icon-label">陕面通</text>
        </view>
      </view>
      <view class="icons-bottom">
        <view v-for="icon in bottomIcons" :key="icon.id" class="icon-block" @tap="goPage(icon.id)">
          <image class="icon-img" :src="icon.img" mode="widthFix" />
          <text class="icon-label">{{ icon.label }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.checklist-page {
  min-height: 100vh;
  padding: 20rpx 28rpx 20rpx;
  padding-bottom: calc(260rpx + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, #fffaf1 0%, #fff5dc 100%);
  color: #5a2c12;
  font-family: 'LXGW WenKai Screen', 'PingFang SC', system-ui;
  position: relative;
  display: flex;
  gap: 20rpx;
}

/* 左侧推荐清单区域 */
.left-section {
  width: 220rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  position: relative;
  max-height: calc(100vh - 40rpx - 280rpx);
}

.recommend-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #5a2c12;
  text-align: center;
  padding: 12rpx;
  background: #ffe6a8;
  border-radius: 12rpx;
  flex-shrink: 0;
}

.recommend-scroll {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 16rpx;
}

.recommend-card {
  background: #fff5e6;
  border-radius: 16rpx;
  padding: 20rpx 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  border: 3rpx solid #e8d4b8;
  min-height: 140rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin-bottom: 16rpx;
}

.recommend-type {
  font-size: 22rpx;
  color: #ff6b6b;
  font-weight: 700;
  margin-bottom: 8rpx;
}

.recommend-name {
  font-size: 26rpx;
  color: #5a2c12;
  font-weight: 600;
  line-height: 1.4;
}

/* 左下角功能按钮 */
.left-bottom-actions {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  margin-top: 20rpx;
  flex-shrink: 0;
}

.left-action-btn {
  background: #ffe6a8;
  padding: 12rpx 16rpx;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
  border: 2rpx solid #e3b34b;
  text-align: center;
}

.left-action-text {
  font-size: 24rpx;
  color: #5a2c12;
  font-weight: 600;
}

/* 右侧我的清单区域 */
.right-section {
  flex: 1;
  background: #fff5e6;
  border-radius: 24rpx;
  padding: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  border: 4rpx solid #e8d4b8;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 90rpx - 280rpx);
  min-height: 600rpx;
}

.my-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20rpx;
  padding-bottom: 16rpx;
  border-bottom: 3rpx dashed #cfa86a;
}

.list-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.list-name {
  font-size: 32rpx;
  font-weight: 700;
  color: #5a2c12;
  display: block;
}

.list-date {
  font-size: 22rpx;
  color: #8c5c2a;
  display: block;
}

.header-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
}

.switch-btn {
  width: 60rpx;
  height: 60rpx;
  background: #ffcc33;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.15);
  border: 2rpx solid #e3b34b;
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  z-index: 5;
}

.switch-icon {
  font-size: 32rpx;
  line-height: 1;
}

.list-content {
  flex: 1;
  overflow-y: auto;
}

.list-item {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
  padding: 16rpx;
  margin-bottom: 12rpx;
  background: #ffffff;
  border-radius: 12rpx;
  border: 2rpx solid #e8d4b8;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
}

.checkbox {
  width: 40rpx;
  height: 40rpx;
  border: 3rpx solid #cfa86a;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #ffffff;
}

.checkbox.checked {
  background: #ffcc33;
  border-color: #ffcc33;
}

.check-mark {
  color: #5a2c12;
  font-size: 28rpx;
  font-weight: 700;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.item-text {
  font-size: 28rpx;
  color: #5a2c12;
  line-height: 1.5;
}

.item-text.item-checked {
  text-decoration: line-through;
  opacity: 0.5;
  color: #999;
}

.item-note {
  font-size: 22rpx;
  color: #8c5c2a;
  line-height: 1.4;
}

.empty-tip {
  text-align: center;
  padding: 80rpx 20rpx;
  font-size: 26rpx;
  color: #999;
}

.tip-text {
  text-align: center;
  padding: 20rpx;
  font-size: 22rpx;
  color: #999;
  opacity: 0.8;
}

.empty-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
}

.empty-text {
  font-size: 32rpx;
  color: #5a2c12;
  font-weight: 700;
}

.empty-hint {
  font-size: 24rpx;
  color: #8c5c2a;
  text-align: center;
  line-height: 1.6;
}

.create-list-btn {
  margin-top: 32rpx;
  background: #ffcc33;
  padding: 16rpx 40rpx;
  border-radius: 999px;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.15);
  border: 2rpx solid #e3b34b;
}

.create-text {
  font-size: 28rpx;
  color: #5a2c12;
  font-weight: 600;
}

/* 弹窗样式 */
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.dialog-content {
  width: 600rpx;
  background: #fff5dc;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.3);
}

.template-content {
  width: 640rpx;
  max-height: 80vh;
  background: #fff5dc;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.dialog-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #5a2c12;
  text-align: center;
  margin-bottom: 24rpx;
}

.dialog-input {
  width: 100%;
  height: 80rpx;
  background: #ffffff;
  border-radius: 12rpx;
  padding: 0 20rpx;
  margin-bottom: 16rpx;
  border: 2rpx solid #cfa86a;
  font-size: 28rpx;
}

.dialog-actions {
  display: flex;
  gap: 16rpx;
  margin-top: 24rpx;
}

.dialog-btn {
  flex: 1;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12rpx;
  font-size: 28rpx;
  font-weight: 600;
}

.dialog-btn.cancel {
  background: #e0d5c7;
  color: #5a2c12;
}

.dialog-btn.confirm {
  background: #ffcc33;
  color: #5a2c12;
}

/* 模板列表 */
.template-list {
  flex: 1;
  max-height: 600rpx;
}

.template-item {
  background: #fff5e6;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 16rpx;
  border: 3rpx solid #e8d4b8;
}

.template-type {
  font-size: 22rpx;
  color: #ff6b6b;
  font-weight: 700;
  margin-bottom: 8rpx;
}

.template-name {
  font-size: 28rpx;
  color: #5a2c12;
  font-weight: 600;
  margin-bottom: 12rpx;
}

.template-preview {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.preview-text {
  font-size: 24rpx;
  color: #8c5c2a;
  line-height: 1.4;
}

.preview-more {
  font-size: 24rpx;
  color: #8c5c2a;
}

/* 推荐清单详情弹窗 */
.recommend-detail-content {
  width: 640rpx;
  max-height: 80vh;
  background: #fff5dc;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.detail-type {
  font-size: 24rpx;
  color: #ff6b6b;
  font-weight: 700;
  background: #ffe6a8;
  padding: 6rpx 16rpx;
  border-radius: 999px;
}

.detail-close {
  font-size: 48rpx;
  line-height: 1;
  color: #5a2c12;
  font-weight: 400;
}

.detail-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #5a2c12;
  margin-bottom: 24rpx;
  text-align: center;
}

.detail-list {
  flex: 1;
  max-height: 500rpx;
  margin-bottom: 24rpx;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
  padding: 16rpx;
  margin-bottom: 12rpx;
  background: #ffffff;
  border-radius: 12rpx;
  border: 2rpx solid #e8d4b8;
}

.detail-index {
  width: 40rpx;
  height: 40rpx;
  background: #ffcc33;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: 700;
  color: #5a2c12;
  flex-shrink: 0;
}

.detail-text {
  flex: 1;
  font-size: 28rpx;
  color: #5a2c12;
  line-height: 1.6;
  padding-top: 8rpx;
}

.detail-actions {
  display: flex;
  gap: 16rpx;
}

.detail-btn {
  flex: 1;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12rpx;
  font-size: 28rpx;
  font-weight: 600;
}

.detail-btn.cancel {
  background: #e0d5c7;
  color: #5a2c12;
}

.detail-btn.confirm {
  background: #ffcc33;
  color: #5a2c12;
}

/* 筷子分割线 */
.chopsticks-fixed {
  position: absolute;
  left: 12rpx;
  right: 12rpx;
  top: 60rpx;
  width: calc(100% - 24rpx);
  height: auto;
  display: block;
  z-index: 19;
  border-radius: 0;
}

/* 底部图标布局 */
.icons-top {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -20rpx 0 20rpx;
  padding-top: 0;
  z-index: -1;
}

.icons-top .icon-block {
  transform: translateY(75rpx);
  will-change: transform;
}

.icons-top::before {
  content: none;
}

.icons-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 35rpx;
  padding: 0 10rpx;
  background: transparent;
  margin-top: -12rpx;
}

.icons-bottom .icon-block:nth-child(2) {
  margin-right: 24rpx;
}

.icons-bottom .icon-block:nth-child(3) {
  margin-left: 24rpx;
}

.icon-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32%;
}

.icon-img {
  width: 58rpx;
  height: auto;
  display: block;
}

.icons-top .icon-img {
  width: 68rpx;
}

.icon-label {
  margin-top: 10rpx;
  font-size: 26rpx;
  color: #5a2c12;
  text-align: center;
}

.top-circle-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 50%;
  padding: 18rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
  border: 0;
  position: relative;
  z-index: -2;
}

.icons-fixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 60rpx;
  padding: 60rpx 20rpx 16rpx;
  background: transparent;
  z-index: 20;
}

.icons-fixed::before {
  content: '';
  position: absolute;
  left: 12rpx;
  right: 12rpx;
  bottom: -5rpx;
  top: 158rpx;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 28rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  z-index: -1;
}
</style>