<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const users = userStore.users

onMounted(async () => {
  try {
    userStore.fetchUsers()
  } catch {
    console.error('Error al cargar usuarios')
  }
})

const removeUser = (id) => {
  userStore.deleteUser(id)
}
</script>

<template>
  <div>
    <h2>Lista de usuarios</h2>

    <router-link to="/add">Crear nuevo usuario </router-link>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
        <button @click="removeUser(user.id)">Delete</button>
        <router-link :to="'/edit/' + user.id">Edit</router-link>
      </li>
    </ul>
    <p v-else>No hay usuarios disponibles</p>
  </div>
</template>
