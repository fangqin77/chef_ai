<template>
  <view class="chat-page">
    <!-- 顶部安全区域占位（小程序默认导航栏已由 pages.json 设置标题） -->

    <!-- 会话区 -->
    <scroll-view class="messages" scroll-y :scroll-top="scrollTop" scroll-with-animation @scrolltoupper="loadMore" :refresher-enabled="false">
      <view v-for="(msg, index) in messages" :key="index" :class="['msg', msg.type]">
        <image v-if="msg.type === 'assistant'" class="avatar" :src="assistantAvatar" mode="aspectFit" />
        <view v-else class="avatar-placeholder"></view>
        <view class="bubble">
          {{ msg.content }}
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
          if (typeof content === 'string') {
            const parsedData = JSON.parse(content);
            if (parsedData && typeof parsedData === 'object' && parsedData.name) {
              content = this.formatRecipeData(parsedData);
            }
          } else if (content && typeof content === 'object' && content.name) {
            content = this.formatRecipeData(content);
          }
        } catch (error) {
          // 如果不是JSON格式，保持原样
        }
        
        this.messages[aiMessageIndex] = {
          type: 'assistant',
          content: content,
          loading: false
        };
        
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
    
    // 格式化菜谱数据
    formatRecipeData(recipe) {
      let formatted = '';
      
      // 1. 菜名标题（单独一行）
      if (recipe.name) {
        formatted += `🍽️ **${recipe.name}**

`;
      }
      
      // 2. 基本信息部分
      let hasBasicInfo = false;
      let basicInfoContent = '';
      
      if (recipe.typeId) {
        const typeMap = {
          1: '家常菜',
          2: '汤品',
          3: '甜点',
          4: '主食',
          5: '小吃'
        };
        basicInfoContent += `• 分类: ${typeMap[recipe.typeId] || '其他'}
`;
        hasBasicInfo = true;
      }
      
      if (recipe.ingredients) {
        basicInfoContent += `• 食材数量: ${recipe.ingredients}种
`;
        hasBasicInfo = true;
      }
      
      if (recipe.condiments) {
        basicInfoContent += `• 调味料: ${recipe.condiments}
`;
        hasBasicInfo = true;
      }
      
      if (hasBasicInfo) {
        formatted += `📋 **基本信息**
${basicInfoContent}
`;
      }
      
      // 3. 制作方法部分
      if (recipe.method) {
        formatted += `👨‍🍳 **制作方法**
`;
        // 处理带有序号的制作步骤
        const methodLines = recipe.method.split(/\d+\./).filter(line => line.trim());
        let methodContent = '';
        methodLines.forEach((line, index) => {
          methodContent += `${index + 1}. ${line.trim()}
`;
        });
        formatted += `${methodContent}
`;
      }
      
      // 4. 营养成分部分
      if (recipe.nutrition) {
        let hasNutrition = false;
        let nutritionContent = '';
        
        if (recipe.nutrition.calories) {
          nutritionContent += `• 热量: ${recipe.nutrition.calories}
`;
          hasNutrition = true;
        }
        if (recipe.nutrition.protein) {
          nutritionContent += `• 蛋白质: ${recipe.nutrition.protein}
`;
          hasNutrition = true;
        }
        if (recipe.nutrition.fat) {
          nutritionContent += `• 脂肪: ${recipe.nutrition.fat}
`;
          hasNutrition = true;
        }
        if (recipe.nutrition.carbohydrates) {
          nutritionContent += `• 碳水化合物: ${recipe.nutrition.carbohydrates}
`;
          hasNutrition = true;
        }
        
        if (hasNutrition) {
          formatted += `📊 **营养成分**
${nutritionContent}
`;
        }
      }
      
      // 5. 食用建议部分
      if (recipe.suggestion) {
        formatted += `💡 **食用建议**
${recipe.suggestion}

`;
      }
      
      // 6. 小贴士部分
      if (recipe.tips) {
        formatted += `🌟 **小贴士**
${recipe.tips}
`;
      }
      
      return formatted;
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
  padding: 24rpx 24rpx 12rpx 24rpx;
  box-sizing: border-box;
}
.msg {
  display: flex;
  margin-bottom: 20rpx;
}
.msg.assistant .avatar {
  width: 144rpx;
  height: 144rpx;
  margin-right: 16rpx;
  border-radius: 24rpx;
}
.bubble {
  max-width: 560rpx;
  padding: 18rpx 22rpx;
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
}

/* 输入区 */
.input-bar {
  padding: 16rpx 20rpx 28rpx 20rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  background: #f7f7f9;
  box-sizing: border-box;
}
.input-field {
  flex: 1;
  height: 88rpx;
  border-radius: 44rpx;
  background: #fffcf0;
  color: #1f2937;
  border: 1rpx solid #ffd166;
  display: flex;
  align-items: center;
  padding: 0 24rpx;
  font-size: 28rpx;
}
.input-field:focus {
  border-color: #ffb347;
  outline: none;
  background: #fff8e1;
  box-shadow: 0 0 0 3rpx rgba(255, 179, 71, 0.2);
}
.input-field::placeholder {
  color: #b38f00;
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
  width: 144rpx;
  height: 144rpx;
  margin-left: 16rpx;
  margin-right: 0;
  border-radius: 24rpx;
  border: 2rpx solid #ffd166;
}
.avatar-placeholder {
  width: 144rpx;
  height: 144rpx;
  margin-right: 16rpx;
  margin-left: 0;
}
.avatar-placeholder {
  width: 144rpx;
  height: 144rpx;
  margin-right: 16rpx;
  margin-left: 0;
}
.msg.user .bubble {
  border-radius: 18rpx 18rpx 6rpx 18rpx;
  background: linear-gradient(135deg, #ffb347 0%, #ffcc33 100%);
  color: #ffffff;
  box-shadow: 0 6rpx 16rpx rgba(255, 179, 71, 0.3);
  border: 1rpx solid #ffb347;
  max-width: none;
  width: auto;
  min-width: 80rpx;
  padding: 18rpx 22rpx;
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
</style>