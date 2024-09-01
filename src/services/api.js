const API_URL = 'https://api.example.com' // 替换为实际的API地址

export async function sendMessage(message) {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  }
  catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

export async function getMessages() {
  try {
    const response = await fetch(`${API_URL}/messages`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  }
  catch (error) {
    console.error('Error fetching messages:', error)
    throw error
  }
}
