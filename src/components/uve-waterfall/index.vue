<template>
  <view class="waterfall-container">
    <view class="waterfall-left">
      <slot name="left"></slot>
    </view>
    <view class="waterfall-right">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<style scoped>
.waterfall-container {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 0 8px;
  gap: 8px;
}

.waterfall-left,
.waterfall-right {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  max-width: 50%;
  box-sizing: border-box;
  overflow: hidden;
}
</style>

<script setup lang="ts"></script>
