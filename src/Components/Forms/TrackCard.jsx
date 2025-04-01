import React, { useEffect, useState } from 'react'

const TrackCard = () => {
  const [artists, setArtists] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [albums, setAlbums] =useState([])


  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
 
  useEffect(() => {
    const fetchToken = async ()=>{
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
    }
    
    fetchToken()
  }, [])


  async function search(e) {
    e.preventDefault()


    const searchParameter = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }

    }
    const artistID = await fetch("https://api.spotify.com/v1/search?q=" + artists + "&type=artist", searchParameter)
      .then(res => res.json())
      .then(data => {return data.artists.items[0].id})

      const returnAlbums = await fetch ("https://api.spotify.com/v1/artists/"+ artistID + "/albums"+ "?include_groups=album&limit=40", searchParameter)
      .then(res=>res.json())
      .then(data=>setAlbums(data.items))
  }



  return (
    <div className='flex justify-center'>
      <form onSubmit={search}>
        <input type="text"
          name="search"
          placeholder='Search for an artist ?'
          className=' my-5  rounded-2xl  py-2 px-3 sm:w-48 md:w-64 lg:w-96 hover:shadow-md hover:bg-gray-100 focus:outline-offset-2 focus:outline-gray-200'
          onChange={(e) => setArtists(e.target.value)}

        />
        <button type='submit'>
          Search
        </button>

      </form>
      <div>
          {albums.map((album, id)=>(
            <div key={album.id} 
            className="flex items-center gap-4 p-2 border-b">
              <img src={album.images[0]?.url || 'https://via.placeholder.com/100'}
               alt={album.name} 
               className="w-16 h-16 rounded-full"/>
            
            <div>
              <h2 >{album.name}</h2>
            </div>
  
            </div>
          ))}
        </div>

    </div>
  )
}

export default TrackCard
