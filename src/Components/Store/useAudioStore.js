import { create } from "zustand";
import { Howl } from "howler";

export const useAudioStore =create((set,get)=>({
currentTrack:null,
isPlaying : false,
progress : 0,
duration :0,
volume:60,
audioFeatures :null,
sound :null,

playTrack:async(TrackEvent,token)=>{
    const {sound, volume}=get();
    if(sound){
        sound.stop()
    }
    if(!TrackEvent.priview_url){
        console.warn("No priview for this song")
        return
    }
    const newSound= new Howl({
        src :[TrackEvent.priview_url],
        volume: volume /100,
        html5:true,
        onend:()=>set({isPlaying:false, progress:0}),
        onload:()=>set({duration:newSound.duration()}),
        onplay:()=>set({isPlaying:true})
    });
    set({
        sound: newSound,
        currentTrack: track,
        audioFeatures: null,

    });
    newSound.play()

    try{
        const res =await fetch(`https://api.spotify.com/v1/audio-features/${track.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
        const data =await res.json();
        set({audioFeatures:data})
    }catch(err){
        console.error("Audio Error : ", err)
    }
},
pauseOrResume: () => {
    const { sound, isPlaying } = get();
    if (!sound) return;
    if (isPlaying) {
      sound.pause();
      set({ isPlaying: false });
    } else {
      sound.play();
      set({ isPlaying: true });
    }
  },
  seek: (val) => {
    const { sound } = get();
    if (sound) {
      sound.seek(val);
      set({ progress: val });
    }
  },changeVolume: (val) => {
    const { sound } = get();
    if (sound) {
      sound.volume(val / 100);
    }
    set({ volume: val });
  },
   updateProgress: () => {
    const { sound, isPlaying } = get();
    if (sound && isPlaying) {
      set({ progress: sound.seek() });
    }
  }
}))