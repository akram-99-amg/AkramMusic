import React from 'react'

const SearchBar = () => {
  return (
    <div className='flex justify-center'>
      <input type="text"
       name="search" 
        placeholder='Search for a music ?'
        className=' my-5  rounded-2xl  py-2 px-3 sm:w-48 md:w-64 lg:w-96 hover:shadow-md hover:bg-gray-100 focus:outline-offset-2 focus:outline-gray-200' />
</div>
    
  )
}

export default SearchBar
