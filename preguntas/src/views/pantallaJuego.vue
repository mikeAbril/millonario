<template>
  <h1>foto del presentador petro jijija</h1>

  <barraPremio/>

  <comodines/>

  <Pregunta :texto="preguntaActual.texto" />

  <ListaRespuestas
    :opciones="preguntaActual.opciones"
    @respuesta="validarRespuesta"
  />



    
</template>

<script setup>
import { ref, computed } from 'vue'
import Pregunta from '../components/Pregunta.vue'
import ListaRespuestas from '../components/ListaRespuestas.vue'
import { preguntas } from '../data/preguntas.js'
import comodines from '../components/Comodines.vue'
import barraPremio from '../components/BarraPremio.vue'

const numeroPregunta = ref(0)

const preguntaActual = computed(() => {
  return preguntas[numeroPregunta.value]
})

function validarRespuesta(correcta) {
  if (correcta === true) {
    siguientePregunta()
  }else{
    console.log("respuesta Incorrrecta");
    
  }
}

function siguientePregunta(){
  if (numeroPregunta.value < preguntas.length -1) {
    numeroPregunta.value++
  }else{
    console.log("ganaste");
    
  }
}

</script>
