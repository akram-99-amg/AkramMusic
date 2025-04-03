import React, { useEffect, useState } from 'react'
import { Waveform } from 'ldrs/react'
import { Howl } from "howler"
import 'ldrs/react/Waveform.css'

const TrackCard = () => {
  const [artists, setArtists] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [tracks, setTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

  useEffect(() => {
    // Spotify Token
    const fetchToken = async () => {
      try {
        const authParameter = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET
        }
        fetch("https://accounts.spotify.com/api/token", authParameter)
          .then(res => res.json())
          .then(data => setAccessToken(data.access_token))
      } catch (err) {
        setError("failed to get access token")
      }

    }

    fetchToken()
  }, [])

  

  async function search(e) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const searchParameter = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }

      }
      //get the artists
      const artistID = await fetch("https://api.spotify.com/v1/search?q=" + artists + "&type=artist", searchParameter);
      const artistData = await artistID.json()
      if (!artistData.artists?.items?.length) {
        throw new Error("Artist not found ")
      }

      const artistItem = artistData.artists.items[0].id

      //get the tracks
      const returntracks = await fetch("https://api.spotify.com/v1/artists/" + artistItem + "/top-tracks?market=US&limit=20", searchParameter);
      const tracksData = await returntracks.json()
      if (!tracksData.tracks) {
        throw new Error("No tracks Found")
      }
      setTracks(tracksData.tracks)

    } catch (err) {
      setError(err.message || " Failed to fetch")
      setTracks([])
    } finally {
      setIsLoading(false)
    }

  }



  return (
    <div className='ml-2'>
      <form
        className='flex justify-center gap-4 sticky'
        onSubmit={search}>
        <input type="text"
          name="search"
          placeholder='Search for an artist ?'
          className='rounded-2xl  py-2 px-3 sm:w-48 md:w-64 lg:w-96 hover:shadow-md hover:bg-gray-100 focus:outline-offset-2 focus:outline-gray-200'
          onChange={(e) => setArtists(e.target.value)}

        />
        <button
          className='bg-gray-200 text-purple-700 hover:shadow-md hover:bg-gray-100 rounded-2xl px-3'
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
            className={"flex items-center gap-4 p-2 border-b cursor-pointer hover:bg-gray-100" 
              }
            onClick={() => handleTrackPlay(track)}>
            <img src={track.album.images[0].url || 'https://via.placeholder.com/50'}
              alt={track.name}
              className="w-16 h-16 rounded-full" />

            <div>
              <h2 >{track.name}</h2>
              <h2>
                {track.artists.map(a => a.name).join(", ")}
              </h2>
            </div>
            
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default TrackCard
