import weblogo from "../../assets/images/weblogo.webp"
import cslogo from "../../assets/images/cs-logo.webp"
import { NavLink } from "react-router"

const Navbar = () => {
  return (
    <div className='fixed top-0 w-svw text-center h-20 flex justify-between bg-[#ffffff] shadow-md items-center'>

        <div className="h-full hidden md:inline-block ">
            <img className="h-full" src={cslogo} alt="campaign strategist logo" />
        </div>

        <div className="h-full inline-block ">
            <img className="h-full" src={weblogo} alt="jeet ki ranneeti logo" />
        </div>

        <NavLink to={"/about-us"} className="inline-block text-xl hover:text-black text-gray-500 p-4 font-bold rounded-2xl hover:cursor-pointer mr-2">
            About Us
        </NavLink>
    </div>
  )
}

export default Navbar