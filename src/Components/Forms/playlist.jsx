import React from 'react'
import { useMusic } from '../Store/Music'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Playlist = () => {
  const { playlist, handleTrackPlay, removePlaylist } = useMusic()

  return (
    <div className='p-5'>
      <h2 className='text-4xl font-bold mb-4 text-center text-gray-100'>My Playlist</h2>
      {playlist.length === 0 &&
        <p className='text-red-500 flex justify-center'>
          No songs added yet</p>}

      <div className='flex flex-col gap-5 cursor-pointer'>
        {playlist.map(track => (
          <div className='flex '>
            <div
              key={track.id}
              className='  flex items-center gap-4 p-2 border-spacing-1 shadow-lg cursor-pointer w-3/4 rounded-md hover:bg-gray-200'
              
              onClick={() => handleTrackPlay({
                ...track,
                artists: { name: track.artists?.name || track.artist?.name || "Unknown Artist" },
                album: track.album || { cover_medium: "" }
              })}
            >
              
                
                  <img src={track.album.cover_medium}
                  alt={track.title}
                  className="w-16 h-16 rounded-2xl" />
                <div>
                  <h2 className='font-semibold'>{track.title}</h2>
                  <p className='font-normal'>{track.artist?.name || track.artists?.name }</p>
                </div>
                </div>


              
                <button
                className=' pl-6 sm:pl-10 text-2xl'
                  onClick={() => removePlaylist(track.id)}
                >
                  <FontAwesomeIcon
                   className='  text-purple-600 hover:text-red-500'
                  icon={faTrash} />
                </button>
              
            
          </div>
        ))}
      </div>

    </div>
  )
}

export default Playlist
