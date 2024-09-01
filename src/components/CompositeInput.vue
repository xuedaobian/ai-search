<script setup>
import { computed, ref, watch } from 'vue'
import FileInput from './FileInput.vue'
import ImagePreview from './ImagePreview.vue'

import { useMessageStore } from '@/stores/messageStore.js'
import { mockFileUpload } from '@/services/mockFileUpload.js'

const inputText = ref('')
const selectedFiles = ref([])
const messageStore = useMessageStore()

const imageFiles = computed(() => {
  return selectedFiles.value.filter(file => file.file.type.startsWith('image/'))
})

const isUploading = computed(() => {
  return selectedFiles.value.some(file => file.uploadStatus === 'uploading')
})

const canSendMessage = computed(() => {
  return (inputText.value.trim() || selectedFiles.value.length > 0)
    && !isUploading.value
    && selectedFiles.value.every(file => file.uploadStatus === 'completed')
})

function handleFilesSelected(files) {
  const newFiles = files.map(file => ({
    file,
    uploadStatus: 'pending',
    progress: 0,
  }))
  selectedFiles.value = [...selectedFiles.value, ...newFiles]
  newFiles.forEach(uploadFile)
}

async function uploadFile(fileObj) {
  fileObj.uploadStatus = 'uploading'
  fileObj.progress = 0 // 初始化进度
  try {
    const uploadPromise = mockFileUpload(fileObj.file, (progress) => {
      fileObj.progress = progress // 更新进度
    })
    fileObj.cancelUpload = uploadPromise.cancel
    await uploadPromise
    fileObj.uploadStatus = 'completed'
    fileObj.progress = 100 // 确保完成时进度为100
  }
  catch (error) {
    console.error('File upload failed:', error)
    fileObj.uploadStatus = 'error'
  }
  finally {
    delete fileObj.cancelUpload
  }
}

function removeFile(index) {
  const fileObj = selectedFiles.value[index]
  if (fileObj.uploadStatus === 'uploading' && fileObj.cancelUpload) {
    fileObj.cancelUpload()
  }
  selectedFiles.value.splice(index, 1)
}

async function sendMessage() {
  if (canSendMessage.value) {
    const message = {
      id: Date.now(),
      content: inputText.value,
      files: selectedFiles.value.map(fileObj => ({
        name: fileObj.file.name,
        type: fileObj.file.type,
        // Add any other necessary file information
      })),
      type: 'user',
      sender: 'User',
    }

    messageStore.addMessage(message)

    // Clear input and reset state
    inputText.value = ''
    selectedFiles.value = []
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-2">
      <FileInput class="mr-2" @files-selected="handleFilesSelected" />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        :disabled="!canSendMessage"
        @click="sendMessage"
      >
        {{ isUploading ? '上传中...' : '发送' }}
      </button>
    </div>
    <div class="relative">
      <textarea
        v-model="inputText"
        placeholder="输入消息..."
        class="w-full p-2 pr-10 border border-gray-300 rounded min-h-[80px] resize-none"
        rows="3"
      />
    </div>
    <div v-if="imageFiles.length > 0" class="mt-2">
      <ImagePreview :files="imageFiles" @remove="removeFile" />
    </div>
  </div>
</template>
