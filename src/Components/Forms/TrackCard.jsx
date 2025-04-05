import React, { useEffect, useState } from 'react'
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'
import { useMusic } from '../Store/Music'


const TrackCard = () => {
  
  const {handleTrackPlay}= useMusic()
  // const [artists, setArtists] = useState("")
  // const [accessToken, setAccessToken] = useState("")
  const [query, setQuery] =useState("")
  const [tracks, setTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  
  // const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  // const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

  // useEffect(() => {
  //   // Spotify Token
  //   const fetchToken = async () => {
  //     try {
  //       const authParameter = {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded"
  //         },
  //         body: "grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET
  //       }
  //       fetch("https://accounts.spotify.com/api/token", authParameter)
  //         .then(res => res.json())
  //         .then(data => setAccessToken(data.access_token))
  //     } catch (err) {
  //       setError("failed to get access token")
  //     }

  //   }

  //   fetchToken()
  // }, [])

  
//search for the artist
  async function search(e) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)


    const proxyUrls = [
      "https://api.allorigins.win/get?url=",
      "https://corsproxy.io/?",
      "https://thingproxy.freeboard.io/fetch/"
    ];
    try{
      const encodedUrl = encodeURIComponent(`https://api.deezer.com/search?q=${query}`);
      const response = await fetch(`${proxyUrls[0]}${encodedUrl}`);
      const data = await response.json();
      const result = data.contents ? JSON.parse(data.contents) : data;
      setTracks(result.data || []);
      // const proxyUrl = "https://cors-anywhere.herokuapp.com/"
      // const apiUrl = `https://api.deezer.com/search?q=${encodeURIComponent(query)}`
      // const response = await fetch(`https://api.deezer.com/search/track?q=${query}`,{
        // method:"GET",
        // mode:"no-cors"})
      
      // const response =await fetch(proxyUrl+apiUrl)
      // const data= await response.json()
      // const data=await  response.json()
      setTracks(data.data || [])
      // const jsonString = text.match(/\((.*)\)/)?.[1] || "{}"
      // const data =JSON.parse(jsonString)
      // setTracks(data.data || [])
    }catch(err){
      setError("Error no song found")
      setTracks([])
    }finally{
      setIsLoading(false)
    }

    // try {
    //   const searchParameter = {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${accessToken}`
    //     }

    //   }

    //   //get the tracks
    //   const returntracks = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artists)}&type=track&limit=20`, searchParameter);
    //   const tracksData = await returntracks.json()
      
    //   setTracks(tracksData.tracks.items)

      


    // } catch (err) {
    //   setError(err.message || " Failed to fetch")
    //   setTracks([])
    // } finally {
    //   setIsLoading(false)
    // }

  }



  return (
    <div className='ml-2'>
      <form
        className='flex justify-center gap-4'
        onSubmit={search}>
        <input type="text"
          name="search"
          placeholder='Search for an artist ?'
          className='rounded-2xl  py-2 px-3 w-48 sm:w-[450px] hover:shadow-md hover:bg-gray-100 focus:outline-offset-2 focus:outline-gray-200'
          onChange={(e) => setQuery(e.target.value)}

        />
        <button
          className='bg-gray-200 text-purple-700 hover:shadow-md hover:bg-gray-100 rounded-2xl px-4'
          type='submit'>
          Search
        </button>

      </form>
      <div className="flex justify-center my-2">
        {isLoading && <Waveform

          size="35"
          stroke="3.5"
          speed="1"
          color="black"
        />}
      </div>
      <div className="flex justify-center my-2">
        {error && <div className='text-red-600'>There is no songs </div>}
      </div>
      <div className='pb-5'>
        {tracks.map((track) => (
          <div key={track.id}
            className="flex items-center gap-4 p-2 border-b cursor-pointer hover:bg-gray-100" 
              onClick={() =>handleTrackPlay({
                
                name:track.title,
                preview_url:track.preview,
                

              })}
            >
            <img src={track.album.cover_medium}
              alt={track.title}
              className="w-16 h-16 rounded-full" />

            <div>
              <h2 >{track.title}</h2>
              <h2>
                {track.artist.name}
              </h2>
            </div>
            
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default TrackCard
