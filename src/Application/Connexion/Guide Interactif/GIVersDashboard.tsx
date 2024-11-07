import { NavLink, useNavigate } from 'react-router-dom';
import { http } from '../../../Infrastructure/Http/axios';
import { useState } from 'react';

interface List {
  _id: string;
  board_id: string;
  title: string;
  archive?: boolean;
}

interface Card {
  _id: string;
  title: string;
  content: string;
  category_id: string;
  start_at: string;
  archive?: boolean;
}

export const Giversdashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const pageSize = 20;
  const currentPage = 1;

  const handleFinish = async (boardId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Aucun token trouvé, veuillez vous reconnecter.");
        return;
      }

      const response = await http.get(`/board/${boardId}`, {
        headers: { 'Authorization': 'Bearer ' + token },
      });

      if (response.status >= 200 && response.status < 300) {
        const listsResponse = await http.get(`/listes_by_filters`, {
          headers: { 'Authorization': 'Bearer ' + token },
          params: { limit: pageSize, page: currentPage },
        });

        if (listsResponse.status >= 200 && listsResponse.status < 300) {
          const listsData = listsResponse.data;
          if (listsData?.results && Array.isArray(listsData.results)) {
            const filteredLists = listsData.results.filter((list: List) => list.board_id === boardId && !list.archive);

            const cardsResponse = await http.get(`/tasks_by_filters`, {
              headers: { 'Authorization': 'Bearer ' + token },
              params: { limit: pageSize, page: currentPage },
            });

            if (cardsResponse.status >= 200 && cardsResponse.status < 300) {
              const cardsData = cardsResponse.data;
              if (cardsData?.results && Array.isArray(cardsData.results)) {
                const cards = cardsData.results;
                console.log('Données des cartes :', cards);
                console.log('Données des listes :', filteredLists);

                const filteredCards = cards
                  .filter((card: Card) =>
                    filteredLists.some((list: List) => list._id === card.category_id) && !card.archive
                  );

                console.log('Cartes filtrées :', filteredCards);
                console.log('Lists to send:', filteredLists);
                console.log('Cards to send:', filteredCards);
                navigate('/dashboard', { state: { lists: filteredLists, cards: filteredCards } });
              } else {
                console.log('Données des cartes invalides :', cardsData);
              }
            } else {
              throw new Error(`Erreur lors de la récupération des données des cartes : ${cardsResponse.status}`);
            }
          } else {
            console.log('Données des listes invalides :', listsData);
          }
        } else {
          throw new Error(`Erreur lors de la récupération des données des listes : ${listsResponse.status}`);
        }
      } else {
        throw new Error(`Erreur lors de la récupération des données du tableau : ${response.status}`);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données du tableau ou des listes :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinishClick = async (boardId: string) => {
    await handleFinish(boardId);
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <h1 className="text-center text-3xl font-bold mt-5">Création de ton compte</h1>
      <div className="text-center mt-16">
        <p className="text-xl mb-16">Étape 1 : Crée ton compte</p>
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
          disabled={loading} // Désactiver le bouton pendant le chargement
        >
          {loading ? 'Chargement...' : 'Terminée'}
        </button>
      </div>
    </div>
  );
};
