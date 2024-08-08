import { ImTable2 } from "react-icons/im";
import { FcPicture } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";
import { CiMenuKebab } from "react-icons/ci";
import { NavLink } from "react-router-dom"


export const Menu = () => {
return(
       <>
  <div className="h-screen w-full flex flex-col justify-center items-center">
    <h1 className="font-medium text-2xl">Menu</h1>
    <div>
      <button>
        <h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-28">
        <ImTable2 className="mr-2" /> À propos de ce tableau
      </h2>
      </button>
      <p className="text-lg text-gray-600">Ajouter une description à ce tableau</p>
    </div>
    <div>
      <NavLink to={"/changebackground"}>
        <button><h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-28">
        <FcPicture  className="mr-2"/> Changer de fond d'écran
      </h2></button>
      </NavLink>
    </div>
    <div>
      <NavLink to={"/cartearchivés"}>
        <button>
        <h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-28">
        <CiSearch  className="mr-2"/> Rechercher dans les cartes
      </h2>
      </button>
      </NavLink>
    </div>
    <div>
      <NavLink to={"/plus"}>
        <button><h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-28">
        <CiMenuKebab className="mr-1"/> Plus
      </h2></button>
      </NavLink>
    </div>
  </div>
</>
    )
}