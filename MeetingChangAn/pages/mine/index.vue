<template>
  <page-meta page-style="overflow:auto;min-height:100vh" />
  <view class="mine-page">
    
    <!-- 顶部用户信息卡片 -->
    <view class="user-header">
      <!-- 左侧头像 -->
      <view class="avatar-section">
        <image class="avatar" :src="userInfo.avatarUrl || defaultAvatar" mode="aspectFill" />
        <text class="user-intro">{{ userInfo.intro || '探索陕西美食文化' }}</text>
      </view>
      
      <!-- 右侧用户信息 -->
      <view class="info-section">
        <text class="username">{{ userInfo.nickName || '游客' }}</text>
        <text class="user-level">{{ userLevel }}</text>
        <text class="user-stats">打卡 {{ checkInCount }} 次 | 清单 {{ checklistCount }} 个</text>
      </view>
    </view>
    
    <!-- 成就标签 -->
    <view class="achievement-tags">
      <view 
        v-for="tag in achievementTags" 
        :key="tag.id" 
        class="tag-badge"
        :class="{ 'locked': !tag.unlocked }"
      >
        <text class="tag-text">{{ tag.name }}</text>
      </view>
    </view>
    
    <!-- 勋章和工具模块 -->
    <view class="medals-tools-section">
      <!-- 左侧勋章 -->
      <view class="medals-grid">
        <view 
          v-for="medal in medals" 
          :key="medal.id" 
          class="medal-item"
          :class="{ 'locked': !medal.unlocked }"
          @tap="showMedalDetail(medal)"
        >
          <view class="medal-icon">{{ medal.icon }}</view>
          <text class="medal-name">{{ medal.name }}</text>
        </view>
      </view>
      
      <!-- 右侧工具模块（橙色统一模块） -->
      <view class="tools-panel">
        <view class="tools-label">工具</view>
        <view class="tool-item" @tap="openDialectTool">
          <text class="tool-emoji">🗣️</text>
          <text class="tool-name">方言收集器</text>
        </view>
        <view class="tool-item" @tap="openFoodMap">
          <text class="tool-emoji">🗺️</text>
          <text class="tool-name">美食地图</text>
        </view>
      </view>
    </view>
    
    <!-- 我的内容模块 -->
    <view class="my-content-section">
      <!-- 我的清单大全 -->
      <view class="content-card" @tap="goAllChecklists">
        <view class="card-header">
          <text class="card-title">📋 我的清单大全</text>
          <text class="card-arrow">></text>
        </view>
        <view class="card-preview">
          <text class="preview-text">{{ checklistCount }} 个清单 | 最近：{{ latestChecklist }}</text>
        </view>
      </view>
      
      <!-- 我的打卡记录 -->
      <view class="content-card" @tap="goCheckInRecords">
        <view class="card-header">
          <text class="card-title">✓ 美食打卡记录</text>
          <text class="card-arrow">></text>
        </view>
        <view class="card-preview">
          <text class="preview-text">累计打卡 {{ checkInCount }} 次 | 连续 {{ continuousDays }} 天</text>
        </view>
      </view>
      
      <!-- 美食足迹 -->
      <view class="content-card" @tap="goFoodFootprints">
        <view class="card-header">
          <text class="card-title">🍜 美食足迹</text>
          <text class="card-arrow">></text>
        </view>
        <view class="card-preview">
          <text class="preview-text">{{ citiesCount }} 个城市 | {{ visitedCount }} 家美食店</text>
        </view>
      </view>
      
      <!-- 非遗体验记录 -->
      <view class="content-card" @tap="goHeritageRecords">
        <view class="card-header">
          <text class="card-title">🎭 非遗体验记录</text>
          <text class="card-arrow">></text>
        </view>
        <view class="card-preview">
          <text class="preview-text">体验 {{ heritageCount }} 个项目 | 收藏 {{ heritageCollect }} 个</text>
        </view>
      </view>
    </view>
    
    <!-- 设置与信息模块 -->
    <view class="settings-section">
      <view class="setting-item" @tap="goAboutUs">
        <view class="setting-icon">ℹ️</view>
        <text class="setting-title">关于我们</text>
        <text class="setting-arrow">></text>
      </view>
      
      <view class="setting-item" @tap="goFeedback">
        <view class="setting-icon">💬</view>
        <text class="setting-title">用户建议</text>
        <text class="setting-arrow">></text>
      </view>
      
      <view class="setting-item" @tap="goSettings">
        <view class="setting-icon">⚙️</view>
        <text class="setting-title">设置中心</text>
        <text class="setting-arrow">></text>
      </view>
    </view>
    
    <!-- 方言收集器弹窗 -->
    <view v-if="showDialectDialog" class="dialog-mask" @tap="closeDialectDialog">
      <view class="dialect-dialog" @tap.stop>
        <view class="dialog-header">
          <text class="dialog-title">陕西方言收集器</text>
          <text class="dialog-close" @tap="closeDialectDialog">×</text>
        </view>
        
        <scroll-view class="dialect-list" scroll-y>
          <view 
            v-for="dialect in dialectList" 
            :key="dialect.id" 
            class="dialect-item"
            @tap="playDialect(dialect)"
          >
            <view class="dialect-word">{{ dialect.word }}</view>
            <view class="dialect-meaning">{{ dialect.meaning }}</view>
            <view class="dialect-region">{{ dialect.region }}</view>
            <view class="dialect-example">
              <text class="example-label">用法：</text>
              <text class="example-text">{{ dialect.example }}</text>
            </view>
            <view class="play-icon">🔊</view>
          </view>
        </scroll-view>
        
        <view class="dialect-footer">
          <text class="collected-count">已收录 {{ dialectList.length }} 个方言</text>
        </view>
      </view>
    </view>
    
    <!-- 勋章详情弹窗 -->
    <view v-if="showMedalDialog && selectedMedal" class="dialog-mask" @tap="closeMedalDialog">
      <view class="medal-dialog" @tap.stop>
        <view class="medal-detail-icon">{{ selectedMedal.icon }}</view>
        <view class="medal-detail-name">{{ selectedMedal.name }}</view>
        <view class="medal-detail-desc">{{ selectedMedal.description }}</view>
        <view class="medal-progress" v-if="!selectedMedal.unlocked">
          <text class="progress-text">进度：{{ selectedMedal.progress }}/{{ selectedMedal.target }}</text>
          <view class="progress-bar">
            <view class="progress-fill" :style="{ width: (selectedMedal.progress / selectedMedal.target * 100) + '%' }"></view>
          </view>
        </view>
        <view class="medal-unlock-time" v-else>
          <text>🎉 {{ selectedMedal.unlockTime }}</text>
        </view>
        <view class="dialog-btn" @tap="closeMedalDialog">关闭</view>
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
        <view class="icon-block" @tap="goPage('qingdan')">
          <image class="icon-img" src="/static/assets/retouch_2025112414391093.png" mode="widthFix" />
          <text class="icon-label">陕游记</text>
        </view>
        <view class="icon-block" @tap="goPage('fengwei')">
          <image class="icon-img" src="/static/assets/retouch_2025112414392946.png" mode="widthFix" />
          <text class="icon-label">陕味集</text>
        </view>
        <view class="icon-block" @tap="goPage('feiyi')">
          <image class="icon-img" src="/static/assets/retouch_2025112414400271.png" mode="widthFix" />
          <text class="icon-label">陕非遗</text>
        </view>
        <view class="icon-block" @tap="goPage('profile')">
          <image class="icon-img" src="/static/assets/retouch_2025112414394823.png" mode="widthFix" />
          <text class="icon-label">个人中心</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MineIndex',
  data() {
    return {
      isLoggedIn: false,
      userInfo: {},
      defaultAvatar: '/static/assets/retouch_2025112414394823.png',
      
      // 用户统计数据
      checkInCount: 12,
      checklistCount: 5,
      continuousDays: 3,
      visitedCount: 8,
      citiesCount: 3,
      heritageCount: 5,
      heritageCollect: 3,
      userLevel: 'Lv.3 美食探索者',
      latestChecklist: '我的美食清单',
      
      // 成就标签
      achievementTags: [
        { id: 1, name: '面食达人', unlocked: true },
        { id: 2, name: '打卡先锋', unlocked: true },
        { id: 3, name: '方言通', unlocked: false }
      ],
      
      // 勋章系统
      medals: [
        { 
          id: 1, 
          name: '初心', 
          icon: '🌟',
          unlocked: true,
          description: '完成首次打卡',
          unlockTime: '2025-11-20 解锁'
        },
        { 
          id: 2, 
          name: '探索者', 
          icon: '🧭',
          unlocked: true,
          description: '打卡3个不同城市',
          unlockTime: '2025-11-25 解锁'
        },
        { 
          id: 3, 
          name: '美食家', 
          icon: '🍜',
          unlocked: false,
          description: '品尝20种陕西美食',
          progress: 8,
          target: 20
        },
        { 
          id: 4, 
          name: '文化使者', 
          icon: '🎭',
          unlocked: false,
          description: '学习10个陕西方言',
          progress: 3,
          target: 10
        }
      ],
      
      // 方言收集器数据
      dialectList: [
        {
          id: 1,
          word: '克里马擦',
          meaning: '非常干净',
          region: '关中',
          example: '这碗洗得克里马擦！',
          audio: ''
        },
        {
          id: 2,
          word: '撩咋咧',
          meaning: '干什么呢',
          region: '关中',
          example: '你撩咋咧？吃饭了没？',
          audio: ''
        },
        {
          id: 3,
          word: '美得很',
          meaning: '非常好、很棒',
          region: '关中',
          example: '这个biangbiang面美得很！',
          audio: ''
        },
        {
          id: 4,
          word: '嘹咋咧',
          meaning: '怎么样、如何',
          region: '西安',
          example: '今儿个嘹咋咧？',
          audio: ''
        },
        {
          id: 5,
          word: '日弄',
          meaning: '整、弄',
          region: '陕北',
          example: '把这事儿日弄好！',
          audio: ''
        },
        {
          id: 6,
          word: '麻达',
          meaning: '很多',
          region: '陕南',
          example: '今天人麻达得很',
          audio: ''
        },
        {
          id: 7,
          word: '额',
          meaning: '我',
          region: '陕北',
          example: '额今天要去吃面',
          audio: ''
        },
        {
          id: 8,
          word: '瓷实',
          meaning: '结实、靠谱',
          region: '关中',
          example: '这人可瓷实得很',
          audio: ''
        }
      ],
      
      // 弹窗控制
      showDialectDialog: false,
      showMedalDialog: false,
      selectedMedal: null
    }
  },
  onLoad() {
    this.checkLoginStatus()
    this.loadUserData()
  },
  onShow() {
    this.checkLoginStatus()
    this.loadUserData()
  },
  methods: {
    checkLoginStatus() {
      try {
        this.isLoggedIn = uni.getStorageSync('isLoggedIn') || false
        const profile = uni.getStorageSync('profile')
        if (profile) {
          this.userInfo = profile
        }
      } catch (e) {
        this.isLoggedIn = false
      }
    },
    
    loadUserData() {
      // 从本地存储加载用户数据 + 从全局打卡列表统计当前用户的打卡次数
      try {
        const userData = uni.getStorageSync('userData')
        if (userData) {
          this.checkInCount = userData.checkInCount || 0
          this.checklistCount = userData.checklistCount || 0
          this.continuousDays = userData.continuousDays || 0
          this.visitedCount = userData.visitedCount || 0
          this.citiesCount = userData.citiesCount || 0
        }
        // 覆盖：统计本地全局发布的打卡数量（已不再使用 openid 过滤）
        try {
          const raw = uni.getStorageSync('noodle_posts_all')
          const allPosts = Array.isArray(raw) ? raw : []
          this.checkInCount = allPosts.length
        } catch (_) {}
      } catch (e) {
        console.error('加载用户数据失败', e)
      }
    },
    
    // 打开方言收集器
    openDialectTool() {
      this.showDialectDialog = true
    },
    
    closeDialectDialog() {
      this.showDialectDialog = false
    },
    
    // 播放方言发音
    playDialect(dialect) {
      uni.showToast({
        title: `"${dialect.word}" - ${dialect.meaning}`,
        icon: 'none',
        duration: 2000
      })
      // TODO: 实际项目中可以接入语音播放功能
    },
    
    // 打开美食地图
    openFoodMap() {
      uni.showToast({ title: '美食地图开发中', icon: 'none' })
      // TODO: 可以跳转到地图页面或使用第三方地图API
    },
    
    // 显示勋章详情
    showMedalDetail(medal) {
      this.selectedMedal = medal
      this.showMedalDialog = true
    },
    
    closeMedalDialog() {
      this.showMedalDialog = false
      this.selectedMedal = null
    },
    
    // 跳转到清单大全页面（显示所有清单）
    goAllChecklists() {
      uni.showToast({ title: '清单大全页面开发中', icon: 'none' })
      // TODO: 创建一个页面展示所有用户创建的清单
    },
    
    // 跳转到打卡记录（展示所有打卡）
    goCheckInRecords() {
      uni.showToast({ title: '打卡记录页面开发中', icon: 'none' })
      // TODO: 创建页面展示用户在detail.vue中发布的所有打卡记录
    },
    
    // 跳转到美食足迹（城市+店铺统计）
    goFoodFootprints() {
      uni.showToast({ title: '美食足迹页面开发中', icon: 'none' })
      // TODO: 创建页面展示用户在陕西省走过的城市和探访的美食店
    },
    
    // 跳转到非遗体验记录
    goHeritageRecords() {
      uni.showToast({ title: '非遗体验记录页面开发中', icon: 'none' })
      // TODO: 创建页面记录用户的非遗体验项目
    },
    
    // 跳转到关于我们
    goAboutUs() {
      uni.showToast({ title: '关于我们页面开发中', icon: 'none' })
      // TODO: 创建页面展示小程序介绍、用户协议、内容声明、版权声明等
    },
    
    // 跳转到用户建议
    goFeedback() {
      uni.showToast({ title: '用户建议页面开发中', icon: 'none' })
      // TODO: 创建反馈页面，用户可以提交建议和问题
    },
    
    // 跳转到设置中心
    goSettings() {
      uni.showToast({ title: '设置中心页面开发中', icon: 'none' })
      // TODO: 创建设置页面，包含通知设置、隐私设置、清除缓存等
    },
    
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

<style lang="scss" scoped>
.mine-page {
  min-height: 100vh;
  padding: 20rpx 28rpx 20rpx;
  padding-bottom: calc(280rpx + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, #fffaf1 0%, #fff5dc 100%);
  color: #5a2c12;
  font-family: 'LXGW WenKai Screen', 'PingFang SC', system-ui;
}

/* 顶部用户信息卡片 */
.user-header {
  background: linear-gradient(135deg, #ffb74d 0%, #ff9800 100%);
  border-radius: 24rpx;
  padding: 32rpx;
  display: flex;
  gap: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(255, 152, 0, 0.3);
  margin-bottom: 20rpx;
  border: 4rpx solid #f57c00;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 5rpx solid #ffe082;
  box-shadow: 0 4rpx 12rpx rgba(255, 224, 130, 0.5);
}

.user-intro {
  font-size: 22rpx;
  color: #fff9e6;
  text-align: center;
  max-width: 120rpx;
  line-height: 1.4;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
}

.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8rpx;
}

.username {
  font-size: 36rpx;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
}

.user-level {
  font-size: 24rpx;
  color: #fff9e6;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  padding: 4rpx 12rpx;
  border-radius: 999px;
  display: inline-block;
  margin-top: 4rpx;
}

.user-stats {
  font-size: 22rpx;
  color: #fff9e6;
  margin-top: 8rpx;
  opacity: 0.95;
}

/* 成就标签 */
.achievement-tags {
  display: flex;
  gap: 12rpx;
  margin-bottom: 20rpx;
  flex-wrap: wrap;
}

.tag-badge {
  background: linear-gradient(135deg, #ff7043 0%, #ff5722 100%);
  color: #ffffff;
  padding: 8rpx 20rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  font-weight: 600;
  box-shadow: 0 4rpx 8rpx rgba(255, 87, 34, 0.3);
  border: 2rpx solid #f4511e;
}

.tag-badge.locked {
  background: linear-gradient(135deg, #bcaaa4 0%, #a1887f 100%);
  opacity: 0.6;
  border-color: #8d6e63;
}

.tag-text {
  color: #ffffff;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.2);
}

/* 勋章和工具模块 */
.medals-tools-section {
  display: flex;
  gap: 20rpx;
  margin-bottom: 20rpx;
}

/* 左侧勋章网格 */
.medals-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  flex: 1;
}

.medal-item {
  background: linear-gradient(135deg, #d4a574 0%, #c89666 100%);
  border-radius: 16rpx;
  padding: 24rpx 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  box-shadow: 0 4rpx 12rpx rgba(200, 150, 102, 0.3);
  border: 3rpx solid #b8885a;
  position: relative;
  overflow: hidden;
}

.medal-item.locked {
  opacity: 0.5;
  filter: grayscale(0.8);
}

.medal-item::before {
  content: '';
  position: absolute;
  top: -20rpx;
  left: -20rpx;
  right: -20rpx;
  bottom: -20rpx;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.medal-icon {
  font-size: 48rpx;
  line-height: 1;
}

.medal-name {
  font-size: 24rpx;
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.2);
}

/* 右侧工具面板（暖黄色统一模块） */
.tools-panel {
  width: 240rpx;
  background: linear-gradient(135deg, #ffd54f 0%, #ffca28 100%);
  border-radius: 16rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(255, 202, 40, 0.35);
  border: 3rpx solid #f9a825;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.tools-label {
  font-size: 24rpx;
  color: #5a2c12;
  font-weight: 700;
  text-align: center;
  padding-bottom: 12rpx;
  border-bottom: 2rpx solid rgba(90, 44, 18, 0.2);
}

.tool-item {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 12rpx;
  padding: 16rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
  border: 2rpx solid rgba(249, 168, 37, 0.5);
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

.tool-emoji {
  font-size: 32rpx;
  line-height: 1;
}

.tool-name {
  flex: 1;
  font-size: 26rpx;
  color: #5a2c12;
  font-weight: 600;
}

/* 我的内容模块 */
.my-content-section {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 40rpx;
}

.content-card {
  background: #fff5e6;
  border-radius: 20rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  border: 3rpx solid #e8d4b8;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.card-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #5a2c12;
}

.card-arrow {
  font-size: 32rpx;
  color: #cfa86a;
}

.card-preview {
  padding: 12rpx 16rpx;
  background: #ffffff;
  border-radius: 12rpx;
  border: 2rpx solid #f0e6d8;
}

.preview-text {
  font-size: 24rpx;
  color: #8c5c2a;
  line-height: 1.5;
}

/* 设置与信息模块 */
.settings-section {
  background: #fff5e6;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  border: 3rpx solid #e8d4b8;
  margin-top: 32rpx;
  margin-bottom: 40rpx;
}

.setting-item {
  display: flex;
  align-items: center;
  padding: 28rpx 24rpx;
  border-bottom: 2rpx solid #f0e6d8;
  gap: 16rpx;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-icon {
  font-size: 36rpx;
  line-height: 1;
}

.setting-title {
  flex: 1;
  font-size: 28rpx;
  color: #5a2c12;
  font-weight: 600;
}

.setting-arrow {
  font-size: 32rpx;
  color: #cfa86a;
}

/* 方言收集器弹窗 */
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

.dialect-dialog {
  width: 680rpx;
  max-height: 80vh;
  background: #fff5dc;
  border-radius: 24rpx;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.3);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  border-bottom: 3rpx dashed #cfa86a;
}

.dialog-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #5a2c12;
}

.dialog-close {
  font-size: 48rpx;
  line-height: 1;
  color: #5a2c12;
}

.dialect-list {
  flex: 1;
  padding: 24rpx;
  max-height: 600rpx;
}

.dialect-item {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 16rpx;
  border: 3rpx solid #e8d4b8;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
  position: relative;
}

.dialect-word {
  font-size: 32rpx;
  font-weight: 700;
  color: #5a2c12;
  margin-bottom: 8rpx;
}

.dialect-meaning {
  font-size: 26rpx;
  color: #ff6b6b;
  margin-bottom: 6rpx;
  font-weight: 600;
}

.dialect-region {
  display: inline-block;
  font-size: 20rpx;
  color: #fff;
  background: #ffcc33;
  padding: 4rpx 12rpx;
  border-radius: 999px;
  margin-bottom: 12rpx;
}

.dialect-example {
  font-size: 24rpx;
  color: #8c5c2a;
  line-height: 1.6;
  padding: 12rpx;
  background: #fff5e6;
  border-radius: 8rpx;
}

.example-label {
  font-weight: 600;
  color: #5a2c12;
}

.play-icon {
  position: absolute;
  right: 20rpx;
  top: 20rpx;
  font-size: 32rpx;
}

.dialect-footer {
  padding: 24rpx 32rpx;
  text-align: center;
  border-top: 3rpx dashed #cfa86a;
}

.collected-count {
  font-size: 24rpx;
  color: #8c5c2a;
}

/* 勋章详情弹窗 */
.medal-dialog {
  width: 600rpx;
  background: #fff5dc;
  border-radius: 24rpx;
  padding: 48rpx 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.3);
}

.medal-detail-icon {
  font-size: 80rpx;
  line-height: 1;
}

.medal-detail-name {
  font-size: 36rpx;
  font-weight: 700;
  color: #5a2c12;
}

.medal-detail-desc {
  font-size: 26rpx;
  color: #8c5c2a;
  text-align: center;
  line-height: 1.6;
  padding: 0 20rpx;
}

.medal-progress {
  width: 100%;
  margin-top: 16rpx;
}

.progress-text {
  font-size: 24rpx;
  color: #5a2c12;
  display: block;
  text-align: center;
  margin-bottom: 12rpx;
}

.progress-bar {
  width: 100%;
  height: 16rpx;
  background: #e8d4b8;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffcc33, #ff9933);
  border-radius: 999px;
  transition: width 0.3s ease;
}

.medal-unlock-time {
  font-size: 24rpx;
  color: #ff6b6b;
  font-weight: 600;
}

.dialog-btn {
  margin-top: 16rpx;
  width: 100%;
  height: 72rpx;
  background: #ffcc33;
  color: #5a2c12;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  font-weight: 600;
}

/* 固定在底部图标上方的筷子图片 */
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

.icons-top {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -20rpx 0 20rpx;
  padding-top: 0;
  z-index:-1;
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
