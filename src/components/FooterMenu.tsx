import Link from 'next/link'
import { FileVideo, Home, MonitorPlay, PlusCircle } from "lucide-react"
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const FooterMenu = () => {
  return (
    <footer className="bg-white dark:bg-black md:hidden text-[8px] h-14 fixed w-full flex items-center justify-around bottom-0 left-0 z-20">
      <div className="flex flex-col items-center">
        <Home></Home>
        <span>Home</span>
      </div>

      <div className="flex flex-col items-center">
        <FileVideo></FileVideo>
        <span>Shorts</span>
      </div>

      <PlusCircle></PlusCircle>

      <div className="flex flex-col items-center">
        <MonitorPlay></MonitorPlay>
        <span>Subscriptions</span>
      </div>

      <Link href={`/channels/`} className='flex flex-col items-center'>
        <Avatar className='w-6 h-6'>
          <AvatarFallback>GE</AvatarFallback>
        </Avatar>
        <span>You</span>
      </Link>
    </footer>
  )
}
export default FooterMenu