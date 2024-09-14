'use client'

import { useState } from 'react'
import ReactPlayer from 'react-player'
import useSWR from "swr"

import { fetchVideoDetails } from "@/lib/api"
import { useParams } from "next/navigation"
import Loading from "../../loading"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { formatCount } from '@/lib/utils'

const VideoDetails = () => {
  const { id } = useParams()
  const [substringCount, setSubstringCount] = useState<undefined | number>(200);


  const {
    data: videoDetails,
    isLoading,
    error
  } = useSWR(
    `/videoDetails/${id}`, () => fetchVideoDetails(id as string), {
    revalidateOnFocus: false
  })

  if (error) {
    throw new Error('Error fetching video')
  }

  if(isLoading) return <Loading></Loading> 

  return (
    <div className="mb-9">
      <div className="px-4 h-[80vh] mt-14">
        <ReactPlayer url={videoDetails?.videoUrl} width="100%" height="100%"></ReactPlayer>
      </div>

      <div className='p-2 md:p-4 grid grid-cols-12 gap-7'>
        <div className='md:col-span-8 col-span-12'>
          <div>
            <h3 className='text-xl font-semibold'>{videoDetails?.title}</h3>
            <div className='flex justify-between my-3'>
              <div className='space-x-3 flex'>
                <Avatar>
                  <AvatarImage
                    src={videoDetails?.channelImage}
                    alt={videoDetails?.channelName}
                  />
                  <AvatarFallback>TV</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className='text-gray-400 text-sm'>
                    {videoDetails?.channelName}
                  </h4>
                  <p className='text-gray-400 text-sm'>
                    {videoDetails?.subscribersCountText}
                  </p>
                </div>
              </div>
              <div className='flex space-x-4 text-sm items-center bg-gray-600 text-white px-2 md:px-5 rounded-3xl'>
                <button className='flex items-center space-x-2 hover:text-blue-500'>
                  <ThumbsUp className='w-4' />
                  <span className='text-[9px]'>
                    {formatCount(videoDetails?.likes ? +videoDetails.likes : 0)}
                  </span>
                </button>
                <span>|</span>
                <button className='flex items-center hover:text-red-500'>
                  <ThumbsDown className='w-4' />
                </button>
              </div>
            </div>
          </div>
          <div className='p-3 bg-gray-600 text-white rounded-md my-4'>
            <p className='leading-8'>
              {videoDetails?.description.substring(0, substringCount)}{' '}
              <span
                onClick={
                  substringCount === 200
                    ? () => setSubstringCount(undefined)
                    : () => setSubstringCount(200)
                }
                className='font-medium cursor-pointer text-sm underline text-blue-400'
              >
                {substringCount === 200 ? 'load more' : 'load less'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VideoDetails