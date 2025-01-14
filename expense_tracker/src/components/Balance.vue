<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    required: true
  },
})
</script>

<template>
  <div class="balance">
    <h2>Your Balance</h2>
    <h3>₱ {{ total }}</h3>
  </div>
</template>