import { NavLink } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";

export const CreatedBoard = () => {
    return(
        <>
        <header className="flex justify-between items-center">
        <div className="flex items-center ml-5 text-white">
          <img src="/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg" alt="Logo_Tree-low" width={60} />
          <h1>Tree Low</h1>
        </div>
        <div className="flex items-center">
          <CiSearch className="text-white" />
          <input type="text" placeholder="Rechercher" className="rounded-sm" />
        </div>
        <NavLink to={"/createboard"}>
        <button className="bg-white rounded-md px-6 py-1 font-medium">Crée</button>
        </NavLink>
        <div className="text-xl flex space-x-4 mr-4 text-white">
          <button>
            <TbInfoSquareRoundedFilled />
          </button>
          <button>
            <IoIosNotifications />
          </button>
          <button>
            <MdAccountCircle />
          </button>
        </div>
      </header>
        </>
    )
}