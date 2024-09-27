import { NavLink, useNavigate } from 'react-router-dom';
import { http } from '../../../Infrastructure/Http/axios';

export const Giversdashboard = () => {

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
          const filteredLists = listsData.results.filter((list: { board_id: string }) => list.board_id === boardId);

          const cardsResponse = await http.get(`/tasks_by_filters`, {
            headers: {
              'Authorization': 'Bearer ' + token,
            },
            params: {
              limit: pageSize,
              page: currentPage,
            },
          });

          if (cardsResponse.status >= 200 && cardsResponse.status < 300) {
            const cardsData = cardsResponse.data;
            if (cardsData && cardsData.results && Array.isArray(cardsData.results)) {
              const cards = cardsData.results;
              console.log('Cards data:', cards); 
              console.log('Lists data:', filteredLists); 

              // Filter cards based on list IDs
              const filteredCards = cards.filter((card: { category_id: string }) => {
                return filteredLists.some((list: { _id: string }) => list._id === card.category_id);
              });

              console.log('Filtered cards:', filteredCards); 
              const cardsToPass = filteredCards; 
              navigate('/dashboard', { state: { lists: filteredLists, cards: cardsToPass } });
              return cardsToPass;
            } else {
              console.log('Invalid cardsData:', cardsData);
              return [];
            }
          } else {
            throw new Error(`Error fetching cards data: ${cardsResponse.status}`);
          }
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
