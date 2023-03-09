import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100vh] px-8 md:px-10 lg:px-20 w-full z-20">
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
}
export default Layout;
