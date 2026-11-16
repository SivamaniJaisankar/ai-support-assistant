const API_URL = import.meta.env.VITE_API_URL

export const sendChatMessage = async (question) => {
    const response = await fetch(`${API_URL}/chat`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ question: question }) 
      })
      if(!response.ok){
        throw new error(`API request failed: ${response.status}`)
      }
      const data = await response.json();
      return data
}