<template>
  <div class="fondo">
    <!-- Partículas animadas -->
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
    
    <div class="logo-container">
      <div class="logo-wrapper">
        <img 
          src="../assets/logonobg.png" 
          alt="Logo Millonario" 
          class="logo"
          @click="jugar"
        />
        <span class="jugar-text">JUGAR</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const audioReproducido = ref(false)

// 🔒 audio único (NO se recrea)
let audioBienvenidos = null

function reproducirBienvenidos() {
  if (audioBienvenidos) return

  audioBienvenidos = new Audio(
    new URL('../assets/bienvenidos.mp3', import.meta.url).href
  )

  audioBienvenidos.play().catch(err => {
    console.log('Error al reproducir bienvenidos.mp3:', err)
  })
}

function jugar() {
  if (audioReproducido.value) return

  audioReproducido.value = true
  reproducirBienvenidos()

  router.push('/juego')
}
</script>

<style scoped>
.fondo {
  background: radial-gradient(ellipse at center, #1a0b3a 0%, #0a0520 50%, #000000 100%);
  
  width: 100vw;
  height: 100vh;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  overflow: hidden;
  margin: 0;
  padding: 0;
  position: relative;
}

/* Efecto de nebulosa */
.fondo::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(ellipse at 20% 30%, rgba(138, 43, 226, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(0, 191, 255, 0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(255, 105, 180, 0.2) 0%, transparent 60%);
  animation: nebula 20s ease-in-out infinite alternate;
  z-index: 1;
}

@keyframes nebula {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(-5%, 5%) scale(1.1);
  }
}

/* Partículas - Estrellas pequeñas rápidas */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 2;
}

.stars::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background: white;
  box-shadow: 
    5vw 10vh white, 15vw 5vh white, 25vw 15vh white, 35vw 8vh white, 45vw 20vh white,
    55vw 25vh white, 65vw 12vh white, 75vw 30vh white, 85vw 18vh white, 95vw 35vh white,
    8vw 40vh white, 18vw 45vh white, 28vw 38vh white, 38vw 50vh white, 48vw 42vh white,
    58vw 55vh white, 68vw 48vh white, 78vw 60vh white, 88vw 52vh white, 98vw 65vh white,
    3vw 70vh white, 13vw 75vh white, 23vw 68vh white, 33vw 80vh white, 43vw 72vh white,
    53vw 85vh white, 63vw 78vh white, 73vw 90vh white, 83vw 82vh white, 93vw 95vh white,
    10vw 22vh white, 20vw 32vh white, 30vw 62vh white, 40vw 88vh white, 50vw 28vh white,
    60vw 58vh white, 70vw 8vh white, 80vw 38vh white, 90vw 68vh white, 12vw 78vh white,
    22vw 18vh white, 32vw 48vh white, 42vw 88vh white, 52vw 8vh white, 62vw 38vh white,
    72vw 68vh white, 82vw 28vh white, 92vw 58vh white, 2vw 48vh white, 96vw 18vh white;
  animation: float 50s linear infinite;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(-100vh) translateX(10vw);
  }
}

/* Partículas medianas más lentas */
.stars2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.stars2::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 3px;
  background: rgba(135, 206, 250, 0.8);
  box-shadow: 
    12vw 15vh rgba(135, 206, 250, 0.8), 24vw 35vh rgba(135, 206, 250, 0.8),
    36vw 25vh rgba(135, 206, 250, 0.8), 48vw 55vh rgba(135, 206, 250, 0.8),
    60vw 45vh rgba(135, 206, 250, 0.8), 72vw 65vh rgba(135, 206, 250, 0.8),
    84vw 15vh rgba(135, 206, 250, 0.8), 96vw 75vh rgba(135, 206, 250, 0.8),
    8vw 85vh rgba(135, 206, 250, 0.8), 16vw 5vh rgba(135, 206, 250, 0.8),
    28vw 95vh rgba(135, 206, 250, 0.8), 40vw 35vh rgba(135, 206, 250, 0.8),
    52vw 75vh rgba(135, 206, 250, 0.8), 64vw 25vh rgba(135, 206, 250, 0.8),
    76vw 85vh rgba(135, 206, 250, 0.8), 88vw 45vh rgba(135, 206, 250, 0.8),
    4vw 55vh rgba(135, 206, 250, 0.8), 20vw 65vh rgba(135, 206, 250, 0.8),
    32vw 5vh rgba(135, 206, 250, 0.8), 44vw 95vh rgba(135, 206, 250, 0.8),
    56vw 15vh rgba(135, 206, 250, 0.8), 68vw 85vh rgba(135, 206, 250, 0.8),
    80vw 35vh rgba(135, 206, 250, 0.8), 92vw 55vh rgba(135, 206, 250, 0.8),
    14vw 75vh rgba(135, 206, 250, 0.8), 26vw 45vh rgba(135, 206, 250, 0.8);
  animation: float2 80s linear infinite;
}

@keyframes float2 {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(-100vh) translateX(-15vw);
  }
}

/* Partículas grandes brillantes */
.stars3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.stars3::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 4px;
  background: rgba(186, 85, 211, 0.9);
  border-radius: 50%;
  box-shadow: 
    10vw 20vh 2px rgba(186, 85, 211, 0.9),
    30vw 40vh 2px rgba(186, 85, 211, 0.9),
    50vw 60vh 2px rgba(186, 85, 211, 0.9),
    70vw 80vh 2px rgba(186, 85, 211, 0.9),
    90vw 10vh 2px rgba(186, 85, 211, 0.9),
    20vw 70vh 2px rgba(186, 85, 211, 0.9),
    40vw 30vh 2px rgba(186, 85, 211, 0.9),
    60vw 90vh 2px rgba(186, 85, 211, 0.9),
    80vw 50vh 2px rgba(186, 85, 211, 0.9),
    15vw 85vh 2px rgba(186, 85, 211, 0.9),
    35vw 15vh 2px rgba(186, 85, 211, 0.9),
    55vw 45vh 2px rgba(186, 85, 211, 0.9),
    75vw 75vh 2px rgba(186, 85, 211, 0.9),
    95vw 25vh 2px rgba(186, 85, 211, 0.9),
    5vw 55vh 2px rgba(186, 85, 211, 0.9),
    25vw 95vh 2px rgba(186, 85, 211, 0.9),
    45vw 5vh 2px rgba(186, 85, 211, 0.9),
    65vw 35vh 2px rgba(186, 85, 211, 0.9),
    85vw 65vh 2px rgba(186, 85, 211, 0.9),
    12vw 42vh 2px rgba(186, 85, 211, 0.9);
  animation: float3 100s linear infinite, twinkle 3s ease-in-out infinite;
}

@keyframes float3 {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(-100vh) translateX(20vw);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.logo-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.logo-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.logo {
  width: 1000px;
  height: auto;
  max-width: 90%;
  object-fit: contain;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50%;
  position: relative;
  z-index: 2;
}

.logo:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.6))
          drop-shadow(0 0 60px rgba(255, 215, 0, 0.4))
          drop-shadow(0 0 90px rgba(255, 215, 0, 0.2));
}

.jugar-text {
  font-size: 3rem;
  font-weight: bold;
  color: #FFD700;
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.6),
    0 0 30px rgba(255, 215, 0, 0.4);
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  pointer-events: none;
  letter-spacing: 4px;
}

.logo-wrapper:hover .jugar-text {
  opacity: 1;
  transform: translateY(0);
}
</style>