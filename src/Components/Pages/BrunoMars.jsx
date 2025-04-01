import React, { useEffect } from 'react'
import useSpotifyStoreBruno from '../Store/spotifyConfigBruno'
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'



const BrunoMars = () => {
  const {tracks, isLoading, error , brunoMarsFetch} =useSpotifyStoreBruno()
  

  
  useEffect(() => {
    brunoMarsFetch()

  },[brunoMarsFetch])


  if (isLoading) return <Waveform
    size="35"
    stroke="3.5"
    speed="1"
    color="black"
  />
  if (error) return <div>Cant't display the songs </div>

  return (


    <div className='bg-zinc-200 my-4 mx-7 rounded-sm p-2'>
      Best Bruno mars Songs !
      <div className='grid grid-cols-3 sm:grid sm:grid-cols-2'>
        {tracks.map((track) => (
          <div key={track.id}>
            <img 
            src={track.album.images[0].url} 
            alt={track.name} 
            className='w-[100px] '
            />
            
            <h2>{track.name}</h2>
            <p>{track.artists[0].name}</p>
          </div>
        ))}
      </div>


    </div>
  )
}

export default BrunoMars
