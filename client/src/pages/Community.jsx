import React, { useEffect, useState } from 'react'
import { dummyPublishedImages } from '../assets/assets'
import Loading from './Loading'
import { useAppContext } from '../context/AppContext'

const Community = () => {

  // State to store images and loading status
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  // Access axios from global context
  const {axios} = useAppContext()

  // Fetch published images from backend
  const fetchImages = async()=>{
   try {
    const {data} = await axios.get('/api/user/published-images')

    if(data.success){
      setImages(data.images) // update images state
    }else{
      toast.error(data.message)
    }

   } catch (error) {
    toast.error(error.message)
   }

   setLoading(false) // stop loading after request
  }

  // Run once when component mounts
  useEffect(() => {
    fetchImages()
  }, [])
  
  // Show loader while fetching data
  if(loading) return <Loading/>

  return (
    <div className='p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll'>

      <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-purple-100'>
        Community Images
      </h2>

      {images.length > 0 ? (

        // Render images grid
        <div className='flex flex-wrap max-sm:justify-center gap-5'>
          {images.map((item,index)=>(
            <a 
              key={index} 
              href={item.imageUrl} 
              target='_blank' 
              className='relative group block rounded-lg overflow-hidden border border-gray-200 dark:border-purple-700 shadow-sm hover:shadow-md transition-shadow duration-300'
            >
              {/* Image */}
              <img 
                src={item.imageUrl} 
                alt=""  
                className='w-full h-40 md:h-50 2xl:h-62 object-cover group-hover:scale-105 transition-transform-duration-300 ease-in-out'
              />

              {/* Creator info (shown on hover) */}
              <p className='absolute bottom-0 right-0 text-xs bg-black/50 backdrop-blur text-white px-4 py-1 rounded-tl-xl opacity-0 group-hover:opacity-100 transition duration-300'>
                Created by {item.username}
              </p>
            </a>
          ))}
        </div>

      ) : (

        // Empty state
        <p className='text-center text-gray-600 dark:text-purple-200 mt-10'>
          No images Available
        </p>

      )}
    </div>
  )
}

export default Community