<template>
  <h1>quien quiere ser millonario</h1>
    <q-btn push color="white" text-color="primary" label="Start game" @click="jugar"/>
</template>


<script setup>
 import { useRouter } from 'vue-router';
 const router = useRouter();

 function jugar(){
  router.push("/juego")
 }
</script>


<style scoped>
 
</style>
