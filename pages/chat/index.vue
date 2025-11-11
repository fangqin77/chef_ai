<template>
  <view class="chat-page">
    <!-- 顶部安全区域占位（小程序默认导航栏已由 pages.json 设置标题） -->

    <!-- 会话区 -->
    <scroll-view class="messages" scroll-y :scroll-top="scrollTop" scroll-with-animation @scrolltoupper="loadMore" :refresher-enabled="false">
      <view v-for="(msg, index) in messages" :key="index" :class="['msg', msg.type]">
        <image v-if="msg.type === 'assistant'" class="avatar" :src="assistantAvatar" mode="aspectFit" />
        <view v-else class="avatar-placeholder"></view>
    <view class="bubble">
      <template v-if="msg.isRecipe">
        <!-- 菜谱卡片 -->
        <view class="recipe-card">
          <view class="recipe-header">
            <text class="recipe-icon">🍽️</text>
            <text class="recipe-title">{{ msg.recipe.name }}</text>
          </view>
          
          <!-- 基本信息 -->
          <view v-if="msg.recipe.basicInfo" class="recipe-section">
            <view class="section-title">
              <text class="section-icon">📋</text>
              <text class="section-text">基本信息</text>
            </view>
            <view class="info-grid">
              <view v-for="(info, key) in msg.recipe.basicInfo" :key="key" class="info-item">
                <text class="info-label">{{ info.label }}：</text>
                <text class="info-value">{{ info.value }}</text>
              </view>
            </view>
          </view>
          
          <!-- 制作方法 -->
          <view v-if="msg.recipe.method" class="recipe-section">
            <view class="section-title">
              <text class="section-icon">👨‍🍳</text>
              <text class="section-text">制作方法</text>
            </view>
            <view class="steps">
              <view v-for="(step, index) in msg.recipe.method" :key="index" class="step">
                <text class="step-number">{{ index + 1 }}</text>
                <text class="step-text">{{ step }}</text>
              </view>
            </view>
          </view>
          
          <!-- 营养成分 -->
          <view v-if="msg.recipe.nutrition" class="recipe-section">
            <view class="section-title">
              <text class="section-icon">📊</text>
              <text class="section-text">营养成分</text>
            </view>
            <view class="nutrition-grid">
              <view v-for="(nutri, key) in msg.recipe.nutrition" :key="key" class="nutrition-item">
                <text class="nutrition-label">{{ nutri.label }}</text>
                <text class="nutrition-value">{{ nutri.value }}</text>
              </view>
            </view>
          </view>
          
          <!-- 小贴士 -->
          <view v-if="msg.recipe.tips" class="recipe-section">
            <view class="section-title">
              <text class="section-icon">💡</text>
              <text class="section-text">食用建议</text>
            </view>
            <text class="tips-text">{{ msg.recipe.tips }}</text>
          </view>
        </view>
      </template>
      <template v-else>
        {{ msg.content }}
      </template>
      
      <view v-if="msg.loading" class="typing-dots">
        <view class="dot"></view>
        <view class="dot"></view>
        <view class="dot"></view>
      </view>
    </view>
      </view>
    </scroll-view>

    <!-- 输入区 -->
    <view class="input-bar">
      <input 
        class="input-field" 
        v-model="userInput" 
        placeholder="输入食材/偏好"
        :disabled="isLoading"
        @confirm="sendMessage"
        confirm-type="send"
      />
      <button class="send-btn" :disabled="!userInput.trim() || isLoading" @click="sendMessage">
        {{ isLoading ? '发送中...' : '发送' }}
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        {
          type: 'assistant',
          content: '今天吃点什么呢？可以输入食材或口味偏好，我来给你灵感～',
          loading: false
        }
      ],
      userInput: '',
      isLoading: false,
      scrollTop: 0,
      assistantAvatar: '/static/retouch_2025102716043091.png',
      userAvatar: '/static/yuan_97e57f821c79b841651df5b413309328.jpg'
    };
  },
  
  onLoad() {
    // 初始化会话ID
    this.conversationId = uni.getStorageSync('conversationId') || undefined;
  },
  
  methods: {
    // 调用AI接口
    async askAi(query, variables = {}) {
      try {
        const response = await uni.request({
          url: 'http://172.20.10.3:9000/api/ai/workflow/execute',
          method: 'POST',
          header: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${uni.getStorageSync('token')}` 
          },
          data: {
            query,
            lang: 'zh',
            context: { 
              page: 'home', 
              conversationId: this.conversationId 
            },
            variables
          }
        });
        
        if (response[1]?.data?.success) {
          const resp = response[1].data.data;
          const convId = resp?.conversation_id || resp?.data?.conversation_id;
          
          // 保存会话ID
          if (convId) {
            this.conversationId = convId;
            uni.setStorageSync('conversationId', convId);
          }
          
          return resp;
        } else {
          throw new Error(response[1]?.data?.message || 'AI调用失败');
        }
      } catch (error) {
        console.error('AI调用失败:', error);
        throw error;
      }
    },
    
    // 发送消息
    async sendMessage() {
      if (!this.userInput.trim() || this.isLoading) return;
      
      const query = this.userInput.trim();
      this.userInput = '';
      
      // 添加用户消息
      this.messages.push({
        type: 'user',
        content: query,
        loading: false
      });
      
      // 添加AI回复占位
      const aiMessageIndex = this.messages.push({
        type: 'assistant',
        content: '',
        loading: true
      }) - 1;
      
      this.isLoading = true;
      this.scrollToBottom();
      
      try {
        const response = await this.askAi(query);
        
        // 格式化AI回复 - 如果是JSON格式的菜谱数据，则进行美化展示
        let content = response?.answer || response?.data?.answer || '抱歉，我暂时无法回答这个问题。';
        
        // 尝试解析JSON格式的菜谱数据
        try {
          let recipeData = null;
          if (typeof content === 'string') {
            recipeData = JSON.parse(content);
          } else if (content && typeof content === 'object') {
            recipeData = content;
          }
          
          if (recipeData && recipeData.name) {
            // 如果是菜谱数据，创建菜谱卡片
            this.messages[aiMessageIndex] = {
              type: 'assistant',
              content: '',
              loading: false,
              isRecipe: true,
              recipe: this.formatRecipeCardData(recipeData)
            };
          } else {
            // 普通文本回复
            this.messages[aiMessageIndex] = {
              type: 'assistant',
              content: content,
              loading: false
            };
          }
        } catch (error) {
          // 如果不是JSON格式，保持原样
          this.messages[aiMessageIndex] = {
            type: 'assistant',
            content: content,
            loading: false
          };
        }
        
      } catch (error) {
        // 显示错误信息
        this.messages[aiMessageIndex] = {
          type: 'assistant',
          content: '网络连接失败，请检查网络后重试。',
          loading: false
        };
        
        uni.showToast({
          title: error.message || 'AI调用失败',
          icon: 'none'
        });
      } finally {
        this.isLoading = false;
        this.scrollToBottom();
      }
    },
    
    // 滚动到底部
    scrollToBottom() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.scrollTop = 99999;
        }, 100);
      });
    },
    
    // 加载更多消息（预留）
    loadMore() {
      // 可以在这里实现加载历史消息的功能
    },
    
    // 格式化菜谱数据为卡片结构
    formatRecipeCardData(recipe) {
      const cardData = {
        name: recipe.name || '未知菜名',
        basicInfo: [],
        method: [],
        nutrition: [],
        tips: recipe.tips || recipe.suggestion || ''
      };
      
      // 1. 基本信息
      if (recipe.typeId) {
        const typeMap = {
          1: '家常菜',
          2: '汤品',
          3: '甜点',
          4: '主食',
          5: '小吃'
        };
        cardData.basicInfo.push({
          label: '分类',
          value: typeMap[recipe.typeId] || '其他'
        });
      }
      
      if (recipe.ingredients) {
        cardData.basicInfo.push({
          label: '食材数量',
          value: `${recipe.ingredients}种`
        });
      }
      
      if (recipe.condiments) {
        cardData.basicInfo.push({
          label: '调味料',
          value: recipe.condiments
        });
      }
      
      // 2. 制作方法
      if (recipe.method) {
        const methodLines = recipe.method.split(/\d+\./).filter(line => line.trim());
        cardData.method = methodLines.map(line => line.trim());
      }
      
      // 3. 营养成分
      if (recipe.nutrition) {
        if (recipe.nutrition.calories) {
          cardData.nutrition.push({
            label: '热量',
            value: recipe.nutrition.calories
          });
        }
        if (recipe.nutrition.protein) {
          cardData.nutrition.push({
            label: '蛋白质',
            value: recipe.nutrition.protein
          });
        }
        if (recipe.nutrition.fat) {
          cardData.nutrition.push({
            label: '脂肪',
            value: recipe.nutrition.fat
          });
        }
        if (recipe.nutrition.carbohydrates) {
          cardData.nutrition.push({
            label: '碳水化合物',
            value: recipe.nutrition.carbohydrates
          });
        }
      }
      
      return cardData;
    }
  }
};
</script>

<style>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f7f2e7;
}

/* 会话区 */
.messages {
  flex: 1;
  padding: 20rpx 8rpx 8rpx 4rpx;
  box-sizing: border-box;
}
.msg {
  display: flex;
  margin-bottom: 16rpx;
  align-items: flex-start;
}
.msg.assistant .avatar {
  width: 100rpx;
  height: 100rpx;
  margin-right: 6rpx;
  margin-left: 0;
  border-radius: 50%;
  flex-shrink: 0;
}
.bubble {
  max-width: 70%;
  min-width: auto;
  padding: 16rpx 20rpx;
  border-radius: 18rpx 18rpx 18rpx 6rpx;
  background: #ffffff;
  color: #1f2937;
  font-size: 28rpx;
  line-height: 1.6;
  box-shadow: 0 6rpx 16rpx rgba(0,0,0,0.05);
  word-wrap: break-word;
  word-break: break-word;
  display: inline-block;
  width: fit-content;
  flex: none;
}

/* 输入区 */
.input-bar {
  padding: 16rpx 20rpx 28rpx 20rpx;
  display: flex;
  align-items: flex-end;
  gap: 16rpx;
  background: #f7f7f9;
  box-sizing: border-box;
  position: relative;
}
.input-field {
  flex: 1;
  min-height: 88rpx;
  max-height: 200rpx;
  border-radius: 44rpx;
  background: #fffcf0;
  color: #1f2937;
  border: 1rpx solid #ffd166;
  padding: 24rpx;
  font-size: 28rpx;
  line-height: 1.4;
  resize: none;
  box-sizing: border-box;
  word-wrap: break-word;
  word-break: break-word;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  /* 确保输入框内容宽度自适应 */
  min-width: 200rpx;
  transition: all 0.2s ease;
}
.input-field:focus {
  border-color: #ffb347;
  outline: none;
  background: #fff8e1;
  box-shadow: 0 0 0 3rpx rgba(255, 179, 71, 0.2);
  transform: translateY(-1rpx);
}
.input-field::placeholder {
  color: #b38f00;
}

/* 动态调整输入框宽度 */
.input-field.dynamic-width {
  width: auto;
  flex: none;
}

/* 输入框内容测量元素（用于动态计算宽度） */
.input-measure {
  position: absolute;
  visibility: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 28rpx;
  line-height: 1.4;
  padding: 24rpx;
  max-width: 560rpx;
}
.send-btn {
  height: 88rpx;
  padding: 0 28rpx;
  border-radius: 44rpx;
  background: linear-gradient(135deg, #ffcb6b 0%, #ffd966 100%);
  color: #fff;
  font-size: 28rpx;
  border: none;
  transition: all 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}
.send-btn:disabled {
  opacity: 0.6;
  background: #e0d7c8;
}
.send-btn:not(:disabled):active {
  background: linear-gradient(135deg, #ffa726 0%, #ffb300 100%);
  transform: scale(0.98);
}

/* 用户消息样式 */
.msg.user {
  justify-content: flex-end;
}
.msg.user .avatar {
  width: 80rpx;
  height: 80rpx;
  margin-left: 16rpx;
  margin-right: 0;
  border-radius: 50%;
  border: 2rpx solid #ffd166;
  flex-shrink: 0;
}
.avatar-placeholder {
  width: 80rpx;
  height: 80rpx;
  margin-left: 16rpx;
  margin-right: 0;
  flex-shrink: 0;
}
.msg.user .bubble {
  border-radius: 18rpx 18rpx 6rpx 18rpx;
  background: linear-gradient(135deg, #ffb347 0%, #ffcc33 100%);
  color: #ffffff;
  box-shadow: 0 6rpx 16rpx rgba(255, 179, 71, 0.3);
  border: 1rpx solid #ffb347;
  max-width: 85%;
  min-width: auto;
  padding: 16rpx 20rpx;
  width: fit-content;
  flex: none;
}

/* 打字动画 */
.typing-dots {
  display: inline-flex;
  gap: 6rpx;
  margin-left: 12rpx;
}
.dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: #9aa3af;
  animation: typing 1.4s infinite ease-in-out;
}
.dot:nth-child(1) {
  animation-delay: -0.32s;
}
.dot:nth-child(2) {
  animation-delay: -0.16s;
}
@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 菜谱卡片样式 */
.recipe-card {
  background: linear-gradient(135deg, #fff9e6 0%, #fff0cc 100%);
  border: 1rpx solid #ffd166;
  border-radius: 16rpx;
  padding: 24rpx;
  margin: 8rpx 0;
  box-shadow: 0 8rpx 24rpx rgba(255, 179, 71, 0.15);
  position: relative;
  overflow: hidden;
}

/* 菜谱卡片头部 */
.recipe-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid rgba(255, 179, 71, 0.3);
}

.recipe-icon {
  font-size: 36rpx;
  margin-right: 12rpx;
}

.recipe-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #ff6a00;
  flex: 1;
}

/* 菜谱分区样式 */
.recipe-section {
  margin-bottom: 24rpx;
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.section-icon {
  font-size: 28rpx;
  margin-right: 8rpx;
}

.section-text {
  font-size: 28rpx;
  font-weight: 600;
  color: #ff6a00;
}

/* 基本信息网格 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200rpx, 1fr));
  gap: 12rpx;
}

.info-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8rpx;
  padding: 12rpx;
  border: 1rpx solid rgba(255, 179, 71, 0.2);
}

.info-label {
  font-size: 24rpx;
  color: #666;
  font-weight: 500;
  margin-right: 4rpx;
}

.info-value {
  font-size: 24rpx;
  color: #333;
  font-weight: 600;
}

/* 制作方法步骤 */
.steps {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.step {
  display: flex;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8rpx;
  padding: 16rpx;
  border-left: 4rpx solid #ffb347;
}

.step-number {
  background: #ffb347;
  color: white;
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
  font-weight: 600;
  margin-right: 12rpx;
  flex-shrink: 0;
}

.step-text {
  font-size: 26rpx;
  color: #333;
  line-height: 1.5;
  flex: 1;
}

/* 营养成分网格 */
.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.nutrition-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8rpx;
  padding: 16rpx;
  border: 1rpx solid rgba(255, 179, 71, 0.2);
}

.nutrition-label {
  font-size: 22rpx;
  color: #666;
  margin-bottom: 4rpx;
}

.nutrition-value {
  font-size: 26rpx;
  color: #ff6a00;
  font-weight: 600;
}

/* 小贴士样式 */
.tips-text {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8rpx;
  padding: 16rpx;
  font-size: 26rpx;
  color: #333;
  line-height: 1.5;
  border-left: 4rpx solid #ffb347;
}

/* 响应式调整 */
@media (max-width: 750rpx) {
  .info-grid {
    grid-template-columns: repeat(auto-fit, minmax(150rpx, 1fr));
  }
  
  .nutrition-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>