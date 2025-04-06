import {Routes, Route, Navigate} from "react-router-dom"
import MusicPlayBar from '../Components/Forms/MusicPlayBar'
import HomeSection from './HomeSection'
import LeftBar from '../Components/Forms/LeftBar'
import TrackCard from "../Components/Forms/TrackCard"
import Playlist from "../Components/Forms/playlist"



const MainPage = () => {
  return (
    <div className=' bg-gradient-to-tl from-purple-300 to-indigo-400 min-h-screen pt-8 pb-16'>
      <div className='flex flex-col sm:flex-row'>
        <LeftBar />

      
        <div className='flex-1 mt-3 sm:pl-3' >
        <Routes>
        <Route path="/home" element={<HomeSection />} />
        <Route path="/search" element={<TrackCard />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route index element={<Navigate to="/home" replace />} />
        </Routes>

          <MusicPlayBar />
        </div>
      </div>
    </div>
  )
}

export default MainPage
