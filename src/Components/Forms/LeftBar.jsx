import React from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Playlist from './playlist';

const LeftBar = () => {
  return (
    <div className='bg-zinc-200 w-full h-13  sm:w-1/4 sticky top-0 sm:h-screen sm:m-2 sm:ml-5 rounded-md shadow-lg transition-w duration-200  '>
      <div className='flex flex-row justify-evenly sm:flex-col  gap-6 py-1 sm:pt-6 '>

        <Link
          to="/home"
          className='sm:font-semibold font-normal texl-lg sm:text-xl flex flex-col sm:flex-row sm:gap-4  items-center gap-1 bg-gray-300 mx-6 p-2 rounded-md hover:bg-gray-200 hover:text-purple-600 '
        >
          <FontAwesomeIcon icon={faHouse} />
          <span>Home</span> 
        
        </Link>

        <Link
          to="/search"
          className='sm:font-semibold font-normal texl-lg sm:text-xl flex flex-col sm:flex-row sm:gap-4  items-center gap-1 bg-gray-300 mx-6 p-2 rounded-md hover:bg-gray-200 hover:text-purple-600'
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>Search</span>
          
        </Link>

        <Link
        to="/playlist"
          className='sm:font-semibold font-normal texl-lg sm:text-xl flex flex-col sm:flex-row sm:gap-4  items-center gap-1 bg-gray-300 mx-6 p-2 rounded-md hover:bg-gray-200 hover:text-purple-600'
        >
          <FontAwesomeIcon icon={faMusic} />
          <span>Playlist</span> 
          
          </Link>
          <div className=" hidden md:block overflow-y-auto max-h-[400px]  mt-4">
          <Playlist  />
          
          
          </div>
          
      </div>




    </div>
  )
}

export default LeftBar
