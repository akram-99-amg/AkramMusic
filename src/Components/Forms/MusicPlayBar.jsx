import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faVolumeHigh, faVolumeXmark, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import { useMusic } from '../Store/Music';

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};
const MusicPlayBar = () => {
  const { currentTrack, 
    isPlaying, 
    progress, 
    duration, 
    volume, 
    handlePause, 
    handleSeek, 
    handleVolumeChange,
    } = useMusic();


  return (
    <div className='fixed bottom-0 left-0 right-0  sm:flex sm:justify-center  transition-width duration-200'>
      <div className='  rounded-md lg:w-3/4  h-24 shadow-lg w-screen bg-gradient-to-t from-purple-300 to-violet-200'>
        <div className='grid grid-cols-3 sm:grid-cols-3 sm:gap-6 gap-4 p-1 sm:p-4'>

          {/* current track */}

          {currentTrack && (
            <div className='flex items-center gap-4 py-4 sm:py-0 ' >
              <img
                src={currentTrack.album.cover_medium}
                alt={currentTrack.title}
                className='w-12 sm:w-16 sm:h-16 rounded-md object-cover' />
              <div className='truncate'>
                <h2 className='text-md sm:text-lg font-semibold'>{currentTrack.title}</h2>
                <p className="text-gray-700 truncate">
                  {currentTrack.artists.name}
                </p>
              </div>

            </div>

          )}

          

          {/* Control */}
          <div className='flex flex-col items-center justify-center flex-1'>
            <div className=' mb-2'>
              <div className='flex gap-4 justify-center'>
                <button
                  onClick={() => handleSeek(Math.max(progress - 10, 0))}
                  className="hover:text-purple-700 text-xl" >
                  <FontAwesomeIcon icon={faBackward} />
                </button>
                <button
                  className='text-xl'
                  onClick={handlePause}>
                  {isPlaying ? (<FontAwesomeIcon icon={faPause} />) : (<FontAwesomeIcon icon={faPlay} />)}
                </button>
                <button
                  onClick={() => handleSeek(Math.min(progress + 10, duration))}
                  className="hover:text-purple-700 text-xl">
                  <FontAwesomeIcon icon={faForward} />
                </button>
              </div>


              <div className='flex flex-col'>
                <div className=" text-center  text-xs text-gray-600">
                  <span>{formatTime(progress)} / {formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={progress}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="sm:w-48 w-38 accent-purple-600"
                />
              </div>
            </div>
          </div>

          {/* volume */}

          <div className='flex items-center  justify-end gap-2 pr-5 '>
            <button onClick={() => handleVolumeChange(volume > 0 ? 0 : 60)}>
              {volume > 0 ?
                (<FontAwesomeIcon icon={faVolumeHigh} />) : (<FontAwesomeIcon icon={faVolumeXmark} />

                )}

            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className='w-20 accent-purple-600' />


          </div>
          {currentTrack && (
            <audio 
            ref={audioRef}
            src={currentTrack.preview_url}
            preload='auto'
            />
          )}
        </div>


      </div>
    </div>
  )
}

export default MusicPlayBar
