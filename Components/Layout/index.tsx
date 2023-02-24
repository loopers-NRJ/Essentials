import Navbar from "../Navbar/index";

function Layout({ children }: any) {
  return (
    <div
      className={
        "min-h-[100vh] px-8 md:px-10 lg:px-20 w-full"
      }
    >
      <Navbar />
      {children}
    </div>
  );
}
export default Layout;
