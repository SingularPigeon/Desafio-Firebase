// src/stores/userStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { $db } from '@/firebaseApp'

export const useUserStore = defineStore('userStore', () => {
  const users = ref([])
  const usersRef = collection($db, 'users')

  async function fetchUsers() {
    try {
      onSnapshot(usersRef, (snapshot) => {
        this.users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log(this.users)
      })
    } catch (error) {
      console.error(error)
    }
  }
  async function addUser(data) {
    try {
      await addDoc(usersRef, data)
    } catch (error) {
      console.error(error)
    }
  }
  async function deleteUser(id) {
    try {
      const usersRef = doc($db, 'users', id)
      await deleteDoc(usersRef)
    } catch (error) {
      console.error(error)
    }
  }
  async function updateUser(id, updatedUser) {
    try {
      const userRef = doc($db, 'users', id)
      await updateDoc(userRef, updatedUser)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    users,
    fetchUsers,
    addUser,
    deleteUser,
    updateUser
  }
})
