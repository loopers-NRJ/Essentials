import Navlink from "./NavLink/index.jsx";

function Navbar() {
  return (
    <div className="flex fixed top-0 left-0 right-0 p-5 md:px-10 lg:px-28 w-full">
      <nav className="flex items-center gap-4 px-10 py-4 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-[10px] shadow-lg rounded-lg text-sm mx-auto w-full">
        <Navlink link="" content="Home"></Navlink>
        <Navlink link="" content="Products"></Navlink>
        <Navlink link="" content="About Us"></Navlink>
      </nav>
    </div>
  );
}
export default Navbar;
