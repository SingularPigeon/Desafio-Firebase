<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRoute, useRouter } from 'vue-router'

// Iniciar store usuarios
const userStore = useUserStore()
// Obtenemos los parámetros de la ruta actual
const route = useRoute()
// Iniciar el router
const router = useRouter()

const name = ref('') // guarda en nombre del usuario
const email = ref('') // guarda el correo del usuario
const userId = ref(null) // guarde el ID del usuario en caso de editarlo
const isEditing = ref(false) // indica si el formulario está editando

onMounted(() => {
  if (route.params.id) {
    isEditing.value = true // si se edita un usuario lo busca en el userStore
    const user = userStore.users.find((u) => u.id === route.params.id)
    // si encientra el usuario llena el formulario con los datos para editar
    if (user) {
      name.value = user.name
      email.value = user.email
      userId.value = user.id
    }
  }
})

const submitForm = async () => {
  // creación del usuario como objeto
  const user = { name: name.value, email: email.value }
  try {
    // si se está editando se actualisca el usuario
    if (isEditing.value) {
      await userStore.updateUser(userId.value, user)
    } else {
      // si no se está editando se crea el usuario
      await userStore.addUser(user)
    }
    // redirige a la ruta principal
    router.push('/')
  } catch (error) {
    console.error('Error al guardar los datos')
  }
}
// función para cancelar la edición y regresar a la página principal
const cancelEdit = () => {
  router.push('/')
}
</script>

<template>
  <h2>{{ isEditing ? 'Editar Usuario' : '' }}</h2>
  <form @submit.prevent="submitForm" class="mb-4 p-4">
    <div class="mb-3">
      <label for="name" class="form-label">Nombre:</label>
      <input
        v-model="name"
        type="text"
        id="name"
        required
        class="form-control"
        placeholder="Ingresa el nombre del usuario"
      />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Correo:</label>
      <input
        v-model="email"
        type="email"
        id="email"
        required
        class="form-control"
        placeholder="nombre@correo.com"
      />
    </div>
    <div class="d-grid gap-2 d-md-block">
      <button class="btn btn-primary mx-1" type="submit">
        {{ isEditing ? 'Actualizar' : 'Crear' }}
      </button>
      <button class="btn btn-light mx-1" type="button" @click="cancelEdit">Cancelar</button>
    </div>
  </form>
</template>
