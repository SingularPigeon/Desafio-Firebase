// src/stores/userStore.js
import { defineStore } from 'pinia'
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebaseApp'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: []
  }),
  actions: {
    async fetchUsers() {
      const usersRef = collection(db, 'users')

      // Usamos onSnapshot para obtener los datos en tiempo real
      onSnapshot(usersRef, (snapshot) => {
        this.users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log(this.users)
      })
    },
    async addUser(user) {
      await addDoc(collection(db, 'users'), user)
    },
    async deleteUser(id) {
      await deleteDoc(doc(db, 'users', id))
    },
    async updateUser(id, updatedUser) {
      const userDoc = doc(db, 'users', id)
      await updateDoc(userDoc, updatedUser)
    }
  },
  persist: true
})
