<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

// Iniciar store usuarios
const userStore = useUserStore()
// Iniciar el router
const router = useRouter()

// Cargar usuarios al montar el componente
onMounted(async () => {
  try {
    // Llamada a la función fetchUsers para ontener los datos de usuarios
    await userStore.fetchUsers()
  } catch {
    console.error('Error al cargar usuarios')
  }
})

// Función para eliminar usuario
const removeUser = (id) => {
  userStore.deleteUser(id)
}
// Función para editar usuario
const editUser = (id) => {
  router.push({ name: 'EditUser', params: { id } }) // Redirige al formulario con los datos del usuario según el id
}
</script>

<template>
  <table class="table table-hover table-bordered mt-3">
    <thead>
      <tr class="table-primary">
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Correo</th>
        <th scope="col">Acciones</th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr v-for="(user, idx) in userStore.users" :key="user.id">
        <th scope="row">{{ idx + 1 }}</th>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td class="d-grid gap-3">
          <button class="btn btn-sm btn-outline-success" @click="editUser(user.id)">Editar</button>
          <button class="btn btn-sm btn-outline-danger" @click="removeUser(user.id)">
            Eliminar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
