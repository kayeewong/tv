import { Video } from '@/types'
import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_RAPID_BASE_URL
const API_KEY = process.env.NEXT_PUBLIC_RAPID_KEY
const API_HOST = process.env.NEXT_PUBLIC_RAPID_HOST

export const fetchVideo = async(
  query: string
) => {
  let error: Error
  try {
    const { data } = await axios.request({
      method: 'GET',
      url: `${BASE_URL}/search`,
      params: { query: query, sort_by:'date', type:'video' },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    })
    
    const videos: Video[] = []

    for(const video of data.data) {
      const id = video.videoId
      if (id) {
        videos.push({
          id,
          title: video.title,
          description: video.description,
          thumbnail: video.thumbnail?.length && video.thumbnail[0].url,
          viewCount: video.viewCount,
          channel: {
            channelId: video.channelId,
            channelTitle: video.channelTitle,
            channelImage: video.channelThumbnail?.length && video.channelThumbnail[0].url
          },
          publishedDate: video.publishDate,
          publishedTimeText: video.publishedTimeText
        })
      }
    }
    console.log(videos);
    

    return videos

  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e;
    } else {
      throw new Error("We can't handle that type of exception!");
    }
    console.log('Error get video', error.message)
    throw error
  }

}