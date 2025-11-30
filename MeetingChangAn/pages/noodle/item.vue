<template>
  <view class="food-page">
    <view class="hero">
      <image :src="noodleHero" class="hero-img" mode="aspectFill" />
    </view>

    <view class="food-body">
      <text class="food-title">{{ noodle.name }}</text>
      <text class="food-intro">{{ noodle.intro }}</text>
      <view class="food-tags">
        <text v-for="t in noodle.tags" :key="t" class="tag">#{{ t }}</text>
      </view>
    </view>

    <!-- 详细信息区：历史与特色 -->
    <view class="extra-grid">
      <view class="info-card">
        <text class="card-title">历史渊源</text>
        <text class="card-text card-text--indent">{{ noodle.history || '暂无介绍' }}</text>
      </view>
      <view class="info-card">
        <text class="card-title">制作与特色</text>
        <text class="card-text">{{ noodle.features || '暂无介绍' }}</text>
      </view>
    </view>


  </view>
</template>

<script>
const { queryFoods, getFoodById } = require('../../api/foods.js');
export default {
  data() {
    return {
      slug: '',
      city: '',
      noodle: { name: '', intro: '', tags: [], history: '', features: '', heroImg: '' }
    }
  },
  computed: {
    cityName() {
      const map = {
        xian: '西安', tongchuan: '铜川', baoji: '宝鸡', xianyang: '咸阳',
        weinan: '渭南', yanan: '延安', yulin: '榆林', hanzhong: '汉中',
        ankang: '安康', shangluo: '商洛'
      }
      return map[this.city] || '陕西'
    },
    // 优先使用数据中的 heroImg，其次占位图
    noodleHero() {
      return this.noodle.heroImg || '/static/assets/retouch_2025112414392946.png'
    }
  },
  onLoad(query) {
    this.slug = (query.slug || '').trim()
    this.city = (query.city || '').trim()
    // 支持从路由参数携带 id 与 foodName，优先用于接口查询
    const routeIdRaw = query.id != null ? String(query.id).trim() : ''
    const routeId = routeIdRaw && !Number.isNaN(Number(routeIdRaw)) ? Number(routeIdRaw) : null
    const routeFoodName = (query.foodName || '').trim()
    console.log('[item:onLoad] slug=', this.slug, ' city=', this.city, ' id=', routeId, ' foodName=', routeFoodName)

    const nameMap = {
      'biangbiang': 'biángbiáng面',
      'youpomian': '油泼面',
      'liangpi': '凉皮',
      'yaozhou-saozi': '耀州臊子面',
      'qishan-saozi': '岐山臊子面',
      'ganmianpi': '擀面皮',
      'chemaian': '扯面',
      'tongguan-saozi': '潼关臊子面',
      'hancheng-heleg': '韩城羊肉饸饹',
      'zicang-jianbing': '子长煎饼',
      'qiaomian-hele': '荞面饸饹',
      'yangza-fentang': '羊杂粉汤',
      'remipi': '汉中热米皮',
      'caidoufu-mian': '菜豆腐面',
      'zhengmian': '安康蒸面',
      'ziyang-haozi': '紫阳蒿子面',
      'luonan-suantang': '洛南酸汤面'
    }
    const introMap = {
      'biangbiang': '宽厚筋道，油泼蒜醋香扑面。',
      'youpomian': '辣子热油一泼，蒜香与醋香交织。',
      'liangpi': '柔韧清爽，酸辣开胃。',
      'yaozhou-saozi': '细面吸汤，酸辣臊子开胃。',
      'qishan-saozi': '酸辣咸香协调，臊子丰富。',
      'ganmianpi': '筋爽弹牙，辣香耐吃。',
      'chemaian': '长而宽，嚼劲十足。',
      'tongguan-saozi': '臊子多样，酸辣鲜香。',
      'hancheng-heleg': '饸饹筋道，羊汤浓香。',
      'zicang-jianbing': '薄脆香酥，配料丰富。',
      'qiaomian-hele': '荞香浓郁，口感独特。',
      'yangza-fentang': '暖胃滋补，汤鲜而不腻。',
      'remipi': '热食更筋韧，辣香扑鼻。',
      'caidoufu-mian': '豆香清爽，营养均衡。',
      'zhengmian': '蒸面偏湿，裹住辣油更香。',
      'ziyang-haozi': '蒿香清新，口感独特。',
      'luonan-suantang': '山泉酸爽，清冽开胃。'
    }
    const tagsMap = {
      'biangbiang': ['宽面','油泼'],
      'youpomian': ['辣子','蒜香'],
      'liangpi': ['清爽','酸辣'],
      'yaozhou-saozi': ['臊子','酸辣'],
      'qishan-saozi': ['臊子','酸辣'],
      'ganmianpi': ['筋爽','凉食'],
      'chemaian': ['拉面','筋道'],
      'tongguan-saozi': ['臊子','鲜香'],
      'hancheng-heleg': ['饸饹','羊汤'],
      'zicang-jianbing': ['煎饼','香酥'],
      'qiaomian-hele': ['荞面','饸饹'],
      'yangza-fentang': ['粉汤','羊杂'],
      'remipi': ['米皮','热食'],
      'caidoufu-mian': ['豆香','家常'],
      'zhengmian': ['蒸面','湿润'],
      'ziyang-haozi': ['蒿香','清新'],
      'luonan-suantang': ['酸汤','清冽']
    }

    const name = nameMap[this.slug] || '面食'
    const intro = introMap[this.slug] || '这是一道地方特色面食。'
    const tags = tagsMap[this.slug] || ['特色','本地']
    this.noodle = { name, intro, tags, history: '', features: '', heroImg: '' }

    // 特例覆盖：荞面饸饹（来自你提供的数据）
    if (this.slug === 'qiaomian-hele') {
      const provided = {
        name: '荞面饸饹',
        imageUrl: 'https://qiqjregvdczjxckgiqan.supabase.co/storage/v1/object/public/NoodlePicture/BuckwheatNoodles.png',
        history: '饸饹面的历史非常悠久，其制作工具“饸饹床子”在元代农书中已有明确记载。它的诞生与北方地区广泛种植荞麦、高粱等杂粮的物产背景直接相关。由于荞麦缺乏 gluten，不易擀切，智慧的古人便发明了这种“压”面的工具，使粗糙的杂粮得以制成顺滑的面条。这道美食承载着中国北方杂粮饮食文化的记忆，是古代食品加工机械与饮食智慧结合的典范。',
        introduction: '荞面饸饹是将和好的荞麦面团放入木制或铁制的“饸饹床子”中，通过杠杆原理，用物理压力将面团从底部的多孔模具中直接压入沸水锅中，煮熟后捞出。成品面条呈灰褐色，圆滑长爽，带有荞麦特有的清香。可做汤面，亦可凉拌，口感筋道滑溜，是典型的健康粗粮食品。',
        features: '工具压制：使用独特的“饸饹床子”制作，过程充满仪式感，面条形态均匀圆润。 杂粮健康：主料为荞麦，富含膳食纤维和多种营养素，是公认的健康绿色食品。 口感独特：面条因压制而格外筋道、滑溜，与手擀面口感迥异。 吃法多样：著名的有羊肉臊子饸饹、凉拌饸饹等，风味各异，荤素皆宜。',
        tag: '面食',
        city: '榆林市'
      }
      const tags2 = (provided.tag || '').split(/[,\s]+/).filter(Boolean)
      this.noodle = {
        name: provided.name,
        intro: provided.introduction,
        tags: tags2.length ? tags2 : tags,
        history: provided.history,
        features: provided.features,
        heroImg: provided.imageUrl
      }
    }

    // 设置导航标题为面食名
    uni.setNavigationBarTitle({ title: name })

    // 接入接口：按条件查询（优先 foodName，其次 tag），不再按城市查询
    const targetName = routeFoodName || (nameMap[this.slug] || '')
    const firstTag = (Array.isArray(tags) && tags[0]) || ''
    const toList = (res) => Array.isArray(res) ? res : ((res && res.data) || [])
    const fillFrom = (found) => {
      const t = found.tags || found.tag
      const tagsFromApi = Array.isArray(t) ? t : (typeof t === 'string' ? t.split(/[,\s]+/).filter(Boolean) : (t != null ? [t] : this.noodle.tags))
      this.noodle = {
        name: found.foodName || found.name || this.noodle.name,
        intro: found.introduction || found.intro || found.description || this.noodle.intro,
        tags: tagsFromApi,
        history: found.history || this.noodle.history,
        features: found.features || this.noodle.features,
        heroImg: found.imageUrl || found.image || found.img || found.coverImage || this.noodle.heroImg
      }
      if (this.noodle.name) uni.setNavigationBarTitle({ title: this.noodle.name })
    }

    const tryFetch = async () => {
      // 仅在存在明确条件时请求：优先 id，其次 foodName；否则不请求
      if (routeId != null) {
        try {
          console.log('[item:api] query by id=', routeId)
          const res0 = await queryFoods({ id: routeId })
          const list0 = toList(res0)
          if (Array.isArray(list0) && list0.length) {
            fillFrom(list0[0])
            console.log('[item:api] filled by id')
            return true
          } else {
            console.warn('[item:api] empty list for id=', routeId)
          }
        } catch (e) {
          console.error('[item:api] request failed for id=', routeId, e)
        }
      } else if (targetName) {
        try {
          console.log('[item:api] query by foodName=', targetName)
          const res1 = await queryFoods({ foodName: targetName })
          const list1 = toList(res1)
          if (Array.isArray(list1) && list1.length) {
            const found1 = list1.find(it =>
              String(it.foodName || '').trim() === targetName
              || String(it.slug || '').trim() === this.slug
            ) || list1[0]
            fillFrom(found1)
            console.log('[item:api] filled by foodName')
            return true
          } else {
            console.warn('[item:api] empty list for foodName=', targetName)
          }
        } catch (e) {
          console.error('[item:api] request failed for foodName=', targetName, e)
        }
      }
      // 没有 id/foodName，就保留本地静态数据
      return false
    }

    tryFetch().then(ok => {
      if (!ok) console.warn('[item:api] 条件查询未命中，保留本地数据')
    })
  }
}
</script>

<style scoped lang="scss">
.food-page {
  min-height: 100vh;
  background: linear-gradient(180deg,#fffaf1 0%, #fff5dc 100%);
  color: #5a2c12;
  padding-bottom: 40rpx;
}

.hero {
  position: relative;
  width: 100%;
  height: 440rpx;      /* 全宽头图高度（按需） */
  overflow: hidden;   /* 裁掉下端 */
  margin: 0;          /* 顶部紧贴 */
}
.hero-img {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}
.food-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.food-name {
  font-size: 40rpx;
  font-weight: 700;
}
.food-city {
  margin-top: 8rpx;
  font-size: 26rpx;
  color: #8c5c2a;
}

.food-body {
  margin: 16rpx 24rpx 0;
  background: #fff5df;
  border-radius: 24rpx;
  box-shadow: 0 12rpx 24rpx rgba(0,0,0,0.08);
  padding: 20rpx 24rpx 24rpx;
}
.food-intro {
  font-size: 28rpx;
  line-height: 1.6;
  display: block; /* 使 text-indent 生效于块级 */
  text-indent: 2em; /* 段首缩进 */
}
.food-tags {
  margin-top: 14rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx 12rpx;
}
.tag {
  font-size: 22rpx;
  color: #7b2f00;
  background: #ffecc7;
  padding: 6rpx 12rpx;
  border-radius: 999px;
}
.food-title {
  display: block;
  text-align: center;
  font-size: 48rpx;
  font-weight: 700;
  margin-bottom: 12rpx;
}
.extra-grid {
  margin: 16rpx 24rpx 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12rpx;
}
.info-card {
  background: #fff5df;
  border-radius: 20rpx;
  box-shadow: 0 8rpx 16rpx rgba(0,0,0,0.08);
  padding: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.card-title {
  font-size: 34rpx;
  font-weight: 700;
}
.card-text {
  font-size: 28rpx;
  line-height: 1.6;
  color: #5a2c12;
}
.card-text--indent {
  text-indent: 2em; /* 历史渊源段首缩进 */
}




</style>