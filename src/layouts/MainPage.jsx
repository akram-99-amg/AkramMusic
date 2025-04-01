import React from 'react'
import MusicPlayBar from '../Components/Pages/MusicPlayBar'
import SearchBar from '../Components/Pages/SearchBar'
import PopularMusic from '../Components/Pages/PopularMusic'
import PopMusic from '../Components/Pages/PopMusic'
import RapMusic from '../Components/Pages/RapMusic'
import BrunoMars from '../Components/Pages/BrunoMars'
import Rihanna from '../Components/Pages/Rihanna'

const MainPage = () => {
  return (
    <div className='relative bg-gradient-to-tl from-purple-300 to-indigo-400 min-h-screen'>
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
