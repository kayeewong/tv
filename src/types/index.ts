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