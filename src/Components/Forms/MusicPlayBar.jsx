import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

const MusicPlayBar = () => {
  return (
    <div className='fixed bottom-0 left-0 right-0  lg:flex lg:justify-center md:flex md:justify-center transition-width duration-200'>
      <div className='  rounded-md lg:w-3/4 h-24 shadow-lg w-screen bg-gradient-to-t from-purple-300 to-violet-200'>
        

      <div className='flex justify-center gap-4 pt-8'>
        <FontAwesomeIcon icon={faBackward} />
          <FontAwesomeIcon icon={faPlay} />
          <FontAwesomeIcon icon={faPause} />
          <FontAwesomeIcon icon={faForward} />
      </div>

        <div className='flex justify-end gap-2 pr-5'>
          <FontAwesomeIcon icon={faVolumeHigh} />
          <FontAwesomeIcon icon={faVolumeXmark} />
        </div>
      
      
      </div>
    </div>
  )
}

export default MusicPlayBar
