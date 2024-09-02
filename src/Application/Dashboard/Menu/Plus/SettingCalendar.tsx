import { MdTipsAndUpdates } from "react-icons/md";
import { LuWallpaper } from "react-icons/lu";
import { NavLink } from "react-router-dom";


export const Settingcalendar = () => {
  return (
    <div className="flex flex-col items-center justify-center  w-full space-y-72">
      <h1 className="text-4xl font-medium text-center mt-5">Paramètre Calendrier</h1>


<NavLink to={"/theme"}>
<button className="flex space-x-4 text-xl font-medium px-4 py-2">
        <LuWallpaper  className="mr-2"/>
        Themes
      </button>
</NavLink>
      

      <div>
        <NavLink to={'/astuce'}>
            <button className="flex space-x-4 text-xl font-medium px-10">
                    <MdTipsAndUpdates className="mr-2"/>
                    Astuces
            </button>
        </NavLink>
      <p className="text-center">Astuce du Themes</p>
      </div>
    </div>
  )
}