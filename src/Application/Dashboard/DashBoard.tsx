import { useState, useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [lists, setLists] = useState<List[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [fetchingCards, setFetchingCards] = useState(false);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [showArchiveDropdown, setshowArchiveDropdown] = useState(false);
  const [token,] = useState(localStorage.getItem('token'));
  const [archiveCardName, setArchiveCardName] = useState('');
  const [, setArchivedCards] = useState<Task[]>([]);

  useEffect(() => {
  const initializeData = async () => {
    console.log('Initializing data...');
    if (location.state && location.state.lists) {
      console.log('Received lists from location state:', location.state.lists);
      setLists(location.state.lists);
    } else {
      await fetchLists();
    }

    if (location.state && location.state.cards) {
      console.log('Received cards from location state:', location.state.cards);
      setCards(location.state.cards);
    } else if (cards.length === 0 && !fetchingCards) {
      await fetchCards();
    }
  };

  if (location.state) {
    initializeData();
  } else {
    fetchLists();
    fetchCards();
  }
}, [location.state, fetchingCards, lists, cards]);

useEffect(() => {
  console.log('Lists state:', lists);
  console.log('Cards state:', cards);
}, [lists, cards]);

useEffect(() => {
  if (lists.length > 0 && cards.length > 0 && filteredCards.length === 0) {
    const filtered = filterCardsByListIds(cards, lists);
    console.log('Filtered cards:', filtered);
    setFilteredCards(filtered);
  }
}, [cards, lists]);

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
            if (!archiveCardName.trim()) {
                alert("Veuillez entrer le nom de la carte à archiver.");
                return;
            }

            const cardId = getCardIdByName(archiveCardName);
            if (!cardId) {
                alert(`Carte non trouvée : ${archiveCardName}`);
                return;
            }

            await http.put(`/task/${cardId}`, { archive: true }, {
                headers: { 'Authorization': 'Bearer ' + token },
            });
            console.log('Archive field updated successfully!');

            // Rafraîchir les données de la carte et les cartes archivées
            await fetchAllCards(); // Pour toutes les cartes
            await fetchArchivedCards(); // Pour les cartes archivées

        } catch (error) {
            console.error("Error making PUT request:", error);
        }
    };

const fetchAllCards = async () => {
    try {
        const response = await http.get('/tasks_by_filters', {
            headers: { 'Authorization': 'Bearer ' + token },
            params: {
                page: 1, // ou la page souhaitée
                limit: 11, // ou le nombre d'éléments par page
            }
        });

        // Vérifiez que la réponse contient des résultats
        if (response.data && response.data.results) {
            console.log('All fetched cards:', response.data.results); // Debugging
            setCards(response.data.results); // Mettez à jour l'état avec les résultats
        } else {
            console.error('No results found in the response:', response.data);
        }
    } catch (error) {
        console.error("Error fetching cards:", error);
    }
};

const fetchArchivedCards = async () => {
    try {
        const response = await http.get('/tasks_by_filters', {
            headers: { 'Authorization': 'Bearer ' + token },
            params: {
                page: 1, // Numéro de page pour la pagination
                limit: 11, // Nombre d'éléments par page
                archive: true
            }
        });

        // Vérifiez que la réponse contient des résultats
        if (response.data && response.data.results) {
            console.log('Fetched archived cards:', response.data.results); // Debugging
            setArchivedCards(response.data.results); // Assurez-vous que les résultats sont dans `data.results`
        } else {
            console.error('No archived results found in the response:', response.data);
        }
    } catch (error) {
        console.error("Error fetching archived cards:", error);
    }
};


const handleArchivedbuttonclick = () => {
  setshowArchiveDropdown(true);
}

const handleAcceptClick = async () => {
    if (!title) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    try {
        const requestBody = { title, board_id: '66e5981ee53acf69944d8d01' };
        const response = await http.post('/liste', requestBody);

        if (response.data && response.data._id) {
            const newLists = [...lists, response.data];
            setLists(newLists);
            setShowDropdown(false);

            // Fetch the updated cards from the server
            await fetchCards(); // Assurez-vous que ce soit await pour éviter des appels simultanés
        } else {
            console.error('Invalid response data');
        }
    } catch (error: unknown) {  // Spécifier le type ici
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
    const cards: Card[] = [];
    for (const list of lists) {
      console.log(`Fetching cards for list ${list._id}`);
      const response = await http.get(`/tasks_by_filters?list_id=${list._id}`);
      console.log('fetchCards response for list', list._id, ':', response);
      if (response.status !== 200) {
        throw new Error(`Error fetching cards for list ${list._id}: ${response.status} ${response.statusText}`);
      }
      const data = response.data;
      const newCards = data.results || [];
      console.log('Cards fetched for list', list._id, ':', newCards);
      cards.push(...newCards);
    }
    console.log('All fetched cards:', cards);

    // Update cards to include the archive field if it doesn't exist
    const updatedCards = cards.map((card) => {
      // Check if the archive field exists, if not, add it
      if (typeof card.archive === 'undefined') {
        return { ...card, archive: false }; // Default to false if not present
      }
      return card;
    });

    // Update the state with the modified cards
    setCards(updatedCards);

    // Call the function to update the backend for cards that were modified
    updatedCards.forEach((card) => {
      if (typeof card.archive === 'undefined') {
        updateCardWithArchiveField(card._id); // Update the backend
      }
    });

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

const updateCardWithArchiveField = async (cardId: string) => {
  try {
    await http.put(`/task/${cardId}`, { archive: false }); // Set the archive field to false
    console.log(`Card ${cardId} updated with archive field.`);
  } catch (error) {
    console.error(`Error updating card ${cardId}:`, error);
  }
};

const filterCardsByListIds = (cards: Card[], lists: List[]) => {
  console.log('Filtering cards based on lists...');

  // Affiche toutes les cartes avant le filtrage
  console.log('All cards before filtering:', cards);

  const filteredCards = cards.filter((card) => {
    // Vérifie si le category_id de la carte correspond à une liste
    const match = lists.some((list) => list._id === card.category_id);

    // Log de débogage pour chaque carte
    console.log(`Card ${card._id} has category_id ${card.category_id}. Match found: ${match}`);

    return match;
  });

  // Affiche les cartes filtrées
  console.log('Filtered cards:', filteredCards);

  return filteredCards;
};

const onDragEnd = async (result: DropResult) => {
  console.log('onDragEnd result:', result);
  const { destination, source } = result;

  // If the item was dropped outside of a droppable area, do nothing
  if (!destination) {
    return;
  }

  // If the item was dropped in the same position, do nothing
  if (destination.droppableId === source.droppableId && destination.index === source.index) {
    return;
  }

  // Get the card that was dragged
  const card = cards.find((card) => card._id === result.draggableId);

  console.log('Card being dragged:', card);

  // If the card is not found, do nothing
  if (!card) {
    console.error("Card not found");
    return;
  }

  // Check if the destination droppable ID is valid
  const validListId = lists.find((list) => list._id === destination.droppableId);
  if (validListId) {
    // Update the card's category_id property
    card.category_id = destination.droppableId;
    console.log('Card category_id updated to:', card.category_id);

    // Update the lists state
    const updatedLists = lists.map((list) => {
      if (list._id === source.droppableId) {
        return { ...list, tasks: list.tasks?.filter((task) => task._id !== card._id) };
      } else if (list._id === destination.droppableId) {
        return { ...list, tasks: list.tasks ? [...list.tasks, card] : [card] };
      }
      return list;
    });
    setLists(updatedLists);

    // Update the cards state
    const updatedCards = cards.map((c) => {
      if (c._id === card._id) {
        return { ...c, category_id: destination.droppableId };
      }
      return c;
    });
    console.log('Updated cards:', updatedCards);
    setCards(updatedCards);

    // Update the filteredCards state
    const updatedFilteredCards = filterCardsByListIds(updatedCards, updatedLists);
    console.log('Updated filteredCards:', updatedFilteredCards);
    setFilteredCards(updatedFilteredCards);

    // Send a request to the server to update the card's category_id property
    try {
      const response = await http.put(`/task/${card._id}`, { category_id: card.category_id });
      console.log('Response from update:', response);
      if (response.status === 200) {
        // Recharger les cartes après la mise à jour
        await fetchCards(); // Assurez-vous que ce soit await pour ne pas avoir des appels simultanés
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  } else {
    console.error('Invalid list ID');
    return;
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
                  {lists.map((list) => (
                   <Droppable key={list._id} droppableId={list._id.toString()}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="bg-gray-400 p-4 rounded-md shadow-md"
                      >
                        <h2 className="card-title">{list.title}</h2>
                        <ul className="card-tasks">
                          {filteredCards
                            .filter((card) => card.category_id === list._id) // Filtrer par category_id
                            .map((card, index) => (
                              <Draggable key={card._id} draggableId={card._id.toString()} index={index}>
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
                          <button className="flex justify-center items-center bg-white rounded-sm  px-3 font-medium shadow-md hover:shadow-lg mt-2 mb-2">
                            <GiCardAceSpades /> Ajouter une carte
                          </button>
                        </NavLink>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  ))}
                </ul>
              ) : (
                <p>No lists available</p>
              )}
            </div>
          </div>
          <div>
            <button
              className="flex justify-center items-center bg-white rounded-md px-6 py-1 font-medium shadow-md hover:shadow-lg ml-3 mr-2"
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
                <button onClick={handleArchivedbuttonclick} className="flex justify-center items-center bg-white rounded-md px-12 py-1 font-medium shadow-md hover:shadow-lg ml-3 mr-2 mt-2">
                    <LuFolderArchive className='mr-2'/> Archives
                </button>
                {showArchiveDropdown && (
                    <div className="absolute bg-white rounded-md shadow-md p-4 mt-2">
                        <input
                            type="text"
                            value={archiveCardName}
                            onChange={(e) => setArchiveCardName(e.target.value)}
                            className="w-full p-2 pl-10 text-sm text-gray-700 px-5"
                            placeholder="Saisissez la carte archivée..."
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
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};