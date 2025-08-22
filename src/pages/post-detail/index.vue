<template>
	<view class="bg-white min-h-screen">
		<image v-if="post" :src="post.cover.url" mode="widthFix" class="w-full" />
		<view v-if="post" class="p-4">
			<view class="flex items-center">
				<image :src="post.author.avatar" class="w-10 h-10 rounded-full mr-3" mode="aspectFill" />
				<view class="flex-1">
					<text class="text-base font-500">{{ post.author.nickname }}</text>
					<view class="text-xs text-gray-500 mt-0.5">{{ friendlyTime }}</view>
				</view>
				<button class="btn btn-primary btn-round px-3 py-1 text-xs">关注</button>
			</view>
			<view class="mt-3 text-lg font-600 leading-snug">{{ post.title }}</view>
			<view class="mt-2 text-sm text-gray-700">{{ post.description }}</view>
			<view class="mt-3 flex text-sm text-gray-600">
				<view class="flex items-center mr-4" @click="handleLike">
					<text :class="['i-ri-heart-2-fill', post.liked ? 'text-red-500' : 'text-gray-400']"></text>
					<text class="ml-1">{{ formatCount(post.likesCount) }}</text>
				</view>
				<view class="flex items-center mr-4" @click="handleFavorite">
					<text :class="['i-ri-star-fill', post.favorited ? 'text-yellow-500' : 'text-gray-400']"></text>
					<text class="ml-1">{{ formatCount(post.favoritesCount) }}</text>
				</view>
				<view class="flex items-center" @click="share">
					<text class="i-ri-share-forward-line text-gray-400"></text>
					<text class="ml-1">分享</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed } from 'vue'
import { fetchPostDetail, toggleFavorite, toggleLike } from '@/api/feed'
import type { PostItem } from '@/types/feed'

const post = ref<PostItem>()

const friendlyTime = computed(() => {
	if (!post.value) return ''
	try {
		const d = new Date(post.value.createdAt)
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

const handleLike = async () => {
	if (!post.value) return
	const res = await toggleLike(post.value.id)
	if (res.success) post.value = { ...post.value, liked: res.data.liked, likesCount: res.data.likesCount }
}

const handleFavorite = async () => {
	if (!post.value) return
	const res = await toggleFavorite(post.value.id)
	if (res.success) post.value = { ...post.value, favorited: res.data.favorited, favoritesCount: res.data.favoritesCount }
}

const share = () => {
	// 简单分享示例
	uni.showShareImageMenu && uni.showShareImageMenu({ path: post.value?.cover.url || '' })
}

onLoad(async (options) => {
	const id = (options?.id as string) || '1'
	const res = await fetchPostDetail(id)
	if (res.success) post.value = res.data
})
</script>

<style scoped>
</style>