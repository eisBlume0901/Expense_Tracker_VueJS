<script setup>
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpenses from "@/components/IncomeExpenses.vue";
import TransactionList from "@/components/TransactionList.vue";
import AddTransaction from "@/components/AddTransaction.vue";

import {ref} from "vue";
import { computed } from 'vue' // In Java, it is lambda expression

const transactions = ref([
  { id: 1, text: 'Flower', amount: -25 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
])

// transaction.value pertains to the array not the amount
// look at Console tab in DevTools to see the value of transaction.value
const total = computed(() => {
  // acc is short for accumulator
  return transactions.value
      .reduce((acc, transaction) => (acc += transaction.amount), 0)
})

const income = computed( () => {
  return parseFloat(transactions.value
      .filter(transaction => transaction.amount > 0)
      .reduce((acc, transaction) => (acc += transaction.amount), 0)
      .toFixed(2)) //  setting two decimal placees
})

const expenses = computed( () => {
  return parseFloat(transactions.value
      .filter(transaction => transaction.amount < 0)
      .reduce((acc, transaction) => (acc += Math.abs(transaction.amount)), 0)
      .toFixed(2)) //  setting two decimal places
})

const handleTransactionSubmitted = (transactionData) => {
  console.log(transactionData);
}
</script>

<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
    <IncomeExpenses :income=income :expenses=expenses />
    <TransactionList :transactions="transactions" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted"/>
  </div>
</template>