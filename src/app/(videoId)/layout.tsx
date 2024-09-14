import VideoIdNav from "@/components/VideoIdNav"

const RootLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <VideoIdNav></VideoIdNav>
      { children }
    </>
  )
}
export default RootLayout