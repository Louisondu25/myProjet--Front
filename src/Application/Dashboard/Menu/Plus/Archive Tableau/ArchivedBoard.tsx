import { CiSearch } from "react-icons/ci";


export const ArchivedBoard = () => {
    return(
       <>
  <div className="w-full h-screen flex flex-col items-center bg-gradient-to-b to-blue-500 from-cyan-500 to-white p-8">
    <h1 className="font-medium text-2xl mb-20">Tableau archivée</h1>
    <div className="flex items-center">
      <CiSearch className="text-white" />
      <input type="text" placeholder=" Recherche" className="px-6 py-1 rounded-md" />
    </div>
    <div className="max-w-full mx-auto"> 
      <div className="flex justify-start mb-4 gap-40">
        <p className="mt-20 font-medium">Tableaux:</p>
        <p className="mt-20 font-medium">Description:</p>
        <p className="mt-20 ml-14 font-medium">Visibilité:</p>
      </div>

      <div className="flex items-center gap-20 mb-3">
        <img src="https://picsum.photos/200/300?random=40" alt="Desert" className="w-20 h-20 object-cover rounded-md" />
        <div className="mb-2 ml-16">
          <h1 className="font-medium">Projet 1</h1>
          <p className="mt-1">Développement d'une nouvelle start up</p>
        </div>
        <h1 className="bg-white font-medium px-2 rounded-sm">Public</h1>
      </div>

      <div className="flex items-center gap-20 mb-3">
                <img src="https://picsum.photos/200/300?random=41" alt="Desert" className="w-20 h-20 object-cover rounded-md" />
        <div className="mb-2 ml-16">
          <h1 className="font-medium">Vacances</h1>
          <p className="mt-1">Répit et détente au bord de la mer et bronzette</p>
        </div>
        <h1 className="bg-white font-medium px-2 rounded-sm">Private</h1>
      </div>

      <div className="flex items-center gap-20 mb-3">
                        <img src="https://picsum.photos/200/300?random=42" alt="Desert" className="w-20 h-20 object-cover rounded-md" />
        <div className="mb-2 ml-16">
          <h1 className="font-medium">Mariage</h1>
          <p className="mt-1 ">Célébration de l'amour et de l'union et de la fête</p>
        </div>
        <h1 className=" bg-white font-medium px-2 rounded-sm">Public</h1>
      </div>

      <div className="flex items-center gap-20 mb-3">
                        <img src="https://picsum.photos/200/300?random=44" alt="Desert" className="w-20 h-20 object-cover rounded-md" />
        <div className="mb-2 ml-16">
          <h1 className="font-medium">Anniversaire</h1>
          <p className="mt-1">Fête de la vie et de la joie et de la bonne humeur</p>
        </div>
        <h1 className="bg-white font-medium px-2 rounded-sm">Private</h1>
      </div>
    </div>
  </div>
</>
    )
}