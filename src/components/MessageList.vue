<script setup>
import { storeToRefs } from 'pinia'
import { useMessageStore } from '../stores/messageStore.js'
import systemAvatar from '../assets/system-avatar.svg'

const messageStore = useMessageStore()
const { messages, isReceiving } = storeToRefs(messageStore)

function isImage(file) {
  return file.fileType.startsWith('image/')
}
</script>

<template>
  <div class="flex flex-col space-y-4">
    <transition-group name="message">
      <div
        v-for="message in messages"
        :key="message.id"
        class="flex"
        :class="[message.type === 'user' ? 'justify-end' : 'justify-start']"
      >
        <img v-if="message.sender === 'System'" :src="systemAvatar" alt="System Avatar" class="w-10 h-10 rounded-full">
        <div
          class="max-w-[75%] rounded-lg p-2"
          :class="[message.type === 'user' ? 'bg-blue-100' : 'bg-gray-100']"
        >
          <div v-if="message.content" class="mb-1">
            {{ message.content }}
          </div>
          <div v-if="message.files && message.files.length > 0">
            <div v-for="file in message.files" :key="file.url">
              <img v-if="isImage(file)" :src="file.url" :alt="file.filename" class="w-full h-auto">
              <a v-else :href="file.url" target="_blank" class="text-blue-500 hover:underline">
                {{ file.filename }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
    <transition name="fade">
      <div v-if="isReceiving" class="flex justify-start">
        <div class="max-w-[75%] rounded-lg p-2 bg-gray-100">
          <div class="animate-pulse">
            正在输入...
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.message-enter-active,
.message-leave-active {
  transition: all 0.5s ease;
}
.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
