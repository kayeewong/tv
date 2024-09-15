export type Video = {
  id: string,
  title: string,
  description: string,
  thumbnail: string,
  viewCount: string,
  channel: {
    channelId: string,
    channelTitle: string,
    channelImage: string
  },
  publishedDate: string,
  publishedTimeText: string
}

export type VideoDetails = {
  title: string,
  videoUrl: string,
  likes: string,
  description: string,
  publishedDate: string,
  channelImage: string,
  channelName: string,
  subscribersCountText: string
}

export type channelHome = {
  id: string,
  title: string,
  avatar: string,
  banner: string,
  channelHandle: string,
  subscriberCount: number,
  subscriberCountText: string,
  videosCount: number,
  videosCountText: string,
  Videos: Array<Video>
}