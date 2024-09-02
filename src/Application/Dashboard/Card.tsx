import { CiImageOn } from "react-icons/ci";
import { BsListTask } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineVideoLabel } from "react-icons/md";
import { VscChecklist } from "react-icons/vsc";
import { MdOutlineUpdate } from "react-icons/md";
import { FiPaperclip } from "react-icons/fi";

export const Card = () => {
  return (
    <>
      <header className="h-[50vh] bg-gradient-to-r to-blue-500 from-cyan-500 to-white relative">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("/banner-image.jpg")' }}>
          <button className="absolute bottom-0 right-0 bg-gray-700 text-white mr-2 px-6 py-1 rounded-sm flex items-center"><CiImageOn className="mr-2" /> Banniere</button>
        </div>
      </header>
     <div className="flex flex">
        <div className=" flex flex-col space-y-14 ml-2 font-medium">
         <h1 className="text-2xl">Title</h1>
         <input type="text" placeholder="Saisissez votre titre..."  className="w-60 p-1 mb-4 outline outline-1 outline-gray-400 focus:outline-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md mt-3" />
      <p>membres</p>
      <h2 className="flex items-center font-bold"><BsListTask  className="mr-2"/>Description</h2>
      <input type="text" placeholder="Description de votre carte..." className="w-60 p-1 mb-4 outline outline-1 outline-gray-400 focus:outline-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md mt-3"/>
      <h2 className="flex items-center font-bold"><FaCommentAlt className=" mr-2" />Commentaires</h2>
      <input type="text" placeholder="Ecrivez votre commentaire..." className="w-60 p-1 mb-4 outline outline-1 outline-gray-400 focus:outline-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md mt-3"/>
     </div>
    <div className="text-center">
        <h2 className="text-center font-bold">Date echeance</h2>
        <div className="flex items-center rounded-md p-2">
            <input type="checkbox" className="mr-2" />
            <input type="datetime-local" className="w-full" />
            <span className="ml-2">
            <span id="selected-date"></span>
            <span id="selected-time"></span>
            <span id="selected-meridiem"></span>
            </span>
        </div>
    </div>
      <div className="absolute right-0">
  <h2 className="font-bold mr-5 ">Ajouter des cartes</h2>
  <div className="flex flex-col justify-end p-2 space-y-3">
    <button className="flex items-center bg-gray-300 rounded-sm mr-2"><IoPeopleSharp className="mr-2" />Membres</button>
    <button className="flex items-center bg-gray-300 rounded-sm mr-2"><MdOutlineVideoLabel className="mr-2" />Etiquettes</button>
    <button className="flex items-center bg-gray-300 rounded-sm mr-2"><VscChecklist className="mr-2" />Checklist</button>
    <button className="flex items-center bg-gray-300 rounded-sm mr-2"><MdOutlineUpdate className="mr-2" />Date Limite</button>
    <button className="flex items-center bg-gray-300 rounded-sm mr-2"><FiPaperclip className="mr-2" />Piece Jointe</button>
  </div>
</div>
     </div>
    </>
  )
}