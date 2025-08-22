<template>
  <view class="waterfall-container">
    <view class="waterfall-column" v-for="(column, index) in columns" :key="index">
      <xhs-note-card
        v-for="note in column"
        :key="note.id"
        :note="note"
        @click="handleNoteClick"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

interface Author {
  id: string
  name: string
  avatar: string
}

interface Note {
  id: string
  title: string
  coverImage: string
  isVideo: boolean
  likes: number
  comments: number
  author: Author
  height?: number
}

interface Props {
  notes: Note[]
  columnCount?: number
  gap?: number
}

const props = withDefaults(defineProps<Props>(), {
  columnCount: 2,
  gap: 16
})

const emit = defineEmits<{
  noteClick: [note: Note]
}>()

const columns = ref<Note[][]>([])

// 初始化列
const initColumns = () => {
  columns.value = Array.from({ length: props.columnCount }, () => [])
}

// 分配笔记到列中（简单的轮询分配）
const distributeNotes = () => {
  initColumns()
  
  props.notes.forEach((note, index) => {
    const columnIndex = index % props.columnCount
    columns.value[columnIndex].push(note)
  })
}

const handleNoteClick = (note: Note) => {
  emit('noteClick', note)
}

watch(() => props.notes, distributeNotes, { immediate: true })

onMounted(() => {
  distributeNotes()
})
</script>

<style lang="scss" scoped>
.waterfall-container {
  display: flex;
  padding: 0 24rpx;
  gap: 16rpx;

  .waterfall-column {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>