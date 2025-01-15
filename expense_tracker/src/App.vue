<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from "@/components/IncomeExpenses.vue";
import TransactionList from "@/components/TransactionList.vue";
import AddTransaction from "@/components/AddTransaction.vue";

import {ref} from "vue";
import { computed } from 'vue'; // In Java, it is lambda expression
import { useToast}  from "vue-toastification";
import { onMounted } from 'vue'; // The moment the website is loaded, this will be executed


onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));

  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
})

const transactions = ref([
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

const toast = useToast()
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    text:   transactionData.text,
    amount: transactionData.amount
  });

  saveTransactionsToLocalStorage();

  toast.success('Transaction added');
}

const generateUniqueId = () => {
  return Math.floor(Math.random() * 100000000);
}

const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter(transaction => transaction.id !== id);

  toast.success('Transaction deleted');
}

// Save transactions to local storage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value)); // note transactions.value is an array
}
</script>

<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
    <IncomeExpenses :income=income :expenses=expenses />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted"/>
  </div>
</template>