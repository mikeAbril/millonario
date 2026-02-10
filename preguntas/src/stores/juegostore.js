import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { preguntas } from '../data/preguntas.js'
import { useQuasar } from 'quasar'

export const useJuegoStore = defineStore('juego', () => {
  const $q = useQuasar()
  
  // Estado
  const numeroPregunta = ref(0)
  const opcionesOcultas = ref([])
  const comodinesUsados = ref({
    cincuentaCincuenta: false,
    audiencia: false,
    llamarAmigo: false
  })

  // Getters
  const preguntaActual = computed(() => {
    return preguntas[numeroPregunta.value]
  })

  const opcionesVisibles = computed(() => {
    return preguntaActual.value.opciones.map((opcion, index) => ({
      ...opcion,
      oculta: opcionesOcultas.value.includes(index)
    }))
  })

  // Actions
  function siguientePregunta() {
    if (numeroPregunta.value < preguntas.length - 1) {
      numeroPregunta.value++
      opcionesOcultas.value = []
    } else {
      console.log("¡Ganaste!")
    }
  }

  function handleComodin50() {
    if (comodinesUsados.value.cincuentaCincuenta) return

    const incorrectas = preguntaActual.value.opciones
      .map((op, idx) => ({ ...op, index: idx }))
      .filter(op => !op.correcta)
    
    const paraOcultar = []
    while (paraOcultar.length < 2 && incorrectas.length > 0) {
      const randomIndex = Math.floor(Math.random() * incorrectas.length)
      paraOcultar.push(incorrectas[randomIndex].index)
      incorrectas.splice(randomIndex, 1)
    }
    
    opcionesOcultas.value = paraOcultar
    comodinesUsados.value.cincuentaCincuenta = true
  }

  function handleComodinAudiencia() {
    if (comodinesUsados.value.audiencia) return

    const correctaIndex = preguntaActual.value.opciones.findIndex(op => op.correcta)
    const porcentaje = Math.floor(60 + Math.random() * 30)
    const letra = ['A', 'B', 'C', 'D'][correctaIndex]
    
    comodinesUsados.value.audiencia = true
    
    $q.dialog({
      title: '🎭 La Audiencia ha Votado',
      message: `El <strong>${porcentaje}%</strong> de la audiencia votó por la opción <strong>${letra}</strong>`,
      html: true,
      color: 'deep-purple',
      persistent: false,
      ok: {
        label: 'Entendido',
        color: 'deep-purple',
        unelevated: true,
        rounded: true
      },
      class: 'dialog-audiencia'
    })
  }

  function handleComodinAmigo() {
    if (comodinesUsados.value.llamarAmigo) return

    const correctaIndex = preguntaActual.value.opciones.findIndex(op => op.correcta)
    const letra = ['A', 'B', 'C', 'D'][correctaIndex]
    
    comodinesUsados.value.llamarAmigo = true
    
    $q.dialog({
      title: '📞 Llamando a un Amigo...',
      message: `"Hmm... no estoy 100% seguro, pero creo que la respuesta es la <strong>${letra}</strong>"`,
      html: true,
      color: 'amber',
      persistent: false,
      ok: {
        label: 'Gracias amigo!',
        color: 'amber',
        unelevated: true,
        rounded: true,
        icon: 'phone'
      },
      class: 'dialog-amigo'
    })
  }

  function reiniciarJuego() {
    numeroPregunta.value = 0
    opcionesOcultas.value = []
    comodinesUsados.value = {
      cincuentaCincuenta: false,
      audiencia: false,
      llamarAmigo: false
    }
  }

  return {
    numeroPregunta,
    opcionesOcultas,
    comodinesUsados,
    preguntaActual,
    opcionesVisibles,
    siguientePregunta,
    handleComodin50,
    handleComodinAudiencia,
    handleComodinAmigo,
    reiniciarJuego
  }
}, {

    /*persistenciaaaaaaaaaaaaa*/
  persist: {
    key: 'juego-millonario',
    storage: localStorage,
    paths: ['numeroPregunta', 'opcionesOcultas', 'comodinesUsados']
  }



})