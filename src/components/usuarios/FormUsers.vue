<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const name = ref('')
const email = ref('')
const userId = ref(null)

const isEditing = ref(false)

onMounted(async () => {
  try {
    if (route.params.id) {
      isEditing.value = true
      const user = userStore.users.find((u) => u.id === route.params.id)
      if (user) {
        name.value = user.name
        email.value = user.email
        userId.value = user.id
      }
    }
  } catch {
    console.error('Error al traer los datos')
  }
})

const submitForm = async () => {
  const user = { name: name.value, email: email.value }
  try {
    await userStore.addUser(user)

    router.push('/')
  } catch {
    console.error('Error al guardar los datos')
  }
}
</script>

<template>
  <div class="row mx-5 d-flex justify-content-sart">
    <form @submit.prevent="submitForm" class="col-md-8 mb-4 p-4 border rounded p-4">
      <div class="mb-3">
        <label for="name" class="col-form-label">Nombre</label>
        <input
          v-model="name"
          type="text"
          id="name"
          required
          class="form-control"
          placeholder="Ingresa nombre de usuario"
        />
      </div>

      <div class="mb-5">
        <label for="email" class="col-form-label">Correo</label>
        <input
          v-model="email"
          type="email"
          id="email"
          required
          class="form-control"
          placeholder="nombre@correo.com"
        />
      </div>

      <div class="d-grid">
        <button class="btn btn-primary" type="submit">
          {{ 'Crear' }}
        </button>
      </div>
    </form>
  </div>
</template>
