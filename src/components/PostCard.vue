<template>
	<view class="card rounded-lg overflow-hidden bg-white">
		<view class="relative w-full" :style="coverStyle">
			<image class="absolute inset-0 w-full h-full object-cover" :src="post.cover.url" mode="aspectFill" @click="goDetail" />
		</view>
		<view class="p-3">
			<view class="flex items-start">
				<image :src="post.author.avatar" class="w-8 h-8 rounded-full mr-2" mode="aspectFill" />
				<view class="flex-1">
					<text class="text-sm font-500 leading-tight">{{ post.author.nickname }}</text>
					<view class="text-xs text-gray-500 mt-0.5">{{ friendlyTime }}</view>
				</view>
			</view>
			<view class="mt-2">
				<text class="text-base ellipsis-2">{{ post.title }}</text>
			</view>
			<view class="mt-2 flex-between text-xs text-gray-600">
				<view class="flex items-center" @click="onLike">
					<text :class="['i-ri-heart-2-fill', post.liked ? 'text-red-500' : 'text-gray-400']"></text>
					<text class="ml-1">{{ formatCount(post.likesCount) }}</text>
				</view>
				<view class="flex items-center" @click="goDetail">
					<text class="i-ri-chat-3-line text-gray-400"></text>
					<text class="ml-1">{{ formatCount(post.commentsCount) }}</text>
				</view>
				<view class="flex items-center" @click="onFavorite">
					<text :class="['i-ri-star-fill', post.favorited ? 'text-yellow-500' : 'text-gray-400']"></text>
					<text class="ml-1">{{ formatCount(post.favoritesCount) }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PostItem } from '@/types/feed'

const props = defineProps<{ post: PostItem }>()
const emit = defineEmits<{ like: [postId: string]; favorite: [postId: string]; click: [postId: string] }>()

const coverStyle = computed(() => {
	const ratio = props.post.cover.height / props.post.cover.width
	const paddingBottom = Math.min(1.6, Math.max(1.0, ratio)) * 100
	return `padding-bottom:${paddingBottom}%;`
})

const friendlyTime = computed(() => {
	try {
		const d = new Date(props.post.createdAt)
		const diff = Date.now() - d.getTime()
		const m = Math.floor(diff / 60000)
		if (m < 1) return '刚刚'
		if (m < 60) return `${m} 分钟前`
		const h = Math.floor(m / 60)
		if (h < 24) return `${h} 小时前`
		const day = Math.floor(h / 24)
		return `${day} 天前`
	} catch {
		return ''
	}
})

const formatCount = (val: number) => {
	if (val >= 10000) return (val / 10000).toFixed(1) + 'w'
	if (val >= 1000) return (val / 1000).toFixed(1) + 'k'
	return String(val)
}

const onLike = () => emit('like', props.post.id)
const onFavorite = () => emit('favorite', props.post.id)
const goDetail = () => emit('click', props.post.id)
</script>

<style scoped lang="scss">
.card {
	/* 使用 unocss 的卡片预设类; 此处可覆盖 */
}
</style>