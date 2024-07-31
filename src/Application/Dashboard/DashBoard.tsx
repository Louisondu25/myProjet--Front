
import { CiSearch } from "react-icons/ci";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";

export const Dashboard = () => {
//       const {attributes, listeners, setNodeRef, transform} = useDraggable({
//     id: 'draggable',
//   });
//   const style = transform ? {
//     transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//   } : undefined;
    return(
        <>
        <div className=" bg-blue-800">
            <header className=" flex justify-between items-center">
                <div className="flex items-center ml-5 text-white">
                    <img src="/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg" alt="Logo_Tree-low" width={60} />
                <h1>Tree Low</h1>
                </div>
                <button className=" bg-white rounded-md px-6 py-2 font font-medium">Public/private</button>
                     <div className=" flex items-center">
                        <CiSearch className="text-white" /><input type="text" placeholder="Rechercher" className=" rounded-sm"/> 
                    </div>
                     <button className="bg-white rounded-md px-6 py-1 font-medium">Crée</button>
                    <div className="text-xl flex space-x-4 mr-4 text-white">
                        <button><TbInfoSquareRoundedFilled /></button>
                        <button><IoIosNotifications /></button>
                        <button><MdAccountCircle /></button>
                    </div>
            </header>
        </div>
        <body className="flex justify-between items-center">
                <label className="outline outline-1 outline-slate-400 px-3 ml-2 rounded-sm">
                    Tableau
                </label>
                <p>Team Board</p>
                <button className="bg-blue-200 rounded-sm px-2 mt-3 font-medium">Invite +</button>
                <div className=" flex justify-center items-center gap-2">
                    <button className=" flex justify-center items-center bg-blue-200 rounded-sm px-2  font-medium shadow-md hover:shadow-lg"><FaCalendarDays />Calendrier</button>
                    <button className="flex justify-center items-center bg-blue-200 rounded-sm px-2 font-medium shadow-md hover:shadow-lg mr-2"><CiMenuKebab />Afficher le menu</button>
                </div>
                {/* <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
                    {props.children} blabla
                </button>
                <button ref={setNodeRef} style={style}>
                    {props.children} hello
                </button> */}
            </body>
        </>
    )
}