import { NavLink, useNavigate } from "react-router-dom";
import { http } from '../../../Infrastructure/Http/axios'; // Assurez-vous que http est bien configuré

export const Giversdashboard = () => {
  const navigate = useNavigate();

  const handleFinish = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
      const boardId = '66e5981ee53acf69944d8d01'; // Replace with the actual board ID you want to retrieve
      const response = await http.get(`/board/${boardId}`, {
        headers: {
          'Authorization': 'Bearer ' + token, // Use the retrieved token
        },
      });
      console.log('Response data:', response.data);
      if (response.status >= 200 && response.status < 300) {
        const boardData = response.data;
        navigate('/dashboard', { state: { board: boardData } });
      } else {
        throw new Error(`Error fetching board data: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
            <button className="next-button text-center bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg mt-14" onClick={handleFinish}>Terminée</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};