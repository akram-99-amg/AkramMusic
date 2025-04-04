import { createContext, useContext,useEffect, useState } from 'react'
import { Howl } from 'howler'

const MusicContext=createContext()
export const useMusic =()=>useContext(MusicContext)

export const MusicProvider = ({children}) => {
    const [currentTrack, setCurrentTrack] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(60)
    const [sound, setSound] = useState(null)

    useEffect(()=>{
        let interval;
        if (sound && isPlaying){
            interval=setInterval(()=>{
                setProgress(sound.seek())
            },1000)
        }
        return ()=>clearInterval(interval)
    },[sound, isPlaying])

    //play or pause
    const handlePause = () => {
        if (sound) {
            if (isPlaying) {
                sound.pause()
                setIsPlaying(false)
            } else {
                sound.play()
                setIsPlaying(true)
            }
            setIsPlaying(!isPlaying)
        }
    }

    //track click
    const handleTrackPlay = (track) => {
        if (sound) {
            sound.stop()
        }
            
                const newSound = new Howl({
                    src: [track.preview_url],
                    volume: volume / 100,
                    html5: true,
                    onend: () => {
                        setIsPlaying(false)
                        setProgress(0)
                    },
                    onload: () => {
                        setDuration(newSound.duration())
                    },
                    onplay: () => {
                        setIsPlaying(true)
                    }
                })
                setSound(newSound)
                setCurrentTrack(track)
                newSound.play()
            
        

    }

    const handleSeek=(e)=>{
        if(sound){
            sound.seek(e)
            setProgress(e)
        }
    }

    const handleVolumeChange=(vol)=>{
        setVolume(vol)
        if(sound){
            sound.volume(vol/100)
        }
    }

    return (
        <MusicContext.Provider 
        value={
            {handleTrackPlay,currentTrack,isPlaying,progress,duration,volume,handlePause,handleSeek,handleVolumeChange}
            } >
        {children}
        

        </MusicContext.Provider>
    )
}


