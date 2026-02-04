<template>
  <div>
    <OpcionRespuesta v-for="opcion in opciones" :key="opcion.texto" :texto="opcion.texto" :correcta="opcion.correcta" @seleccion="emit('respuesta', $event)"
    />
  </div>
</template>

<script setup>
import OpcionRespuesta from './OpcionRespuesta.vue'

defineProps({
  opciones: Array
})

const emit = defineEmits(['respuesta'])
</script>
