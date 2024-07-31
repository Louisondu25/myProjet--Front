import { NavLink } from "react-router-dom";


export const Sendrecoverylink = ()=> {
    return(
        <>
        <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-4xl font-bold flex items-center justify-center mb-4">
        <img src="/public/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg" width={140} alt="Logo" />
        <h1>Tree low</h1>
      </div>
      <p className="text-center">Connectez-vous pour Continuer:</p>
      <p className="mt-6">Nous vous enverrons un lien de récupération à l'adresse suivante:</p>
      <input type="email" placeholder="Saisissez votre adresse email" className="w-1/3 p-1 outline outline-1 outline-gray-400 focus:outline-gray-500 focus:ring-1 focus:ring-gray-500 rounded-md" />
      <button className="w-80 p-2 mb-4 mt-4 bg-blue-600 shadow-md hover:shadow-lg rounded-md px-6 py-2 text-white ">Envoyer le lien de récupération</button>
        <NavLink to={"/connect"}>
        <button className="mt-16 underline">Retour à la page de connexion</button>
        </NavLink>
      </div>
        </>
    )
}