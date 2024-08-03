import { NavLink } from "react-router-dom"


export const Giversdashboard = () =>{
    return(
        <>
  <div className="h-screen w-full flex flex-col">
    <h1 className="text-center text-3xl font-bold mt-5">Création de ton compte</h1>
    <div className="text-center mt-16">
      <p className="text-xl mb-16">Étape 1: Crée ton compte</p>
      <p className="text-xl mb-16">Étape 2 : Clique sur Crée un tableau</p>
      <p className="text-xl mb-4">Étape 3 : Cliquez sur terminer</p>
      <NavLink to={"/dashboard"}>
        <button className="next-button text-center bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg mt-14">Terminée</button>
      </NavLink>
    </div>
  </div>
</>
    )
}