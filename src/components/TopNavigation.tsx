'use client'

import { FormEvent, useContext, useRef, useState } from "react"
import { Bell, Menu, Search, Tv2, Video } from "lucide-react"
import Link from 'next/link'
import { ThemeToggle } from "./ThemeToggle"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AppContext from "@/context/appContext"
import { useRouter } from "next/navigation"

const TopNavigation = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const router = useRouter()

  const { setShowNav } = useContext(AppContext)
  
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(searchInputRef.current) {
      const searchQuery = searchInputRef.current.value

      setDialogOpen(false)
      router.push(`/search?q=${searchQuery}`)
    }
  }
  return (
    <nav className="fixed top-0 left-0 w-screen z-20 dark:bg-black bg-white">
      <div className="flex justify-between items-center px-2 md:px-7 h-16">
        <div className="flex items-center">
          <span className="hover:bg-background-dark/30 md:block hidden hover:text-white cursor-pointer rounded-full p-2 mr-1">
            <Menu
              onClick={() => setShowNav(prevState => !prevState)}
              size={30}></Menu>
          </span>
          <Link href='/' className="flex items-center space-x-2">
            <Tv2 size={48} className="text-red-700"></Tv2>
            <span className="hidden md:block text-2xl font-bold">TV</span>
          </Link>
        </div>

        <div className="md:flex items-center justify-center hidden">
          <form onSubmit={handleSubmit} className="flex items-center h-10 mx-auto">
            <input
              type="search"
              placeholder="Search"
              ref={searchInputRef}
              className="px-4 h-full md:w-48 lg:w-96 border dark:border-gray-50 border-gray-300 rounded-l-full focus:outline-none" />
            <div className="h-full px-5 grid place-content-center bg-background-light text-black rounded-r-full">
              <Search></Search>
            </div>
          </form>
        </div>

        <div className="flex items-center space-x-7">
          <div className="md:hidden">
            <ThemeToggle></ThemeToggle>
          </div>
          <Video></Video>
          <Bell></Bell>
          <div className="md:hidden">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger>
                <Search onClick={() => setDialogOpen(true)}></Search>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Search</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex items-center h-10 mx-auto">
                  <input
                    type="search"
                    placeholder="Search"
                    ref={searchInputRef}
                    className="px-4 h-full md:w-48 lg:w-96 border dark:border-gray-50 border-gray-300 rounded-l-full focus:outline-none" />
                  <div className="h-full px-5 grid place-content-center bg-background-light text-black rounded-r-full">
                    <Search></Search>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar>
                  <AvatarImage src="/avatar.jpg" alt="Kayee"></AvatarImage>
                  <AvatarFallback>GE</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72">
                <DropdownMenuLabel>
                  <div className="flex space-x-4">
                    <Avatar>
                      <AvatarImage src="/avatar.jpg" alt="Kayee"></AvatarImage>
                      <AvatarFallback>GE</AvatarFallback>
                    </Avatar>

                    <div className="flex felx-col space-x-3 text-base">
                      <span>
                        <p>Kayee</p>
                        <p>@kayee</p>
                      </span>
                      <Link href={`/channels/${process.env.NEXT_PUBLIC_CHANNEL_ID}`} className="text-blue-500">View your channel</Link>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <div className="p-2 flex items-center">
                  <span className="mr-2">Appearance: </span><ThemeToggle></ThemeToggle>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

      </div>
    </nav>
  )
}
export default TopNavigation