import React from 'react'

const ChatInput = ({input, setInput, handleSend, loading}) => {
  return (
    <footer className="w-full shrink-0 border border-gray-200 bg-white" >
          <form onSubmit={handleSend} className="flex justify-around items-center h-16">
            <div className="w-9/12 p-2 border border-gray-400 rounded-md">
              <input 
                type="text"
                placeholder="Ask your support question..."
                className="w-full text-gray-800 outline-none"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              disabled={!input.trim() || loading} 
              className="w-2/12 p-2 bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 font-semibold text-white rounded-md cursor-pointer">
              {loading ? 'Sending...' : 'Send'}
            </button>       
          </form>
          <p className="text-xs text-center text-slate-600 mt-3">AI Support Assistant . Powered by GenAI</p>
        </footer>
  )
}

export default ChatInput