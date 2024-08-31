import { NavLink } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { GiCardAceSpades } from "react-icons/gi";
import { RiArchiveStackFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { useState } from 'react';
import { Testdnd } from "../Dashboard/Testdnd";


export const Dashboard = () => {
  const [isPublic, setIsPublic] = useState(true);

  const handleClick = () => {
    setIsPublic(!isPublic);
  };
    return(
        <>
  <div className="w-full h-screen bg-gradient-to-b to-blue-500 from-cyan-500 to-white">
    <div className="bg-blue-800">
      <header className="flex justify-between items-center">
        <div className="flex items-center ml-5 text-white">
          <img src="/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg" alt="Logo_Tree-low" width={60} />
          <h1>Tree Low</h1>
        </div>
        <button className={`bg-white rounded-md px-6 py-2 font font-medium ${isPublic ? 'text-black' : 'text-black'}`} onClick={handleClick}>
          {isPublic ? 'Public' : 'Private'}
        </button>
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
    </div>
    <div className="flex justify-between items-center">
      <label className="outline outline-1 outline-slate-400 px-3 ml-2 rounded-sm">
        Tableau
      </label>
      <p>Team Board</p>
      <NavLink to={"/membres"}>
        <button className="flex justify-center items-center bg-blue-200 rounded-sm px-2 mt-3 font-medium mr-24">
        Invite <FaPlus />
      </button>
      </NavLink>
      <div className="flex gap-1">
       <NavLink to={"/calendar"}> <button className="flex justify-center items-center bg-blue-200 rounded-sm px-2 font-medium shadow-md hover:shadow-lg">
          <FaCalendarDays />Calendrier
        </button></NavLink>
        <NavLink to={"/menu"}>
          <button className="flex justify-center items-center bg-blue-200 rounded-sm px-2 font-medium shadow-md hover:shadow-lg mr-2">
            <CiMenuKebab />Afficher le menu
          </button>
        </NavLink>
      </div>
    </div>
    <div className="flex gap-48 mt-1">
      <button className="flex justify-center items-center px-2 font-medium shadow-md hover:shadow-lg mr-2">
        <GiCardAceSpades /> Ajouter une carte
      </button>
      <button className="flex justify-center items-center bg-white px-2 rounded-md font-medium shadow-md hover:shadow-lg mr-2">
        <RiArchiveStackFill />Archives
      </button>
      <button className="flex justify-center items-center bg-white rounded-md px-6 py-1 font-medium shadow-md hover:shadow-lg ml-14">
        <FaPlus /> Ajouter une liste
      </button>
    </div>
    <div className="flex gap-48 mt-1">
          <Testdnd />
        </div>
    <NavLink to={"/testdnd"}>
      <button>test dnd</button>
    </NavLink>
  </div>
</>
    )
}