import { useState, useRef, useEffect } from "react";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import { sendChatMessage } from "./api/chatService";

function App() {

  const messageEndRef = useRef(null);
  const[input, setInput] = useState('');
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState('');
  const[messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm your AI Support Assistant. How can I help you today?"
    }
  ])

  useEffect(()=>{
    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  },[messages, loading])

  const handleSend = async (e) => {
    e.preventDefault();
    if(!input.trim() || loading) return
    const question = input.trim()
    const userMessage = { id: Date.now(), role:'user', content: question }
    setMessages((prevMessages)=>[ ...prevMessages, userMessage])
    setInput('')
    setLoading(true)
    setError('')

    try{
      const data = await sendChatMessage(question)
      const assistantMessage = { id: Date.now()+1, role: 'assistant', content: data.answer }
      setMessages((prevMessages) => [ ...prevMessages, assistantMessage ])
    } catch (error){
      setError('Unable to get a response. Please try again')
      console.error('Chat API error:', error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="mx-5 min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-3xl h-150 border border-gray-300 flex flex-col ">
        <ChatHeader />
        <MessageList 
          messages={messages} 
          messageEndRef={messageEndRef}
          loading={loading}
          error={error}
        />
        <ChatInput
          input={input} 
          setInput={setInput}
          handleSend={handleSend}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
