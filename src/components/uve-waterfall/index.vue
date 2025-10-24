<template>
  <view class="waterfall-container">
    <view class="waterfall-column">
      <slot name="left"></slot>
    </view>
    <view class="waterfall-column">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.waterfall-container {
  display: flex;
  gap: 8px;
  padding: 8px;
}

.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
