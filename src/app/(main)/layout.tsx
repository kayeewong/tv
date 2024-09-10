import Sidebar from "@/components/Sidebar";

const MainLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <main className="md:pl-60 pt-36">
        <div>{children}</div>
      </main>
      <Sidebar className="translate-x-0"></Sidebar>
    </>
  );
};
export default MainLayout;
