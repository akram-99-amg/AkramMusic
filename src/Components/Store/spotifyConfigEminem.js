import { create } from "zustand";
import axios from "axios"
import SpotifyWebApi from 'spotify-web-api-node';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

const spotifyApi = new SpotifyWebApi({ CLIENT_ID, CLIENT_SECRET })

const useSpotifyStoreEminem =create((set)=>({
    token: null,
    tracks: [],
    isLoading: false,
    error: null,

    fetchToken: async () => {
        try {
            set({ isLoading: true })
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                'grant_type=client_credentials',
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
                    }
                }
            )
            const token = response.data.access_token;
            spotifyApi.setAccessToken(token);
            return (token)

        } catch (err) {
            set({ error: err.message, isLoading: false });
            throw (err)
        }

    },
    // fetching the weekend songs
    EminemFetch: async () => {
        try {
            set({ isLoading: true });
            const token = await useSpotifyStoreEminem.getState().fetchToken()
            if (!token) throw new Error("no spotify token available");

            const data = await spotifyApi.getArtistTopTracks("7dGJo4pcD2V6oG8kP0tJRR", "US")

            set({ tracks: data.body.tracks, isLoading: false })

        } catch (err) {
            set({ error: err.message, isLoading: false })
        }
    }

}))
export default useSpotifyStoreEminem