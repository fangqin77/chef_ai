<template>
  <view class="full-bg">
    <image class="bg" src="/static/home-bg.jpg" mode="aspectFill" />
  </view>
</template>

<script>
export default {};
</script>

<style>
.full-bg {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>