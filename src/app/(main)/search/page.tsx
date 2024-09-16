'use client'

import Loading from "@/app/loading"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { fetchVideo } from "@/lib/api"
import { ImageLoader } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"

const Search = () => {
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('q')

  if (!searchQuery) {
    throw new Error('Error fetching search query')
  }

  const {
    data: searchResults,
    error,
    isLoading
  } = useSWR(`fetchVideos/${searchQuery}`, () => 
    fetchVideo(searchQuery)
  )

  if (error) {
    throw new Error('Error fetching search query')
  }

  if (isLoading) return <Loading></Loading>

  return (
    <div className="mt-[-64px] px-3">
      <h3 className="scroll-m-20 my-5 text-2xl font-semibold tracking-tight">
        Search Result
      </h3>

      {
        searchResults?.map(video => (
          <Link
            key={video.id}
            href={`/watch/${video.id}`}
            className="grid grid-cols-12 gap-8 md:h-72 my-5"
          >
            <div className="col-span-12 md:col-span-4 w-full h-52 md:h-full overflow-hidden">
              <Image
                loader={ImageLoader}
                src={video.thumbnail}
                alt={video.title}
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-xl"
              ></Image>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h4 className="text-xl font-semibold">{video.title}</h4>
              <p className="text-sm dark:text-background-light">{video.publishedTimeText}</p>

              <div className="my-6 flex items-center space-x-3">
                <Avatar className="w-11 h-11">
                  <AvatarImage src={video.channel.channelImage} alt={video.channel.channelTitle}></AvatarImage>
                  <AvatarFallback>TV</AvatarFallback>
                </Avatar>

                <p className="text-sm dark:text-background-light">{video.channel.channelTitle}</p>
              </div>

              <p className="text-sm dark:text-background-light">{video.description}</p>
            </div>
          </Link>
        ))
      }
    </div>
  )
}
export default Search