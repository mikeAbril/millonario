<template>
  <div class="barra-puntaje" :class="{ 'abierta': isOpen }">
    <!-- Botón de toggle -->
    <button class="toggle-btn" @click="toggleBarra">
      <svg 
        class="flecha" 
        :class="{ 'rotada': isOpen }" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      <span class="texto-toggle">PUNTAJE</span>
    </button>

    <!-- Contenido de la barra -->
    <div class="contenido-puntaje">
      <h3 class="titulo">Escalera del Millón</h3>
      
      <div class="lista-niveles">
        <div 
          v-for="(pregunta, index) in preguntasReversa" 
          :key="index"
          class="nivel-item"
          :class="{
            'actual': index === (preguntas.length - 1 - preguntaActual),
            'completado': index > (preguntas.length - 1 - preguntaActual)
          }"
        >
          <div class="numero-nivel">{{ preguntas.length - index }}</div>
          <div class="info-nivel">
            <div class="nivel-texto">Nivel {{ pregunta.nivel }}</div>
            <div class="premio">{{ getPremio(preguntas.length - index) }}</div>
          </div>
          <div v-if="index === (preguntas.length - 1 - preguntaActual)" class="indicador-actual">
            ▶
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { preguntas } from '../data/preguntas.js'

const props = defineProps({
  preguntaActual: {
    type: Number,
    default: 0
  }
})

const isOpen = ref(false)

// Invertir el orden de las preguntas para mostrar del 20 al 1
const preguntasReversa = computed(() => {
  return [...preguntas].reverse()
})

function toggleBarra() {
  isOpen.value = !isOpen.value
}

function getPremio(numeroPregunta) {
  const premios = {
    1: '$100',
    2: '$200',
    3: '$500',
    4: '$1,000',
    5: '$2,000',
    6: '$5,000',
    7: '$10,000',
    8: '$20,000',
    9: '$50,000',
    10: '$100,000',
    11: '$200,000',
    12: '$300,000',
    13: '$500,000',
    14: '$750,000',
    15: '$1,000,000',
    16: '$2,000,000',
    17: '$3,000,000',
    18: '$5,000,000',
    19: '$10,000,000',
    20: '$50,000,000'
  }
  return premios[numeroPregunta] || '$0'
}
</script>

<style scoped>
.barra-puntaje {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 60px;
  background: linear-gradient(135deg, 
    rgba(26, 11, 58, 0.95) 0%, 
    rgba(10, 5, 32, 0.95) 100%);
  backdrop-filter: blur(10px);
  border-right: 2px solid rgba(255, 215, 0, 0.3);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  box-shadow: 0 0 30px rgba(138, 43, 226, 0.3);
  overflow: hidden;
}

.barra-puntaje.abierta {
  width: 320px;
}

.toggle-btn {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  height: 50px;
  background: rgba(255, 215, 0, 0.1);
  border: none;
  color: #FFD700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  padding: 0 15px;
}

.toggle-btn:hover {
  background: rgba(255, 215, 0, 0.2);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.flecha {
  transition: transform 0.3s ease;
  min-width: 24px;
  color: #FFD700;
}

.flecha.rotada {
  transform: rotate(180deg);
}

.texto-toggle {
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.barra-puntaje.abierta .texto-toggle {
  opacity: 1;
}

.contenido-puntaje {
  margin-top: 90px;
  padding: 0 15px 20px;
  height: calc(100vh - 90px);
  overflow-y: auto;
  opacity: 0;
  transition: opacity 0.3s ease 0.1s;
}

.barra-puntaje.abierta .contenido-puntaje {
  opacity: 1;
}

/* Scrollbar personalizado */
.contenido-puntaje::-webkit-scrollbar {
  width: 6px;
}

.contenido-puntaje::-webkit-scrollbar-track {
  background: rgba(255, 215, 0, 0.1);
  border-radius: 10px;
}

.contenido-puntaje::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.5);
  border-radius: 10px;
}

.titulo {
  color: #FFD700;
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  font-weight: bold;
}

.lista-niveles {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nivel-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
}

.nivel-item.actual {
  background: linear-gradient(135deg, 
    rgba(255, 215, 0, 0.3) 0%, 
    rgba(255, 215, 0, 0.1) 100%);
  border-color: #FFD700;
  box-shadow: 
    0 0 20px rgba(255, 215, 0, 0.4),
    inset 0 0 20px rgba(255, 215, 0, 0.2);
  transform: scale(1.05);
}

.nivel-item.completado {
  background: rgba(76, 175, 80, 0.2);
  border-color: rgba(76, 175, 80, 0.5);
}

.numero-nivel {
  min-width: 30px;
  height: 30px;
  background: rgba(255, 215, 0, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFD700;
  font-weight: bold;
  font-size: 14px;
}

.nivel-item.actual .numero-nivel {
  background: #FFD700;
  color: #1a0b3a;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
}

.nivel-item.completado .numero-nivel {
  background: rgba(76, 175, 80, 0.5);
  color: white;
}

.info-nivel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nivel-texto {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  font-weight: 500;
}

.nivel-item.actual .nivel-texto {
  color: #FFD700;
  font-weight: bold;
}

.premio {
  color: #FFD700;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
}

.nivel-item.actual .premio {
  font-size: 16px;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
}

.indicador-actual {
  color: #FFD700;
  font-size: 16px;
  animation: parpadeo 1s ease-in-out infinite;
}

@keyframes parpadeo {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
</style>