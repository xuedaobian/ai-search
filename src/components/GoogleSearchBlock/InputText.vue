<script setup lang="ts">
import { ref } from 'vue'

const searchText = ref('')
</script>

<template>
<div>
  <input type="text" v-model="searchText">
</div>
</template>

<style scoped>

</style>