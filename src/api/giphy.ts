import axios from 'axios';
import type { GifData, GiphyRandomResponse, GiphySearchResponse } from '../types';

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = 'https://api.giphy.com/v1/gifs';


export async function fetchRandomGif(): Promise<GifData> {
  const response = await axios.get<GiphyRandomResponse>(`${BASE_URL}/random`, {
    params: {
      api_key: API_KEY,
      rating: 'g', 
    },
  });

  
  return response.data.data;
}

export async function searchGif(query: string): Promise<GifData> {
  const response = await axios.get<GiphySearchResponse>(`${BASE_URL}/search`, {
    params: {
      api_key: API_KEY,
      q: query,      // the user's search term
      limit: 1,      // we only want one GIF at a time
      rating: 'g',
    },
  });

  // data is an ARRAY here, so we grab the first item with [0].
  return response.data.data[0];
}