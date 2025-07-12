import { useState, useEffect } from 'react';
import { NavLink, useParams  } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaCalendarDays, FaPlus } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { http } from '../../Infrastructure/Http/axios';
import { CiMenuKebab } from "react-icons/ci";
import { GiCardAceSpades } from "react-icons/gi";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { FiLogOut } from "react-icons/fi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { LuFolderArchive } from "react-icons/lu";

interface List {
  _id: string;
  title?: string;
  board_id: string;
  tasks?: Task[];
  archive?: boolean;
}

interface ListArchive {
    id: string;
    title: string;
    archive: boolean;
}

interface Task {
  _id: string;
  title: string;
  content: string;
  category_id: string;
}

interface Card {
  _id: string;
  title: string;
  content: string;
  category_id: string;
  archive?: boolean;
}


export const Dashboard = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [title, setTitle] = useState('');
  const [lists, setLists] = useState<List[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [, setFetchingCards] = useState(false);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [showArchiveDropdown, setshowArchiveDropdown] = useState(false);
  const [showArchivelistsDropdown, setshowArchivelistsDropdown] = useState(false);
  const [token,] = useState(localStorage.getItem('token'));
  const [archiveCardName, setArchiveCardName] = useState('');
  const [archiveListName, setArchiveListName] = useState('');
  const [, setArchivedCards] = useState<Task[]>([]);
  const { boardId } = useParams<{ boardId: string }>();

useEffect(() => {
  const fetchListsAndCards = async () => {
    if (!boardId) {
      console.warn("Aucun boardId trouvé dans l'URL");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token manquant");
      return;
    }

    try {
      // Récupération des listes
      const listsRes = await http.get(`/listes_by_filters`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 100, page: 1 },
      });

      const allLists: List[] = listsRes.data?.results || [];
      const filteredLists = allLists.filter(
        (list) => list.board_id === boardId && !list.archive
      );

      // Récupération des cartes
      const cardsRes = await http.get(`/tasks_by_filters`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 100, page: 1 },
      });

      const allCards: Card[] = cardsRes.data?.results || [];
      const filteredCards = allCards.filter(
        (card) =>
          filteredLists.some((list) => list._id === card.category_id) &&
          !card.archive
      );

      // Mise à jour des états
      setLists(filteredLists);
      setCards(filteredCards);
      setFilteredCards(filterCardsByListIds(filteredCards, filteredLists));
    } catch (error) {
      console.error("Erreur lors du chargement des listes/cartes :", error);
    }
  };

  fetchListsAndCards();
}, [boardId]);

useEffect(() => {
  if (lists.length > 0 && cards.length > 0) {
    const filtered = filterCardsByListIds(cards, lists);
    console.log('Filtered cards after moving:', filtered);
    setFilteredCards(filtered);
  } else {
    console.log('Les cartes ou les listes sont vides, impossible de filtrer');
  }
}, [cards, lists]);

useEffect(() => {
  const ids = filteredCards.map((c) => c._id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    console.warn("⚠️ Cartes dupliquées détectées : ", duplicateIds);
  }
}, [filteredCards]);

  const handleClick = () => {
    setIsPublic(!isPublic);
  };

  const handleButtonClick = () => {
    setShowDropdown(true);
  };

  const getCardIdByName = (cardName: string) => {
  const card = cards.find((card) => card.title === cardName); 
  return card ? card._id : null;
};

const handleArchivedAcceptClick = async () => {
    try {
        // Vérifier si le champ pour le nom de la carte à archiver est rempli
        if (!archiveCardName.trim()) {
            alert("Veuillez entrer le nom de la carte à archiver.");
            return;
        }

        // Récupérer l'ID de la carte en fonction du nom
        const cardId = getCardIdByName(archiveCardName);
        if (!cardId) {
            alert(`Carte non trouvée : ${archiveCardName}`);
            return;
        }

        // Archiver la carte en mettant à jour le champ "archive" à true
        await http.put(`/task/${cardId}`, { archive: true }, {
            headers: { 'Authorization': 'Bearer ' + token },
        });
        console.log('Champ archive mis à jour pour la carte !');

        // Rafraîchir les cartes non archivées et les cartes archivées
        await fetchAllCards(); // Rafraîchir les cartes non archivées
        await fetchArchivedCards(); // Rafraîchir les cartes archivées

        // Réinitialiser l'input après l'archivage
        setArchiveCardName('');
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la carte:", error);
    }
};

const fetchAllCards = async () => {
    try {
        console.log('Tentative de récupération de toutes les cartes non archivées...');
        
        // Appel à l'API pour récupérer les cartes non archivées
        const response = await http.get('/tasks_by_filters', {
            headers: { 'Authorization': 'Bearer ' + token },
            params: {
                page: 1,  // Numéro de la page pour la pagination
                limit: 11, // Nombre de cartes par page
                archive: false // Récupérer uniquement les cartes non archivées
            }
        });

        // Vérifier si la réponse contient des résultats
        if (response.data && response.data.results) {
            console.log('Cartes non archivées récupérées:', response.data.results);
            setCards(response.data.results); // Mettre à jour l'état avec les cartes non archivées
        } else {
            console.warn('Aucune carte non archivée trouvée dans la réponse:', response.data);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des cartes:", error);
    }
};

const fetchArchivedCards = async () => {
    try {
        console.log('Tentative de récupération des cartes archivées...');
        
        // Appel à l'API pour récupérer les cartes archivées
        const response = await http.get('/tasks_by_filters', {
            headers: { 'Authorization': 'Bearer ' + token },
            params: {
                page: 1,  // Numéro de la page pour la pagination
                limit: 11, // Nombre de cartes par page
                archive: true // Récupérer uniquement les cartes archivées
            }
        });

        // Vérifier si la réponse contient des résultats
        if (response.data && response.data.results) {
            console.log('Cartes archivées récupérées:', response.data.results);
            setArchivedCards(response.data.results); // Mettre à jour l'état avec les cartes archivées
        } else {
            console.error('Aucune carte archivée trouvée dans la réponse:', response.data);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des cartes archivées:", error);
    }
};

const getListIdByName = (listName: string) => {
  const list = lists.find((list) => list.title === listName); // Recherche la liste par son titre
  return list ? list._id : null; // Retourne l'ID si trouvé, sinon null
};

const handleArchivedListAcceptClick = async () => {
    try {
        if (!archiveListName.trim()) {
            alert("Veuillez entrer le nom de la liste à archiver.");
            return;
        }

        const listId = getListIdByName(archiveListName);
        if (!listId) {
            alert(`Liste non trouvée : ${archiveListName}`);
            return;
        }

        // Vérifier l'état actuel de la liste
        const response = await http.get(`/liste/${listId}`, {
            headers: { 'Authorization': 'Bearer ' + token },
        });

        const currentList = response.data;
        if (currentList.archive === undefined || currentList.archive === false) {
            await http.put(`/liste/${listId}`, { archive: true }, {
                headers: { 'Authorization': 'Bearer ' + token },
            });
            console.log('Champ archive mis à jour pour la liste !');
        } else {
            console.log('La liste est déjà archivée. Aucune mise à jour nécessaire.');
            return;
        }

        // Rafraîchir les listes après archivage, ne montrant que celles non archivées
        await fetchAllLists(); // Charge uniquement les listes non archivées
        await fetchArchivedLists();

        // Réinitialiser l'input après l'archivage
        setArchiveListName('');
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la liste:", error);
    }
};

const fetchAllLists = async () => {
    try {
        console.log('Tentative de récupération de toutes les listes non archivées...');
        const response = await http.get('/listes_by_filters', {
            headers: { 'Authorization': 'Bearer ' + token },
            params: {
                page: 1,
                limit: 16,
                archive: false, // Récupérer uniquement les listes non archivées
            }
        });
        console.log('Réponse pour fetchAllLists (non archivées):', response.data);

        if (response.data && response.data.results) {
            setLists(response.data.results);
        } else {
            console.warn('Aucun résultat trouvé dans la réponse:', response.data);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des listes:", error);
    }
};

const fetchArchivedLists = async () => {
    try {
        console.log('Tentative de récupération des listes archivées...');
        
        const response = await http.get(`/listes_by_filters?page=1&limit=16`, {
            headers: { 'Authorization': 'Bearer ' + token },
        });

        // Filtrer pour garder uniquement les listes archivées
        const archivedLists = response.data?.results.filter((list: ListArchive) => list.archive === true);

        setLists(archivedLists);

        console.log('Listes archivées récupérées:', archivedLists);
    } catch (error) {
        console.error("Erreur lors de la récupération des listes archivées:", error);
    }
};

const handleArchivedbuttonclick = () => {
  setshowArchiveDropdown(true);
}

const handleArchivedlistsbuttonclick = () => {
  setshowArchivelistsDropdown(true);
}

const handleAcceptClick = async () => {
  if (!title.trim()) { // trim() pour éviter les titres vides avec espaces
    alert('Veuillez remplir tous les champs.');
    return;
  }

  try {
    const requestBody = { title: title.trim(), board_id: '67fad43ac68de4587fc4b4c1' };
    const response = await http.post('/liste', requestBody);

    if (response.data && response.data._id) {
      setLists(prevLists => [...prevLists, response.data]); // Utiliser fonction de setState pour fiabilité
      setShowDropdown(false);
      await fetchCards(); // Bien await pour éviter concurrence d'appels
      setTitle(''); // Reset input après succès
    } else {
      console.error('Invalid response data');
      alert('Réponse invalide du serveur');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error while creating a new list:', error);
      alert('Erreur lors de la création de la liste : ' + error.message);
    } else {
      console.error('Unexpected error:', error);
      alert('Une erreur inattendue est survenue.');
    }
  }
};

  const handleExitClick = () => {
    setShowDropdown(false);
  };

  const handleArchivedExitClick = () => {
    setshowArchiveDropdown(false);
  };

  const handleArchivedListsExitClick = () => {
    setshowArchivelistsDropdown(false);
  };

  const fetchLists = async () => {
    console.log('fetchLists called');
    try {
      const response = await http.get(`/listes_by_filters`);
      console.log('fetchLists response:', response);
      if (response.status !== 200) {
        throw new Error(`Error fetching lists: ${response.status} ${response.statusText}`);
      }
      const data = response.data;
      const newLists = data.results || [];
      console.log('fetchLists newLists:', newLists);
      setLists(newLists);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

const fetchCards = async () => {
  console.log('Fetching cards...');
  setFetchingCards(true);
  try {
    // Paralléliser les requêtes pour chaque liste
    const cardsByList = await Promise.all(
      lists.map(async (list) => {
        console.log(`Fetching cards for list ${list._id}`);
        const response = await http.get(`/tasks_by_filters?list_id=${list._id}`);
        if (response.status !== 200) {
          throw new Error(`Error fetching cards for list ${list._id}: ${response.status} ${response.statusText}`);
        }
        return response.data.results || [];
      })
    );

    // Aplatir les résultats
    const cards = cardsByList.flat();

    // Ajout du champ archive si absent, et collecte des cartes à mettre à jour backend
    const cardsToUpdate: string[] = [];
    const updatedCards = cards.map(card => {
      if (typeof card.archive === 'undefined') {
        cardsToUpdate.push(card._id);
        return { ...card, archive: false };
      }
      return card;
    });

    setCards(updatedCards);

    // Mise à jour backend pour les cartes concernées (en parallèle)
    await Promise.all(cardsToUpdate.map(cardId => updateCardWithArchiveField(cardId, false)));
    await Promise.all(cardsToUpdate.map(cardId => updateCardWithArchiveField(cardId, true)));

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching cards:', error.message);
      alert('Error fetching cards: ' + error.message);
    } else {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred.');
    }
  } finally {
    setFetchingCards(false);
  }
};

const updateCardWithArchiveField = async (cardId: string, archive: boolean) => {
  try {
    const updatedCards = cards.map((card) =>
      card._id === cardId ? { ...card, archive } : card
    );
    setCards(updatedCards);
    setFilteredCards(filterCardsByListIds(updatedCards, lists));

    const response = await http.put(`/task/${cardId}`, { archive });
    if (response.status !== 200) throw new Error("Erreur de mise à jour du serveur");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'archive:", error);
  }
};

const filterCardsByListIds = (cards: Card[], lists: List[]) => {
  const validIds = new Set(lists.map(list => list._id));
  return cards.filter(card => validIds.has(card.category_id));
};

const onDragEnd = async (result: DropResult) => {
  const { destination, source, draggableId } = result;

  // ⛔ Aucun déplacement ou position identique
  if (
    !destination ||
    (destination.droppableId === source.droppableId &&
      destination.index === source.index)
  ) {
    return;
  }

  // 📦 Récupération de la carte déplacée
  const draggedCard = cards.find((c) => c._id === draggableId);
  if (!draggedCard) {
    console.error("Carte déplacée non trouvée:", draggableId);
    return;
  }

  // 🧠 Mémoriser l'état actuel pour rollback
  const previousCards = [...cards];
  const previousLists = [...lists];

  // 📝 Mise à jour de la carte avec la nouvelle catégorie
  const updatedCard = {
    ...draggedCard,
    category_id: destination.droppableId,
  };

  // 🧹 Mise à jour du tableau de cartes
  const newCards = cards.map((c) =>
    c._id === draggedCard._id ? updatedCard : c
  );

  // 🧭 Mise à jour des listes
  const newLists = lists.map((list) => {
    const currentTasks = list.tasks || [];

    // Liste source : on retire la carte
    if (list._id === source.droppableId) {
      return {
        ...list,
        tasks: currentTasks.filter((t) => t._id !== draggedCard._id),
      };
    }

    // Liste destination : on ajoute la carte, sans doublon
    if (list._id === destination.droppableId) {
      const alreadyInList = currentTasks.some(
        (t) => t._id === draggedCard._id
      );

      return {
        ...list,
        tasks: alreadyInList
          ? currentTasks // évite duplication
          : [...currentTasks, updatedCard],
      };
    }

    // Autres listes : inchangées
    return list;
  });

  // 🔁 Appliquer les nouveaux états
  setCards(newCards);
  setLists(newLists);
  setFilteredCards(filterCardsByListIds(newCards, newLists));

  // 🔐 Enregistrement distant
  try {
    const response = await http.put(`/task/${draggedCard._id}`, {
      category_id: updatedCard.category_id,
    });

    if (response.status !== 200) throw new Error("Erreur de mise à jour");

    // ✅ Optionnel : forcer un re-fetch pour cohérence
    await fetchLists();
    await fetchCards();
  } catch (error) {
    console.error("❌ Erreur API, rollback...", error);
    setCards(previousCards);
    setLists(previousLists);
    setFilteredCards(filterCardsByListIds(previousCards, previousLists));
  }
};

  return (
     <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full h-screen bg-gradient-to-b to-blue-500 from-cyan-500 to-white">
        <header className="bg-blue-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center ml-5 text-white">
              <img src="/Natural_Green_Interior_Design_Mood_Board_Photo_Collage_1 (2).svg" alt="Logo_Tree-low" width={60} />
              <h1>Tree Low</h1>
            </div>
            <button className={`bg-white rounded-md px-6 py-2 font font-medium ${isPublic ? 'text-black' : 'text-black'}`} onClick={handleClick}>
              {isPublic ? 'Public' : 'Private'}
            </button>
            <div className="flex items-center">
              <CiSearch className="text-white" />
              <input type="text" placeholder="Rechercher" className="rounded-sm" />
            </div>
            <NavLink to={"/createboard"}>
              <button className="bg-white rounded-md px-6 py-1 font-medium">Crée</button>
            </NavLink>
            <div className="text-xl flex space-x-4 mr-4 text-white">
              <button onClick={() => setShowHelpDropdown(!showHelpDropdown)}><TbInfoSquareRoundedFilled /></button>
                {showHelpDropdown && (
                  <div className="dropdown-help absolute bg-white rounded-md shadow-md p-4 mt-6 text-black border border-gray-500">
                    <ul>
                      <h1 className='mb-5 font-bold'>Astuces a Connaitre</h1>
                      <li>
                        <span className="font-medium text-xl mb-2">Tip 1:</span> Appuyer sur <strong>Ajouter une carte</strong> pour créer une carte.
                      </li>
                      <li>
                        <span className="font-medium text-xl mb-2">Tip 2:</span> Appuyer sur <strong>le bouton dossier</strong> pour archiver vos cartes.
                      </li>
                      <li>
                        <span className="font-medium text-xl mb-2">Tip 3:</span> Appuyer sur <strong>Ajouter une liste</strong> pour créer une liste.
                      </li>
                      <li>
                        <span className="font-medium text-xl mb-2">Tip 4:</span> Appuyer sur <strong>le bouton public/privé</strong> pour mettre en public ou en privé.
                      </li>
                      <p className='mt-4 mb-4 font-bold'> Et d'autres astuces :</p>
                      <li>
                        <span className="font-medium text-xl mb-2">Tip 5:</span> Ajouter des personnes avec <strong>le bouton invite</strong>.
                      </li>
                      <li>
                        <span className="font-medium text-xl mb-2">Tip 6:</span> Possibilité de <strong>créer</strong> d'autres tableaux.
                      </li>
                      <li>
                        <span className="font-medium text-xl mb-2">Tip 7:</span> Rappel : vous pouvez mettre votre tableau en privé ou public.
                      </li>
                      <p className='mt-4 font-bold'>Et plein d'autres choses à découvrir.</p>
                    </ul>
                  </div>
                )}

              <button><IoIosNotifications /></button>
              <button onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
                <MdAccountCircle />
              </button>
              {showProfileDropdown && (
                <div className="dropdown-profile absolute bg-white rounded-md shadow-md p-4 mt-6 text-black border border-gray-500">
                  <ul>
                    <li className='mb-2'>
                      <span className='font-medium text-xl'>Full Name: </span> Detenteur du tableau 1 Iencli
                    </li>
                    <li className='mb-2'>
                      <span className='font-medium text-xl'>Pseudo: </span> BestIencli4ever
                    </li>
                    <li className='mb-2'>
                      <span className='flex items-center'><span className='font-medium text-xl underline'><IoIosMail className='mr-2'/></span> Iencli@gmail.com</span>
                    </li>
                    <li className='mb-2'>
                      <span className='flex items-center'><span className='font-medium text-xl underline'><MdAccountCircle /></span> <button className='ml-2'>Manage account</button></span>
                    </li>
                    <li className='mb-2'>
                      <span className='flex items-center'><span className='font-medium text-xl underline'><IoMdHelpCircleOutline /></span> <button className='ml-2'>Help</button> </span>
                    </li>
                    <li>
                     <span className='flex items-center'><span className='font-medium text-xl underline'><FiLogOut /></span> <button className='ml-2'>LogOut</button></span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="flex justify-between items-center">
          <label className="outline outline-1 outline-slate-400 px-3 ml-2 rounded-sm">Tableau</label>
          <p>Team Board</p>
          <NavLink to={"/membres"}>
            <button className="flex justify-center items-center bg-blue-200 rounded-sm px-2 mt-3 font-medium mr-24">
              Invite <FaPlus />
            </button>
          </NavLink>
          <div className="flex gap-1">
            <NavLink to={"/calendar"}>
              <button className="flex justify-center items-center bg-blue-200 rounded-sm px-2 font-medium shadow-md hover:shadow-lg">
                <FaCalendarDays /> Calendrier
              </button>
            </NavLink>
            <NavLink to={"/menu"}>
              <button className="flex justify-center items-center bg-blue-200 rounded-sm px-2 font-medium shadow-md hover:shadow-lg mr-2">
                <CiMenuKebab /> Afficher le menu
              </button>
            </NavLink>
          </div>
        </div>
        <div className="flex gap-20 mt-1">
          <div>
            <div className="flex">
              {lists.length > 0 ? (
                <ul className="mt-2 flex gap-2 ml-2">
                  {lists.map((list) => {
                    const cardsForList = filteredCards.filter(
                      (card) => card.category_id === list._id
                    );

                    return (
                      <Droppable key={list._id} droppableId={list._id.toString()}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="bg-gray-400 p-4 rounded-md shadow-md"
                          >
                            <h2 className="card-title">{list.title}</h2>
                            <ul className="card-tasks">
                              {cardsForList.map((card, index) => (
                                <Draggable
                                  key={card._id}
                                  draggableId={card._id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="card-task bg-white px-5 rounded-md mt-1"
                                    >
                                      <p>{card.title}</p>
                                      <p>{card.content}</p>
                                    </li>
                                  )}
                                </Draggable>
                              ))}
                            </ul>

                            <NavLink to={"/carte"}>
                              <button className="flex justify-center items-center bg-white rounded-sm px-3 font-medium shadow-md hover:shadow-lg mt-2 mb-2">
                                <GiCardAceSpades /> Ajouter une carte
                              </button>
                            </NavLink>

                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    );
                  })}
                </ul>
              ) : (
                <p>No lists available</p>
              )}
            </div>
          </div>
          <div>
            <button
              className="flex justify-center items-center bg-white rounded-md px-11 py-1 font-medium shadow-md hover:shadow-lg ml-3 mr-2"
              onClick={handleButtonClick}
            >
              <FaPlus /> Ajouter une liste
            </button>
            {showDropdown && (
              <div className="absolute bg-white rounded-md shadow-md p-4 mt-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 pl-10 text-sm text-gray-700"
                  placeholder="Entrer un titre..."
                />
                <div className="flex justify-between">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={handleAcceptClick}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={handleExitClick}
                  >
                    <FaXmark />
                  </button>
                </div>
              </div>
            )}
            <div>
                <button onClick={handleArchivedbuttonclick} className="flex justify-center items-center bg-white rounded-md px-11 py-1 font-medium shadow-md hover:shadow-lg ml-3 mr-2 mt-2">
                    <LuFolderArchive className='mr-2'/> Archives Cartes
                </button>
                {showArchiveDropdown && (
                    <div className="absolute bg-white rounded-md shadow-md p-4 mt-2">
                        <input
                            type="text"
                            value={archiveCardName}
                            onChange={(e) => setArchiveCardName(e.target.value)}
                            className="w-full p-2 pl-10 text-sm text-gray-700 px-5"
                            placeholder="Saisissez la carte..."
                        />
                        <div className="flex justify-between">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                                onClick={handleArchivedAcceptClick}
                            >
                                Accept
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                                onClick={handleArchivedExitClick}
                            >
                                Refuser
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div>
              <button onClick={handleArchivedlistsbuttonclick} className="flex justify-center items-center bg-white rounded-md px-12 py-1 font-medium shadow-md hover:shadow-lg ml-3 mr-2 mt-2"> <LuFolderArchive className='mr-2'/>Archives Listes</button>
                {showArchivelistsDropdown && (
                      <div className="absolute bg-white rounded-md shadow-md p-4 mt-2">
                          <input
                              type="text"
                              value={archiveListName}
                              onChange={(e) => setArchiveListName(e.target.value)}
                              className="w-full p-2 pl-10 text-sm text-gray-700 px-5"
                              placeholder="Saisissez la liste..."
                          />
                          <div className="flex justify-between">
                              <button
                                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                                  onClick={handleArchivedListAcceptClick}
                              >
                                  Accept
                              </button>
                              <button
                                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                                  onClick={handleArchivedListsExitClick}
                              >
                                  Refuser
                              </button>
                          </div>
                      </div>
                  )}
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};