import React from 'react'
import PopularMusic from '../Components/Pages/PopularMusic'
import PopMusic from '../Components/Pages/PopMusic'
import RapMusic from '../Components/Pages/RapMusic'
import BrunoMars from '../Components/Pages/BrunoMars'
import Rihanna from '../Components/Pages/Rihanna'

const HomeSection = () => {
  return (
    <div>
      <PopularMusic />
      <PopMusic />
      <RapMusic />
      <BrunoMars />
      <Rihanna />
    </div>
  )
}

export default HomeSection
