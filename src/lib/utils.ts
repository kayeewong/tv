import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ImageLoader = ({src}: {src: string}) => {
  return src
}

export function formatCount(viewCount: number): string {
  if (viewCount < 1000) {
    return viewCount.toString();
  } else if (viewCount < 1000000) {
    return (viewCount / 1000).toFixed(1) + 'k';
  } else {
    return (viewCount / 1000000).toFixed(1) + 'm';
  }
}
