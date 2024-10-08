'use client'

import { useState } from "react";
import useSWR from "swr";

import Thumbnail from "@/components/Thumbnail";
import { fetchVideo } from "@/lib/api";
import { Video } from "@/types"
import Loading from "../loading";
import SearchBadge from "@/components/SearchBadge";

export default function Home() {
  const [badge, setBadge] = useState('QUERY')

  const {
    data: videoResults,
    error,
    isLoading
  } = useSWR(`fetchVideo/${badge}`, () => fetchVideo(badge))

  if (error) {
    throw new Error('Error fetching video data')
  }
  
  return (
    <>
      <div className="px-2 md:pl-[252px] fixed top-16 py-2 left-0 w-screen z-20 dark:bg-black bg-white">
        <SearchBadge badges={['All', 'Javascript', 'Music']} currentBadge={badge} setBadge={setBadge}></SearchBadge>
      </div>

      <div className="flex flex-wrap">
        { isLoading && Array(21).fill(null).map((i, idx) => <Loading key={idx}></Loading>) }
        { videoResults?.map((video: Video) => (
          <Thumbnail key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}
