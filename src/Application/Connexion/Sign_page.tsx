import { NavLink } from "react-router-dom"

export const Signpage = () => {
    return(
        <>
        <div className=" w-full h-screen  bg-gradient-to-b to-blue-500 from-cyan-500  to-white">
            <header className=" bg-blue-800 ">
        <div className="flex justify-between items-center">
            <div className="flex items-center ml-5 text-white">
                <img src="/public/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg" alt="Logo_Tree-low" width={100} />
                <p className="ml-2">Tree low</p>
            </div>
            <div className="flex mr-5 space-x-5 text-white ">
                <NavLink to={"/register"}>
                <button className="bg-blue-900 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg ">Inscription</button>
                </NavLink>
                <NavLink to={"/connect"}>
                <button className= "bg-green-500 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg">Connexion</button>
                </NavLink>
            </div>
        </div>
        </header>
        <div className="text-center mt-32">
            <h1 className=" text-xl font-bold w-15">Tree Low Permet de travailler tous en étant organisés</h1>
            <p className="text-lg mt-36">Venez essayer </p>
            <NavLink to={"/giversdashboard"}>
            <button className="text-lg bg-white rounded-md mt-28 px-6 py-2 text-gray-800 font-medium shadow-md hover:shadow-lg">Crée un tableau</button>
            </NavLink>
            <p className="mt-28">Pret a utilisé Tree Low ?</p>
        </div>
        </div>
        </>
    )
}