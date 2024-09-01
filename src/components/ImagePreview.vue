<script setup>
import { computed, ref, toRef } from 'vue'

const props = defineProps({
  files: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['remove'])

const previewUrls = computed(() => {
  return props.files.map(fileObj => URL.createObjectURL(fileObj.file))
})

const enlargedIndex = ref(-1)
const zoomLevel = ref(1)

function toggleSize(index) {
  if (enlargedIndex.value === index) {
    enlargedIndex.value = -1
    zoomLevel.value = 1
  }
  else {
    enlargedIndex.value = index
    zoomLevel.value = 1
  }
}

function removeImage(index) {
  emit('remove', index)
}

function zoomIn() {
  zoomLevel.value = Math.min(zoomLevel.value + 0.1, 3)
}

function zoomOut() {
  zoomLevel.value = Math.max(zoomLevel.value - 0.1, 0.5)
}

function closeEnlarged() {
  enlargedIndex.value = -1
  zoomLevel.value = 1
}
// 创建对 fileObj.progress 的响应式引用
const fileProgresses = computed(() =>
  props.files.map(fileObj => toRef(fileObj, 'progress')),
)
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <div v-for="(fileObj, index) in files" :key="index" class="relative">
      <div class="w-20 h-20 relative">
        <img
          :src="previewUrls[index]"
          alt="Preview"
          class="w-full h-full object-cover cursor-zoom-in"
          @click="toggleSize(index)"
        >
        <div v-if="fileObj.uploadStatus !== 'completed'" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <svg class="w-12 h-12" viewBox="0 0 100 100">
            <circle
              class="text-gray-300"
              stroke-width="8"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            <circle
              class="text-blue-600"
              stroke-width="8"
              :stroke-dasharray="264"
              :stroke-dashoffset="264 - fileProgresses[index].value / 100 * 264"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
          </svg>
          <span class="absolute text-white">{{ Math.round(fileProgresses[index].value) }}%</span>
        </div>
      </div>
      <button
        class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
        @click.stop="removeImage(index)"
      >
        x
      </button>
    </div>
    <div v-if="enlargedIndex !== -1" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="relative w-full h-full flex items-center justify-center">
        <img
          :src="previewUrls[enlargedIndex]"
          alt="Preview"
          class="max-w-full max-h-full object-contain cursor-zoom-out"
          :style="{ transform: `scale(${zoomLevel})` }"
          @click="closeEnlarged"
        >
        <button
          class="absolute top-4 right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
          @click="closeEnlarged"
        >
          X
        </button>
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <button class="bg-white text-black px-2 py-1 rounded" @click="zoomOut">
            -
          </button>
          <button class="bg-white text-black px-2 py-1 rounded" @click="zoomIn">
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
