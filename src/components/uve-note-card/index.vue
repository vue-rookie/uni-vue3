<template>
  <view class="bg-white rounded-lg overflow-hidden shadow-sm mb-2" @click="handleClick">
    <view class="relative w-full">
      <image :src="note.cover" mode="widthFix" class="w-full block" />
      <view
        v-if="showTag && note.tags && note.tags.length > 0"
        class="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-12px"
      >
        {{ note.tags[0] }}
      </view>
    </view>
    <view class="p-2">
      <view class="text-sm leading-1.4 text-text overflow-hidden text-ellipsis line-clamp-2 mb-2">
        {{ note.title }}
      </view>
      <view class="flex items-center justify-between">
        <view class="flex items-center gap-1 flex-1 min-w-0">
          <image :src="note.author.avatar" class="w-20px h-20px rounded-full" />
          <text class="text-12px text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap">
            {{ note.author.name }}
          </text>
        </view>
        <view class="flex items-center gap-0.5">
          <text class="i-ri-heart-line text-14px text-text-secondary"></text>
          <text class="text-12px text-text-secondary">{{ formatLikes(note.likes) }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { NoteItem } from "@/types/xiaohongshu"

interface Props {
  note: NoteItem
  showTag?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showTag: true,
})

const emit = defineEmits<{
  click: [note: NoteItem]
}>()

const formatLikes = (count: number): string => {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}w`
  }
  return count.toString()
}

const handleClick = () => {
  emit("click", props.note)
}
</script>
