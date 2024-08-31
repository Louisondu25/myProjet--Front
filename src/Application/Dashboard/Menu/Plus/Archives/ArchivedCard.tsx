import { CiSearch } from "react-icons/ci";

export const ArchivedCard = () => {
    return(
        <>
        <div className="w-full h-screen flex flex-col items-center bg-gradient-to-b to-blue-500 from-cyan-500 to-white p-8">
  <h1 className="font-medium text-2xl mb-20">Carte archivée</h1>
  <div className="flex items-center">
    <CiSearch className="text-white" />
    <input type="text"  placeholder=" Recherche" className="px-6 py-1 rounded-md"/>
  </div>
  <div className="grid grid-cols-1 gap-4">
    <div className="flex justify-start mb-4">
      <p className="mr-40  mt-20 font-medium">Nom:</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button className="bg-white rounded-sm px-1 shadow-md hover:shadow-lg">Rendez-vous médecin</button>
      <button className="bg-white rounded-sm px-1 shadow-md hover:shadow-lg">Doctolib</button>
      <button className="bg-white rounded-sm px-1 shadow-md hover:shadow-lg">Radiographie</button>
      <button className="bg-white rounded-sm px-1 shadow-md hover:shadow-lg">Prise de Sang</button>
    </div>
  </div>
</div>
        </>
    )
}