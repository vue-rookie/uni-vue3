<template>
  <view class="discovery-page">
    <!-- 自定义导航栏 -->
    <xhs-navbar title="发现">
      <template #right>
        <text class="iconfont icon-search nav-icon"></text>
      </template>
    </xhs-navbar>

    <!-- 内容区域 -->
    <view class="content" :style="{ paddingTop: navbarHeight + 'px' }">
      <!-- 热门话题 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">热门话题</text>
          <text class="section-more">更多</text>
        </view>
        <view class="topics-grid">
          <view 
            class="topic-item" 
            v-for="topic in hotTopics" 
            :key="topic.id"
            @click="handleTopicClick(topic)"
          >
            <image :src="topic.cover" class="topic-cover" />
            <view class="topic-info">
              <text class="topic-name"># {{ topic.name }}</text>
              <text class="topic-count">{{ topic.count }}万人参与</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 品牌合作 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">品牌合作</text>
          <text class="section-more">更多</text>
        </view>
        <scroll-view class="brands-scroll" scroll-x show-scrollbar="false">
          <view 
            class="brand-item" 
            v-for="brand in brands" 
            :key="brand.id"
            @click="handleBrandClick(brand)"
          >
            <image :src="brand.logo" class="brand-logo" />
            <text class="brand-name">{{ brand.name }}</text>
          </view>
        </scroll-view>
      </view>

      <!-- 热门商品 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">热门商品</text>
          <text class="section-more">更多</text>
        </view>
        <view class="products-grid">
          <view 
            class="product-item" 
            v-for="product in products" 
            :key="product.id"
            @click="handleProductClick(product)"
          >
            <image :src="product.image" class="product-image" />
            <view class="product-info">
              <text class="product-title">{{ product.title }}</text>
              <view class="product-price">
                <text class="price-symbol">¥</text>
                <text class="price-value">{{ product.price }}</text>
                <text class="price-original">¥{{ product.originalPrice }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 推荐达人 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">推荐达人</text>
          <text class="section-more">更多</text>
        </view>
        <view class="influencers-list">
          <view 
            class="influencer-item" 
            v-for="influencer in influencers" 
            :key="influencer.id"
            @click="handleInfluencerClick(influencer)"
          >
            <image :src="influencer.avatar" class="influencer-avatar" />
            <view class="influencer-info">
              <text class="influencer-name">{{ influencer.name }}</text>
              <text class="influencer-desc">{{ influencer.description }}</text>
              <text class="influencer-followers">{{ influencer.followers }}万粉丝</text>
            </view>
            <view class="follow-btn">
              <text class="follow-text">关注</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Topic {
  id: string
  name: string
  cover: string
  count: number
}

interface Brand {
  id: string
  name: string
  logo: string
}

interface Product {
  id: string
  title: string
  image: string
  price: number
  originalPrice: number
}

interface Influencer {
  id: string
  name: string
  avatar: string
  description: string
  followers: number
}

const navbarHeight = ref(88)
const hotTopics = ref<Topic[]>([])
const brands = ref<Brand[]>([])
const products = ref<Product[]>([])
const influencers = ref<Influencer[]>([])

const handleTopicClick = (topic: Topic) => {
  uni.navigateTo({
    url: `/pages/topic/index?id=${topic.id}`
  })
}

const handleBrandClick = (brand: Brand) => {
  uni.navigateTo({
    url: `/pages/brand/index?id=${brand.id}`
  })
}

const handleProductClick = (product: Product) => {
  uni.navigateTo({
    url: `/pages/product/index?id=${product.id}`
  })
}

const handleInfluencerClick = (influencer: Influencer) => {
  uni.navigateTo({
    url: `/pages/profile/index?id=${influencer.id}`
  })
}

const loadData = () => {
  // 模拟热门话题数据
  hotTopics.value = Array.from({ length: 6 }, (_, index) => ({
    id: `topic_${index}`,
    name: `热门话题${index + 1}`,
    cover: `https://picsum.photos/200/120?random=topic${index}`,
    count: Math.floor(Math.random() * 100) + 10
  }))

  // 模拟品牌数据
  brands.value = Array.from({ length: 8 }, (_, index) => ({
    id: `brand_${index}`,
    name: `品牌${index + 1}`,
    logo: `https://picsum.photos/80/80?random=brand${index}`
  }))

  // 模拟商品数据
  products.value = Array.from({ length: 6 }, (_, index) => ({
    id: `product_${index}`,
    title: `热门商品${index + 1} 超值推荐`,
    image: `https://picsum.photos/160/160?random=product${index}`,
    price: Math.floor(Math.random() * 500) + 50,
    originalPrice: Math.floor(Math.random() * 800) + 200
  }))

  // 模拟达人数据
  influencers.value = Array.from({ length: 5 }, (_, index) => ({
    id: `influencer_${index}`,
    name: `达人${index + 1}`,
    avatar: `https://picsum.photos/60/60?random=influencer${index}`,
    description: `分享生活中的美好时刻`,
    followers: Math.floor(Math.random() * 100) + 10
  }))
}

onMounted(() => {
  loadData()
  
  // 获取系统信息计算导航栏高度
  const systemInfo = uni.getSystemInfoSync()
  navbarHeight.value = (systemInfo.statusBarHeight || 0) + 44
})
</script>

<style lang="scss" scoped>
.discovery-page {
  height: 100vh;
  background: #f8f8f8;

  .content {
    padding-bottom: 40rpx;

    .section {
      margin-bottom: 40rpx;
      background: #fff;

      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 32rpx 24rpx 24rpx;

        .section-title {
          font-size: 32rpx;
          font-weight: 600;
          color: #333;
        }

        .section-more {
          font-size: 24rpx;
          color: #999;
        }
      }

      .topics-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20rpx;
        padding: 0 24rpx 32rpx;

        .topic-item {
          display: flex;
          align-items: center;
          background: #f8f8f8;
          border-radius: 16rpx;
          padding: 20rpx;

          .topic-cover {
            width: 80rpx;
            height: 80rpx;
            border-radius: 12rpx;
            margin-right: 20rpx;
          }

          .topic-info {
            flex: 1;

            .topic-name {
              display: block;
              font-size: 28rpx;
              font-weight: 600;
              color: #333;
              margin-bottom: 8rpx;
            }

            .topic-count {
              font-size: 22rpx;
              color: #999;
            }
          }
        }
      }

      .brands-scroll {
        white-space: nowrap;
        padding: 0 24rpx 32rpx;

        .brand-item {
          display: inline-block;
          text-align: center;
          margin-right: 32rpx;
          vertical-align: top;

          .brand-logo {
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            margin-bottom: 12rpx;
          }

          .brand-name {
            display: block;
            font-size: 22rpx;
            color: #333;
            width: 80rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .products-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20rpx;
        padding: 0 24rpx 32rpx;

        .product-item {
          .product-image {
            width: 100%;
            height: 320rpx;
            border-radius: 12rpx;
            margin-bottom: 16rpx;
          }

          .product-info {
            .product-title {
              display: block;
              font-size: 26rpx;
              color: #333;
              margin-bottom: 12rpx;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }

            .product-price {
              display: flex;
              align-items: baseline;

              .price-symbol {
                font-size: 20rpx;
                color: #ff2442;
                margin-right: 4rpx;
              }

              .price-value {
                font-size: 28rpx;
                font-weight: 600;
                color: #ff2442;
                margin-right: 12rpx;
              }

              .price-original {
                font-size: 22rpx;
                color: #999;
                text-decoration: line-through;
              }
            }
          }
        }
      }

      .influencers-list {
        padding: 0 24rpx 32rpx;

        .influencer-item {
          display: flex;
          align-items: center;
          padding: 24rpx 0;
          border-bottom: 1rpx solid #f0f0f0;

          &:last-child {
            border-bottom: none;
          }

          .influencer-avatar {
            width: 120rpx;
            height: 120rpx;
            border-radius: 50%;
            margin-right: 24rpx;
          }

          .influencer-info {
            flex: 1;

            .influencer-name {
              display: block;
              font-size: 28rpx;
              font-weight: 600;
              color: #333;
              margin-bottom: 8rpx;
            }

            .influencer-desc {
              display: block;
              font-size: 24rpx;
              color: #666;
              margin-bottom: 8rpx;
            }

            .influencer-followers {
              font-size: 22rpx;
              color: #999;
            }
          }

          .follow-btn {
            background: #ff2442;
            border-radius: 40rpx;
            padding: 16rpx 32rpx;

            .follow-text {
              font-size: 24rpx;
              color: #fff;
            }
          }
        }
      }
    }
  }

  .nav-icon {
    font-size: 40rpx;
    color: #333;
  }
}
</style>