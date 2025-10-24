<template>
  <view class="flex gap-2 p-2">
    <view class="flex-1 flex flex-col gap-2">
      <slot name="left"></slot>
    </view>
    <view class="flex-1 flex flex-col gap-2">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script setup lang="ts"></script>
