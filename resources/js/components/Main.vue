
<template>
    <Header></Header>
    <router-view></router-view>
</template>

<script setup>
import Header from './Header.vue';
import { onMounted } from "vue";
import { useAuthStore } from '../stores/useAuthStore.js';

const store = useAuthStore();

onMounted(() => {
    store.setUser();
});
</script>

<style>
</style>

