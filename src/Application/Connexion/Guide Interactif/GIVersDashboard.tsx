import { NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';


export const Giversdashboard = () =>{

    const [, setBoard] = useState(null);
  const navigate = useNavigate();

  const handleFinish = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
      const response = await fetch('/board', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token, // Use the retrieved token
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching board data: ${response.status}`);
      }
      const data = await response.json();
      setBoard(data);
      navigate('/dahsboard', { state: { board: data } });
    } catch (error) {
      console.error(error);
    }
  };

  // Call the handleFinish function when the component mounts
  useEffect(() => {
    handleFinish();
  }, []);

    return(
        <>
  <div className="h-screen w-full flex flex-col">
    <h1 className="text-center text-3xl font-bold mt-5">Création de ton compte</h1>
    <div className="text-center mt-16">
      <p className="text-xl mb-16">Étape 1: Crée ton compte</p>
      <p className="text-xl mb-16">Étape 2 : Clique sur Crée un tableau</p>
      <NavLink to={"/premierecreationtableaux"}>
        <button className="next-button text-center bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg mb-10">Crée un Tableau</button>
      </NavLink>
      <p className="text-xl mb-4">Étape 3 : Cliquez sur terminer</p>
      <NavLink to={"/dashboard"}>
        <button className="next-button text-center bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg mt-14">Terminée</button>
      </NavLink>
    </div>
  </div>
</>
    )
}