import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

const AppContext = createContext()

export const AppContextProvider = ({children}) => {

    const navigate = useNavigate()

    const [user,setUser] = useState(null)
    const [chats,setChats] = useState([])
    const [selectedChat,setSelectedChat] = useState(null)
    const [theme,setTheme] =useState(localStorage.getItem('theme') || 'light')
    const [token,setToken] = useState(localStorage.getItem('token') || null)
    

    const fetchUser = async () => {
        try {
            const {data}=await axios.get('/api/user/data',{headers:{Authorization:token}})
            if(data.success){
                setUser(data.user)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
     
    }

    const fetchUserChats = async () => {
        setChats(dummyChats)
        setSelectedChat(dummyChats[0])
    }

    useEffect(()=>{ 
        if(theme === 'dark'){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme',theme)
    },[theme])
 
    useEffect(()=>{
         if(user){
            fetchUserChats()
         }else{
            setChats([])
            setSelectedChat(null)
         }
    },[user])



    useEffect(()=>{
        fetchUser()
    },[])

    const value = {
        navigate,user,setUser,chats,setChats,selectedChat,setSelectedChat,theme,setTheme
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)