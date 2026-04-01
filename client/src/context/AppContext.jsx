import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

// Set base URL for all axios requests
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

// Create global context
const AppContext = createContext()

export const AppContextProvider = ({children}) => {

    const navigate = useNavigate()

    // Global states
    const [user, setUser] = useState(null)
    const [chats, setChats] = useState([])
    const [selectedChat, setSelectedChat] = useState(null)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [loadingUser, setLoadingUser] = useState(true)

    // Fetch logged-in user data
    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/user/data',{
                headers:{Authorization:`Bearer ${token}`}
            })

            if(data.success){
                setUser(data.user)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
           toast.error(error?.response?.data?.message || error.message)
        } finally {
            setLoadingUser(false)
        }
    }

    // Create a new chat
    const createNewChat = async () => {
        try {
            if (!user) return toast('Login to create chat')

            navigate('/') // redirect to home

            await axios.post(
              '/api/chat/create',
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            )

            await fetchUserChats() // refresh chats

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    // Fetch all user chats
    const fetchUserChats = async () => {
       try {
        const {data} = await axios.get('/api/chat/get',{
          headers:{Authorization:`Bearer ${token}`}
        })

        if(data.success){
            setChats(data.chats)

            // If no chats exist, create one
            if(data.chats.length === 0){
                await createNewChat()
                return fetchUserChats()
            }else{
                setSelectedChat(data.chats[0]) // select first chat
            }

        }else{
            toast.error(data.message)
        }

       } catch (error) {
            toast.error(error?.response?.data?.message || error.message) 
       }
    }

    // Handle theme change (dark/light)
    useEffect(()=>{ 
        if(theme === 'dark'){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    },[theme])
 
    // When user changes → load chats
    useEffect(()=>{
         if(user){
            fetchUserChats()
         }else{
            setChats([])
            setSelectedChat(null)
         }
    },[user])

    // When token changes → fetch user
    useEffect(()=>{
        if(token){
            fetchUser()
        }else{
            setUser(null)
            setLoadingUser(false)
        }
    },[token])

    // Provide global values
    const value = {
        navigate,
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        theme,
        setTheme,
        createNewChat,
        loadingUser,
        fetchUserChats,
        token,
        setToken,
        axios 
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

// Custom hook to use context easily
export const useAppContext = () => useContext(AppContext)