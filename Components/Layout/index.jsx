import Navbar from "../Navbar";
import { Montserrat } from "@next/font/google";

const font = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

function Layout({ children }) {
  return (
    <div
      className={
        "min-h-[100vh] px-8 pt-28 md:px-10 lg:px-20 w-full" +
        font.className
      }
    >
      <Navbar />
      {children}
    </div>
  );
}
export default Layout;
