import { CiSearch } from "react-icons/ci";

export const SearchArchivedCard = () => {
    return (
        <>
        <div className="w-full h-screen flex flex-col items-center bg-gradient-to-b to-blue-500 from-cyan-500 to-white p-8">
            <h1 className="font-medium text-2xl mb-20">Carte archivée</h1>
            <div className="flex items-center">
                <CiSearch className="text-white" />
                <input type="text"  placeholder=" Recherche" className="px-6 py-1 rounded-md"/>
            </div>
            <div className="flex">
                <p className="mr-40 font-medium mt-20">Nom:</p>
            </div>
        </div>
        </>
    )
}