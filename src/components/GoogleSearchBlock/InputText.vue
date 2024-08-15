<script setup lang="ts">
import { ref } from 'vue'

const searchText = ref('')
</script>

<template>
  <div>
    <input v-model="searchText" type="text">
  </div>
</template>

<style scoped>

</style>
