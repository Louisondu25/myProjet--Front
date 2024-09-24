import { NavLink, useNavigate } from 'react-router-dom';
import { http } from '../../../Infrastructure/Http/axios';
import { useState } from 'react';

export const Giversdashboard = () => {
  const [, setFilteredLists] = useState([]);
  const navigate = useNavigate();

  const pageSize = 20;
  const currentPage = 1;

  const handleFinish = async (boardId: string) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error("No token found, please log in again.");
        return;
      }

      const response = await http.get(`/board/${boardId}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        const listsResponse = await http.get(`/listes_by_filters`, {
          headers: {
            'Authorization': 'Bearer ' + token,
          },
          params: {
            limit: pageSize,
            page: currentPage,
          },
        });

        if (listsResponse.status >= 200 && listsResponse.status < 300) {
          const listsData = listsResponse.data;

          if (listsData && listsData.results && Array.isArray(listsData.results)) {
            const filtered = listsData.results.filter((list: { board_id: string }) => list.board_id === boardId);
            setFilteredLists(filtered);
            // Redirection vers dashboard avec state
            navigate('/dashboard', { state: { lists: filtered } });
          } else {
            console.log('Invalid listsData:', listsData);
          }
        } else {
          throw new Error(`Error fetching lists data: ${listsResponse.status}`);
        }
      } else {
        throw new Error(`Error fetching board data: ${response.status}`);
      }
    } catch (error) {
      console.error("Error during board or lists fetch:", error);
    }
  };

  const handleFinishClick = async (boardId: string) => {
    await handleFinish(boardId);
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <h1 className="text-center text-3xl font-bold mt-5">Création de ton compte</h1>
      <div className="text-center mt-16">
        <p className="text-xl mb-16">Étape 1: Crée ton compte</p>
        <p className="text-xl mb-16">Étape 2 : Clique sur Crée un tableau</p>
        <NavLink to={"/premierecreationtableaux"}>
          <button className="next-button text-center bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg mb-10">
            Crée un Tableau
          </button>
        </NavLink>
        <p className="text-xl mb-4">Étape 3 : Cliquez sur terminer</p>
        <button
          className="next-button text-center bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg mt-14"
          onClick={() => handleFinishClick('66e5981ee53acf69944d8d01')}
        >
          Terminée
        </button>
      </div>
    </div>
  );
};
