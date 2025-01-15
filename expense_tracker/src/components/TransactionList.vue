<script setup>

import { defineProps } from 'vue';
import { defineEmits } from 'vue';

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  },
})

// In Vanilla JS, this is equivalent to the following:
// const deleteTransaction = (id) => {
//   const event = new CustomEvent('deleteTransaction', { detail: id });
//   document.dispatchEvent(event);
// }

const emit = defineEmits(['transactionDeleted'])
const deleteTransaction = (id) => {
  emit('transactionDeleted', id)
}
</script>

<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li v-for="transaction in transactions" :key="transaction.id" :class="transaction.amount > 0 ? 'plus' : 'minus'">
            {{ transaction.text }} <span>₱ {{ transaction.amount }}</span><button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
    </li>
  </ul>
</template>