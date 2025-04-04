import React from 'react'
import PopularMusic from '../Components/Pages/PopularMusic'
import PopMusic from '../Components/Pages/PopMusic'
import RapMusic from '../Components/Pages/RapMusic'
import BrunoMars from '../Components/Pages/BrunoMars'
import Gims from '../Components/Pages/Gims'

const HomeSection = () => {
  return (
    <div>
      <PopularMusic />
      <PopMusic />
      <RapMusic />
      <BrunoMars />
      <Gims />
    </div>
  )
}

export default HomeSection
