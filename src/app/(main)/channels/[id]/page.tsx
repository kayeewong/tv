'use client'

import useSWR from "swr"
import { useParams } from "next/navigation"

import Image from "next/image"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import { Dot } from "lucide-react"
import { fetchChannelHome } from "@/lib/api"
import Loading from "@/app/loading"
import Thumbnail from "@/components/Thumbnail"
import { channelHome } from "@/types"
import { ImageLoader } from "@/lib/utils"

const ChannelId = () => {
  const { id } = useParams()

  const {
    data: channelHome,
    error,
    isLoading
  } = useSWR<channelHome>(`channelHome/${id}`, () => 
    fetchChannelHome(id as string)
  )

  if (error) {
    throw new Error('Error fetching channel data')
  }

  return (
    <div className="mt-[-64px]">
      <div className="h-64px w-full mb-10 md:rounded-2xl rounded-none overflow-hidden">
        { channelHome && (
          <Image
            loader={ImageLoader}
            src={channelHome.banner}
            alt={channelHome.title}
            className="object-cover w-full h-full"
            width={600}
            height={300}
            priority
          ></Image>
        )}
      </div>

      <div className="mb-10 flex flex-col md:flex-row items-center space-x-5 px-3">
        <Avatar className="w-28 h-28">
          <AvatarImage
            src={channelHome?.avatar}
            alt={channelHome?.channelHandle}
          ></AvatarImage>
          <AvatarFallback>TV</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-bold text-center md:text-left text-3xl md:text-5xl mb-2 mt-4 md:mt-0">
            {channelHome?.title}
          </h2>
          <p className="flex items-center text-sm">
            {channelHome?.channelHandle}<Dot />
            {` ${channelHome?.subscriberCountText} subscribers `}<Dot />
            {` ${channelHome?.videosCountText} videos`}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap">
        { isLoading && Array(10).fill(null).map((i, idx) => <Loading key={idx}></Loading>)}

        { channelHome?.Videos.map(video => (
          <Thumbnail
            key={video.id}
            video={video}
          ></Thumbnail>
        )) }
      </div>
    </div>
  )
}
export default ChannelId