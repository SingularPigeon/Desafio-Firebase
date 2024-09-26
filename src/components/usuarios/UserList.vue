<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

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
const updateUser = (id) => {
  userStore.updateUser(id)
}
</script>

<template>
  <div class="row mx-5 mt-5">
    <h3>Gestión de Usuarios</h3>
    <table class="table table-hover table-bordered mt-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Correo</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, idx) in userStore.users" :key="user.id">
          <th scope="row">{{ idx + 1 }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td class="d-grid gap-3">
            <button class="btn btn-sm btn-outline-success" @click="updateUser(user.id)">
              Editar
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="removeUser(user.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
