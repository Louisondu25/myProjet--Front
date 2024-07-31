import { NavLink } from "react-router-dom"


export const Giversdashboard = () =>{
    return(
        <>
            <h1 className="text-center text-3xl font-bold mt-8">Création de ton compte</h1>
        <div className="text-center mt-24">
                <p className="text-xl mt-16">Étape 1: Crée ton compte</p>
                <p className="text-xl mt-16">Étape 2 : Clique sur Crée un tableau</p>
                <p className="text-xl mt-16">Étape 3 : Cliquez sur terminer</p>
            <NavLink to={"/dashboard"}>
                <button className="next-button text-center mt-16 bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg">Terminée</button>
            </NavLink>
        </div>
        </>
    )
}