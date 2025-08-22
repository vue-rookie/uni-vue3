<template>
	<view class="min-h-screen bg-gray-100">
		<scroll-view scroll-y class="h-screen" refresher-enabled :refresher-triggered="refreshing" @refresherrefresh="onRefresh" @scrolltolower="onLoadMore">
			<view class="px-2 pt-2">
				<view class="grid grid-cols-2 gap-2">
					<view>
						<post-card v-for="item in leftList" :key="item.id" :post="item" class="mb-2" @like="handleLike" @favorite="handleFavorite" @click="goDetail" />
					</view>
					<view>
						<post-card v-for="item in rightList" :key="item.id" :post="item" class="mb-2" @like="handleLike" @favorite="handleFavorite" @click="goDetail" />
					</view>
				</view>
				<view class="py-3 text-center text-xs text-gray-500" v-if="loadingMore">加载中...</view>
				<view class="py-3 text-center text-xs text-gray-400" v-else-if="isEnd">没有更多了</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PostCard from '@/components/PostCard.vue'
import { fetchFeedList, toggleFavorite, toggleLike } from '@/api/feed'
import type { PostItem } from '@/types/feed'

const pageNo = ref(1)
const pageSize = ref(10)
const list = ref<PostItem[]>([])
const refreshing = ref(false)
const loadingMore = ref(false)
const isEnd = ref(false)

const splitColumns = (items: PostItem[]) => {
	const left: PostItem[] = []
	const right: PostItem[] = []
	let leftHeight = 0
	let rightHeight = 0
	items.forEach((it) => {
		const ratio = it.cover.height / it.cover.width
		const h = Math.min(1.6, Math.max(1.0, ratio)) * 100
		if (leftHeight <= rightHeight) {
			left.push(it)
			leftHeight += h
		} else {
			right.push(it)
			rightHeight += h
		}
	})
	return { left, right }
}

const leftList = computed(() => splitColumns(list.value).left)
const rightList = computed(() => splitColumns(list.value).right)

const loadData = async (reset = false) => {
	if (reset) {
		pageNo.value = 1
		isEnd.value = false
	}
	if (isEnd.value || loadingMore.value) return
	loadingMore.value = true
	const res = await fetchFeedList({ pageNo: pageNo.value, pageSize: pageSize.value })
	if (res.success) {
		const data = res.data
		const items = data.list
		list.value = pageNo.value === 1 ? items : list.value.concat(items)
		isEnd.value = pageNo.value >= data.totalPages
		pageNo.value += 1
	}
	loadingMore.value = false
}

const onRefresh = async () => {
	refreshing.value = true
	await loadData(true)
	refreshing.value = false
}

const onLoadMore = async () => {
	await loadData()
}

const handleLike = async (postId: string) => {
	const idx = list.value.findIndex((p) => p.id === postId)
	if (idx !== -1) {
		const p = list.value[idx]
		const res = await toggleLike(postId)
		if (res.success) {
			list.value[idx] = { ...p, liked: res.data.liked, likesCount: res.data.likesCount }
		}
	}
}

const handleFavorite = async (postId: string) => {
	const idx = list.value.findIndex((p) => p.id === postId)
	if (idx !== -1) {
		const p = list.value[idx]
		const res = await toggleFavorite(postId)
		if (res.success) {
			list.value[idx] = { ...p, favorited: res.data.favorited, favoritesCount: res.data.favoritesCount }
		}
	}
}

const goDetail = (postId: string) => {
	uni.navigateTo({ url: `/pages/post-detail/index?id=${postId}` })
}

onMounted(() => {
	loadData(true)
})
</script>

<style scoped>
</style>