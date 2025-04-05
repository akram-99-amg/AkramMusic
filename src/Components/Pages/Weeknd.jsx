import React, {useEffect} from 'react'
import useSpotifyStoreWeek from '../Store/spotifyConfigWeek'
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'

const Weeknd = () => {
  const { tracks, isLoading, error, WeekndFetch } = useSpotifyStoreWeek()



  useEffect(() => {
   WeekndFetch()

  }, [WeekndFetch])


  if (error) return <div>Cant't display the songs </div>

  return (


    <div className='bg-zinc-200 my-4 mx-7 rounded-lg py-3 px-5'>
      <div className="flex flex-col my-3">
        <h2 className="text-2xl font-bold">Best The Weeknd Songs !</h2>
        <div className="flex justify-center my-2">
          {isLoading && <Waveform
            size="35"
            stroke="3.5"
            speed="1"
            color="black"
          />}
        </div>
        <div className="flex justify-center my-2">
          {error && <div className='text-red-600'>Cant't display the songs </div>}
        </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center'>
        {tracks.map((track) => (
          <div key={track.id} className=' w-full max-w-[180px] flex flex-col items-center gap-1'>
            <img
              src={track.album.images[0].url}
              alt={track.name}
              className='w-[140px] sm:w-[200px] h-full transition-w duration-200'
            />

            <h2 className=' font-semibold sm:text-md text-sm '>{track.name}</h2>
            <p className='font-light'>{track.artists[0].name}</p>
          </div>
        ))}
      </div>


    </div>
  )
}

export default Weeknd
