import React from 'react'

const MessageList = ({messages, messageEndRef, loading, error}) => {
  return (
    <main className="flex-1 min-h-0 overflow-y-auto p-4">
          <div className="flex flex-col gap-4">
            {messages?.map((message)=>(
              <div 
                key={message.id} 
                className={`flex items-start ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
              <div className={`max-w-[80%] p-2 rounded-md shadow-md ${message.role === 'user' ? 'bg-blue-400 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
                <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
              </div>
              </div>
            ))}
            {loading && (
            <div className="flex items-start justify-start">
              <p className="max-w-[80%] p-2 rounded-md shadow-md bg-white border border-slate-200 text-slate-700 font-semibold">AI is thinking...</p>
            </div>
          )}
          {error && (
            <div className="flex justify-center">
              <p className="text-red-500 font-semibold">{error}</p>
            </div>
          )}
          <div ref={messageEndRef} />
          </div>
        </main>
  )
}

export default MessageList