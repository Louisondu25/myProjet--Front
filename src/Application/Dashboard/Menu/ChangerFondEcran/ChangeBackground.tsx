import { AiFillPicture } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosColorPalette } from "react-icons/io";
import { NavLink } from "react-router-dom"


export const ChangeBackground = () => {
    return(
        <>
        <div className="h-screen w-full flex flex-col items-center bg-gradient-to-b from-cyan-500 to-white">
                <h1 className="text-center text-2xl font-medium mb-24 mt-3">Changer de fond  d'écran</h1>
            <div className="flex justify-center mb-2 gap-5">
            <div className="flex flex-col items-center mr-4">
            <NavLink to={"/changepicturebackground"}>
                <button className="bg-gray-500 px-20 py-8 rounded-md flex justify-center items-center p-5 gap-y-5">
                            <AiFillPicture className="text-4xl" />
                        </button>
            </NavLink>
            <p className="text-center mb-2">Photos</p>
            </div>
            <div className="flex flex-col items-center">
            <NavLink to={"/changecolorbackground"}>
                <button className="bg-gradient-to-b from-orange-500 to-yellow-500 to-green-500 to-blue-500 to-blue-900 to-violet-500 to-pink-500 to-black px-20 py-8 rounded-md flex justify-center items-center p-5 gap-y-5">
                <IoIosColorPalette className="text-4xl" />
            </button>
            </NavLink>
            <p className="text-center mb-20">Couleurs</p>
            </div>
            </div>
                <h2 className="text-center mb-4 text-2xl font-medium">Personnaliser</h2>
                <button className="block mx-auto"><FaCirclePlus className="text-5xl" /></button>
        </div>
        </>
    )
}