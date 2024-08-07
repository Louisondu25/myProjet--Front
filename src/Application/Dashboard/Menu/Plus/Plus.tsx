import { GiCardAceSpades } from "react-icons/gi";
import { CiViewList } from "react-icons/ci";
import { BsTable } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";

export const Plus = () => {
    return(
        <>
        <div className="h-screen w-full flex flex-col justify-center items-center">
        <h1 className="font-medium text-2xl">Plus</h1>
        <button>
        <h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-28">
        <GiCardAceSpades  className="mr-2"/> Carte Archivée
      </h2>
      </button>
      <p className="text-lg text-gray-600">Les cartes archivées</p>
      <button>
        <h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-28">
        <CiViewList  className="mr2"/> Liste Archivée
      </h2>
      </button>
      <p className="text-lg text-gray-600">Les listes archivées</p>
      <button>
        <h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-28">
        <BsTable  className="mr-2"/> Tableaux
      </h2>
      </button>
      <p className="text-lg text-gray-600">les noms, description et visibilité(privée ou publique)</p>

      <button>
        <h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-28">
        <FaCalendarAlt  className="mr-2"/> Calendrier
      </h2>
      </button>
      <p className="text-lg text-gray-600">Paramètre  calendrier</p>
        </div>
        </>
    )
}