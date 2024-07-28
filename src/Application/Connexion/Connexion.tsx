import { FaMicrosoft } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { NavLink } from "react-router-dom"

export const Connect = () =>{
    return(
        <>
        <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-4xl font-bold flex items-center justify-center mb-4">
        <img src="/public/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg" width={140} alt="Logo" />
        <h1>Tree low</h1>
      </div>
      <p className="text-center">Connectez-vous pour Continuer:</p>
      <input type="email" placeholder="Saisissez votre adresse email" className="w-60 p-1 outline outline-1 outline-gray-400 focus:outline-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md mt-6" />
      <div className="flex items-center">
      <input type="email" placeholder="Saisissez votre mot de passe" className="w-60 p-1 outline outline-1 outline-gray-400 focus:outline-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md mt-3" />
      </div>
      <button className="w-60 p-2 mb-4 mt-3 bg-blue-600 shadow-md hover:shadow-lg rounded-md px-6 py-2 text-white ">Connexion</button>
      <p className="text-center">Ou continuer avec:</p>
      <div className="flex  flex-col justify-center mb-4 mt-6">
        <button className="w-60 flex items-center justify-center gap-2 outline outline-1 rounded-md px-6 py-2"><FcGoogle/> Google</button>
        <button className="w-60 flex items-center justify-center gap-2 outline outline-1 rounded-md mt-3 px-6 py-2"><FaMicrosoft /> Microsoft</button>
      </div>
       <div className="flex gap-16">
        <NavLink to={"/recoverylink"}>
        <button className=" underline mt-4">Vous ne pouvez pas vous connecter ?</button>
        </NavLink>
        <NavLink to={"/register"}>
       <button  className=" underline mt-4">Création du compte</button>
        </NavLink>
       </div>
      <hr className="w-1/3 border-1 border-black mt-6" />
    </div>
        </>
    )
}