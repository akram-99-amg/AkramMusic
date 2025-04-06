import React, { useState } from 'react'
import { Waveform } from 'ldrs/react'
import 'ldrs/react/Waveform.css'
import { useMusic } from '../Store/Music'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';



const TrackCard = () => {

  const { handleTrackPlay, addToPlaylist } = useMusic()
  const [query, setQuery] = useState("")
  const [tracks, setTracks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)




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

    const encodedDeezerUrl = encodeURIComponent(`https://api.deezer.com/search?q=${query}`);
    let sucess = false

    for (let proxy of proxyUrls) {

      try {
        const response = await fetch(`${proxy}${encodedDeezerUrl}`);


        if (!response.ok) continue
        const data = await response.json()


        let result;

        if (data.contents) {
          if (!data.contents.trim().startsWith("{")) {
            console.warn("Invalid wrapped JSON in .contents");
            continue;
          }
          result = JSON.parse(data.contents)


        } else if (data.data) {
          result = data
        } else {
          console.warn("Unexpected data structure from proxy:", data);
          continue;
        }


        if (result.data && result.data.length > 0) {

          setTracks(result.data)
        } else {

          setError("no songs found")
          setTracks([])
        }
        sucess = true
        break
      } catch (err) {
        console.warn("Proxy failed:", proxy, err)
        continue
      }

    }
    if (!sucess) {
      setError("All proxy attempts failed. Please try again.");
      setTracks([]);
    }

    setIsLoading(false);


  }



  return (
    <div className='ml-2'>
      <form
        className='flex justify-center gap-4'
        onSubmit={search}>
        <input type="text"
          name="search"
          placeholder='What do you want to listen to?'
          className='rounded-2xl  py-2 px-3 w-48 sm:w-[450px] hover:shadow-md hover:bg-gray-100 focus:outline-offset-2 focus:outline-gray-200'
          onChange={(e) => setQuery(e.target.value)}

        />
        <button
          className='bg-gray-200 text-purple-700 hover:shadow-md hover:bg-gray-100 rounded-2xl px-4'
          type='submit'>
          Search
        </button>

      </form>
      <div className="flex justify-center my-6">
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


      <div className='flex flex-col gap-5 cursor-pointer'>
        {tracks.map((track) => (
          <div className='flex justify-between pr-4 '>
            <div key={track.id}
              className="flex items-center gap-4 p-2 border-spacing-1 shadow-lg cursor-pointer w-3/4 rounded-md hover:bg-gray-200"
              onClick={() => handleTrackPlay({
                title: track.title,
                preview_url: track.preview,
                album: {
                  cover_medium: track.album?.cover_medium || "",
                },
                artists: {
                  name: track.artist?.name || "",
                }
              }
              )}
            >
              <img src={track.album.cover_medium}
                alt={track.title}
                className="w-16 h-16 rounded-2xl" />
              <div>
                <h2 className='font-semibold'>{track.title}</h2>
                <p>
                  {track.artist.name}
                </p>
              </div>
            </div>


            <button
              className='sm:mr-[100px] text-2xl'
              onClick={() => addToPlaylist({
                id: track.id,
                title: track.title,
                preview_url: track.preview,
                album: {
                  cover_medium: track.album?.cover_medium || ""
                },
                artists: {
                  name: track.artist?.name || "Unknown Artist"
                }
              })}
            >
              <FontAwesomeIcon
                className='" text-purple-600 hover:text-blue-600'
                icon={faPlus} />
            </button>


          </div>

        ))}
      </div>

    </div>
  )
}

export default TrackCard
