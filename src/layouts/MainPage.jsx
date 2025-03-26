import React from 'react'
import MusicPlayBar from '../Components/MusicPlayBar'
import SearchBar from '../Components/SearchBar'
import PopularMusic from '../Components/PopularMusic'
import PopMusic from '../Components/PopMusic'
import RapMusic from '../Components/RapMusic'
import BrunoMars from '../Components/BrunoMars'
import Rihanna from '../Components/Rihanna'

const MainPage = () => {
  return (
    <div className='  bg-gray-500 h-screen'>
      <SearchBar />
      <PopularMusic />
      <PopMusic />
      <RapMusic />
      <BrunoMars />
      <Rihanna />

      <MusicPlayBar />
    </div>
  )
}

export default MainPage
