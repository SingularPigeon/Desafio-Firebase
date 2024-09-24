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
    if (isEditing.value) {
      await userStore.updateUser(userId.value, user)
    } else {
      await userStore.addUser(user)
    }

    router.push('/')
  } catch {
    console.error('Error al guardar los datos')
  }
}
</script>
<!-- src/components/UserForm.vue -->
<template>
  <div>
    <h2>{{ isEditing ? 'Edit User' : 'Create User' }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input v-model="name" type="text" id="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <button type="submit">{{ isEditing ? 'Update' : 'Submit' }}</button>
      <router-link v-if="isEditing" to="/">Cancel</router-link>
    </form>
  </div>
</template>
