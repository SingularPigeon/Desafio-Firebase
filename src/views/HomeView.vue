<script setup>
import UserList from '../components/usuarios/UserList.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="row mx-3">
    <h2 class="mt-5 mx-4">
      Crear usuario
      <RouterLink :to="{ name: 'addUser' }" class="btn btn-primary fs-4 py-0"> + </RouterLink>
    </h2>
    <RouterView />
  </div>

  <div class="row mx-5 mt-5">
    <h3>Lista de Usuarios</h3>
    <UserList />
  </div>
</template>
