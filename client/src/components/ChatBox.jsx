import React, { use, useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {

  // Reference to the chat container (used for auto-scrolling)
  const containerRef = useRef(null)

  // Getting global state and functions from context
  const {selectedChat, theme, user, axios, token, setUser} = useAppContext()

  // Local state to store messages
  const [messages, setMessages] = useState([])

  // Loading state (for API request)
  const [loading, setLoading] = useState(false)

  // User input prompt
  const [prompt, setPrompt] = useState('')

  // Mode selection: 'text' or 'image'
  const [mode, setMode] = useState('text')

  // Checkbox state for publishing generated images
  const [isPublished, setIsPublished] = useState(false)
  
  // Function to handle form submission (sending message)
  const onSubmit = async(e)=>{
    try {
      e.preventDefault()

      // Prevent sending message if user is not logged in
      if(!user) return toast('Login to send message')

      setLoading(true)

      // Store current prompt (in case request fails)
      const promptCopy = prompt

      // Clear input box immediately
      setPrompt('')

      // Add user message to chat UI
      setMessages(prev => [
        ...prev,
        {
          role: 'user',
          content: prompt,
          timestamp: Date.now(),
          isImage: false
        }
      ])

      // Send request to backend API
      const {data} = await axios.post(
        `/api/message/${mode}`,
        {chatId: selectedChat._id, prompt, isPublished},
        {headers: { Authorization: `Bearer ${token}` }}
      )

      // If response is successful
      if(data.success){
        // Add AI reply to messages
        setMessages(prev => [...prev, data.reply])

        // Deduct credits based on mode
        if(mode === 'image'){
          setUser(prev => ({...prev, credits: prev.credits - 2}))
        } else {
          setUser(prev => ({...prev, credits: prev.credits - 1}))
        }

      } else {
        // If API returns error
        toast.error(data.message)

        // Restore previous prompt
        setPrompt(promptCopy)
      }
      
    } catch (error) {
      // Handle request error
      toast.error(error.message)
      
    } finally {
      // Reset input and loading state
      setPrompt('')
      setLoading(false)
    }
  }

  // Load messages when a chat is selected
  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [messages])
    
  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>

      {/* Chat Messages Section */}
      <div ref={containerRef} className='flex-1 mb-5 overflow-y-scroll'>

         {/* Empty state UI when no messages */}
         {messages?.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
            <img 
              src={theme === 'dark' ? assets.logo_full : assets.logo_final} 
              className='w-full max-w-56 sm:max-w-68' 
              alt="" 
            />
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>
              Ask me anything
            </p>
          </div>
         )}

         {/* Render all messages */}
         {messages.map((message, index) => (
           <Message key={index} message={message}/>
         ))}

         {/* Loading animation (three bouncing dots) */}
         {
          loading && (
            <div className='loader flex items-center gap-1.5'>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
              <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
            </div>
          )
         }

      </div>

      {/* Show publish option only in image mode */}
      {
        mode === 'image' && (
          <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
            <p className='text-xs'>Publish Generated Image to Community</p>

            {/* Checkbox to toggle publishing */}
            <input 
              type="checkbox" 
              className='cursor-pointer' 
              checked={isPublished} 
              onChange={(e)=>setIsPublished(e.target.checked)}
            />
          </label>
        ) 
      }

      {/* Input Form */}
      <form 
        onSubmit={onSubmit} 
        className='bg-primary/20 dark:bg-[#583C97]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'
      >

         {/* Mode selection dropdown */}
         <select 
           onChange={(e)=>setMode(e.target.value)} 
           value={mode} 
           className='text-sm pl-3 pr-2 outline-none'
         >
          <option className='dark:bg-purple-900' value="text">Text</option>
          <option className='dark:bg-purple-900' value="image">Image</option>
         </select>

         {/* User input field */}
         <input 
           onChange={(e)=>setPrompt(e.target.value)} 
           value={prompt} 
           type="text" 
           placeholder='Type your prompt here...' 
           className='flex-1 w-full text-sm outline-none' 
           required
         /> 

         {/* Submit button */}
         <button disabled={loading}>
          <img 
            src={loading ? assets.stop_icon : assets.send_icon} 
            className='w-8 cursor-pointer' 
            alt="" 
          />
         </button>

      </form>
    </div>
  )
}

export default ChatBox