import React from 'react'

const ChatHeader = () => {
  return (
    <header className="w-full shrink-0 p-5 border border-gray-200 bg-white flex justify-between items-center">
          <div>
            <h1 className="text-blue-500 font-bold text-xl">
              AI Support Assistant
            </h1>
            <p className="text-sm text-blue-500">
              Your application support helper
            </p>
          </div>
          <p className="text-green-400 text-md font-semibold">Online</p>
        </header>
  )
}

export default ChatHeader