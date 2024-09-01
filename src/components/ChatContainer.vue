<script setup>
import MessageList from './MessageList.vue'
import CompositeInput from './CompositeInput.vue'
</script>

<template>
  <div class="max-w-full mx-auto p-4 flex flex-col h-screen">
    <h1 class="text-xl font-bold mb-4">
      聊天应用
    </h1>
    <MessageList class="flex-grow overflow-y-auto" />
    <CompositeInput class="mt-4" />
  </div>
</template>
