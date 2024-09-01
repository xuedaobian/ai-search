import { defineStore } from 'pinia'
import { getMockSystemResponse } from '@/services/mockSystemResponse.js'

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: [],
    isReceiving: false,
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message)
      if (message.type === 'user') {
        this.getSystemResponse()
      }
    },
    async getSystemResponse() {
      this.isReceiving = true
      try {
        const systemResponse = await getMockSystemResponse()
        this.messages.push({
          id: Date.now(),
          content: systemResponse,
          type: 'system',
          sender: 'System',
        })
      }
      finally {
        this.isReceiving = false
      }
    },
  },
})
