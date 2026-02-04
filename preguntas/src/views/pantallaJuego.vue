<template>
  <h1>foto del presentador petro jijija</h1>

  <Pregunta :texto="preguntaActual.texto" />

  <ListaRespuestas
    :opciones="preguntaActual.opciones"
    @respuesta="validarRespuesta"
  />



      <!-- MODAL GANAR -->
    <q-dialog v-model="modalGanar">
      <q-card>
        <q-card-section class="text-h6 text-center">
          🎉 ¡GANASTE!
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="primary" label="Ver Historial" @click="PantallaInicio" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- MODAL PERDER -->
    <q-dialog v-model="modalPerder">
      <q-card>
        <q-card-section class="text-h6 text-center">
          ❌ Perdiste <br />
          La palabra era: <b>{{ palabra }}</b>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="negative" label="siguiente" @click="PantallaInicio" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import Pregunta from '../components/Pregunta.vue'
import ListaRespuestas from '../components/ListaRespuestas.vue'
import { preguntas } from '../data/preguntas.js'
import PantallaInicio from './pantallaInicio.vue'

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
