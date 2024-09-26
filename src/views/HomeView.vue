<script setup>
import UserList from '../components/usuarios/UserList.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="row">
    <h2 class="mt-5 mx-5">
      Crear usuario <RouterLink :to="{ name: 'addUser' }" class="btn btn-primary"> + </RouterLink>
    </h2>

    <RouterView />
  </div>

  <div class="col">
    <UserList />
  </div>
</template>
