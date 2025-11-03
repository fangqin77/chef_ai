<template>
  <a-space>
    <a-button size="small" type="primary" @click="$emit('approve')">通过</a-button>
    <a-button size="small" danger @click="$emit('reject')">驳回</a-button>
  </a-space>
</template>
<script setup lang="ts"></script>
