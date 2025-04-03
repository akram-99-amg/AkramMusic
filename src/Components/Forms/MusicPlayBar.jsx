import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faVolumeHigh, faVolumeXmark, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};
const MusicPlayBar = ({ currentTrack, isPlaying, progress, duration, volume, onPause, onVolumeChange, onSeek }) => {
  const handleSeek = (e) => {
    const Position = parseFloat(e.target.value);
    onSeek(Position)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume)
  }

  const toggleMute = () => {
    onVolumeChange(volume > 0 ? 0 : 0.6)
  };
  const skipForward = () => {
    onSeek(Math.min(progress + 10, duration))
  }
  const skipBackward = () => {
    onSeek(Math.max(progress - 10, 0))
  }

  return (
    <div className='fixed bottom-0 left-0 right-0  lg:flex lg:justify-center md:flex md:justify-center transition-width duration-200'>
      <div className='  rounded-md lg:w-3/4 h-24 shadow-lg w-screen bg-gradient-to-t from-purple-300 to-violet-200'>

        {/* current track */}

        {currentTrack && (
          <div >
            <img
              src={currentTrack.album.images[0]?.url || 'https://via.placeholder.com/50'}
              alt={currentTrack.name} />
            <h2>{currentTrack.name}</h2>
            <p className="text-gray-700 truncate max-w-xs">
              {currentTrack.artists.map(a => a.name).join(", ")}
            </p>

          </div>

        )}
        <div className="absolute top-0 left-0 right-0 h-1 ">
          <div

            style={{ width: `${(progress / (duration || 1)) * 100}%` }}
          />
        </div>


        {/* Control */}

        <div className='flex justify-center gap-4 pt-8'>
          <button
            onClick={skipBackward}
            className="hover:text-purple-700" >
            <FontAwesomeIcon icon={faBackward} />
          </button>

          <button
            className='flex'
            onClick={onPause}>
            {isPlaying ? (<FontAwesomeIcon icon={faPause} />) : (<FontAwesomeIcon icon={faPlay} />)}
          </button>

          <button
            onClick={skipForward}
            className="hover:text-purple-700">
            <FontAwesomeIcon icon={faForward} />
          </button>

          <div className="text-xs text-gray-600">
            {formatTime(progress)} / {formatTime(duration)}
          </div>

          <input
            type="range"
            min="0"
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            className="w-32 accent-purple-600"
          />
        </div>

        {/* volume */}

        <div className='flex justify-end gap-2 pr-5'>
          <button onClick={toggleMute}>
            {volume > 0 ?
              (<FontAwesomeIcon icon={faVolumeHigh} />) : (<FontAwesomeIcon icon={faVolumeXmark} />

              )}

          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className='w-20 accent-purple-600' />


        </div>


      </div>
    </div>
  )
}

export default MusicPlayBar
