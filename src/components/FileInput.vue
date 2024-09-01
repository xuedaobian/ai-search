<script setup>
import { ref } from 'vue'

const emit = defineEmits(['filesSelected'])
const fileNames = ref([])

function handleFileChange(event) {
  const files = Array.from(event.target.files)
  if (files.length > 0) {
    fileNames.value = files.map(file => file.name)
    emit('filesSelected', files)
  }
}
</script>

<template>
  <div>
    <label class="cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded inline-flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
      <input
        type="file"
        class="hidden"
        accept="image/*,.pdf,.doc,.docx,.txt"
        multiple
        @change="handleFileChange"
      >
    </label>
  </div>
</template>
