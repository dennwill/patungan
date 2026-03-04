import { defineStore } from 'pinia'

export const useNameStore = defineStore('nameStore', {
  state: () => ({
    names: [],
  }),

  actions: {
    addName(newName) {
      if (newName.trim()) {
        this.names.push(newName)
      }
    },
    deleteName(index) {
      this.names.splice(index, 1)
    },
  },
})
