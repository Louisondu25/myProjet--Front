import { NavLink, useLocation, } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaCalendarDays, FaPlus } from "react-icons/fa6";
//import { Testdnd } from "../Dashboard/Testdnd";
import { FaXmark } from "react-icons/fa6";
import { http } from '../../Infrastructure/Http/axios';
import { useState, useEffect } from 'react';
import { CiMenuKebab } from "react-icons/ci";

interface List {
  _id: string;
  title?: string;
  board_id: string;
  tasks?: Task[];
}

interface Task {
  _id: string;
  title: string;
}

interface Card {
  _id: string;
  title: string;
  category_id: string;
}

export const Dashboard = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [title, setTitle] = useState('');
  const location = useLocation();
  const [lists, setLists] = useState<List[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);

  const handleClick = () => {
    setIsPublic(!isPublic);
  };

  const handleButtonClick = () => {
    setShowDropdown(true);
  };

  const fetchLists = async () => {
    try {
      const response = await http.get(`/listes_by_filters`);
      if (response.status !== 200) {
        throw new Error(`Error fetching lists: ${response.status} ${response.statusText}`);
      }

      const data = response.data; 
      const newLists = data.results || []; 
      setLists((prevLists) => [...prevLists, ...newLists]); 
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

const fetchCards = async () => {
  try {
    const response = await http.get('/tasks_by_filters');
    if (response.status !== 200) {
      throw new Error(`Error fetching cards: ${response.status} ${response.statusText}`);
    }

    const data = response.data; 
    const newCards = data.results || []; 
    setCards(newCards); 
  } catch (error) {
    console.error('Error fetching cards:', error);
  }
};

useEffect(() => {
  if (location.state && location.state.lists) {
    console.log('Received lists:', location.state.lists);
    setLists(location.state.lists);
  } else {
    fetchLists();
  }
  if (location.state && location.state.cards) {
    console.log('Received cards from location.state:', location.state.cards);
    console.log('Setting cards state...');
    setCards(location.state.cards);
    console.log('Cards state updated:', location.state.cards);
  } else {
    fetchCards();
  }
  // Filter cards by list ID
  const listId = '66e5a001e53acf69944d8d0f';
  const filteredCards = cards.filter((card) => card.category_id === listId);
  console.log('Filtered cards:', filteredCards);
  setFilteredCards(filteredCards);
}, [cards]);

  const handleAcceptClick = async () => {
    if (!title) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const requestBody = { title, board_id: '66e5981ee53acf69944d8d01' };
      const response = await http.post('/liste', requestBody);

      if (response.data && response.data._id) {
        console.log(`Created new list with ID: ${response.data._id}`);
        setLists([...lists, response.data]); 
        setShowDropdown(false);
      } else {
        console.error('Invalid response data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleExitClick = () => {
    setShowDropdown(false);
  };

  return (
    <>
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
              <button>
                <TbInfoSquareRoundedFilled />
              </button>
              <button>
                <IoIosNotifications />
              </button>
              <button>
                <MdAccountCircle />
              </button>
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
                <FaCalendarDays />Calendrier
              </button>
            </NavLink>
            <NavLink to={"/menu"}>
              <button className="flex justify-center items-center bg-blue-200 rounded-sm px-2 font-medium shadow-md hover:shadow-lg mr-2">
                <CiMenuKebab />Afficher le menu
              </button>
            </NavLink>
          </div>
        </div>
        <div className="flex gap-20 mt-1">
          {/* <div>
            <Testdnd />
          </div> */}
          <div>
            <div className="flex">
              {lists.length > 0 ? (
                <ul className="mt-2 flex gap-2">
                  {lists.map((list, index) => (
                    <li key={index} className={['bg-gray-400 px-9 rounded-md','bg-gray-400 px-9 rounded-md','bg-gray-400 px-9 rounded-md','bg-gray-400 px-9 rounded-md','bg-gray-400 px-9 rounded-md'][index % 5]}>
                      <div className="card">
                        <h2 className="card-title">{list.title}</h2>
                        {list.tasks && (
                          <ul className="card-tasks">
                            {list.tasks.map((task) => (
                              <li key={task._id} className="card-task">
                                <p>{task.title}</p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucune liste disponible</p>
              )}
              <button
                className="flex justify-center items-center bg-white rounded-md px-6 py-1 font-medium shadow-md hover:shadow-lg ml-3"
                onClick={handleButtonClick}
              >
                <FaPlus /> Ajouter une liste
              </button>
            </div>
            {showDropdown && (
              <div className="absolute bg-white rounded-md shadow-md p-4 mt-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 pl-10 text-sm text-gray-700"
                  placeholder="Saissisez votre titre..."
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
          </div>
        </div>
        <NavLink to={"/testdnd"}>
          <button>test dnd</button>
        </NavLink>
        <NavLink to={"/testrequest"}>
          <button>test request</button>
        </NavLink>
      </div>
      <div>
        {filteredCards.length > 0 ? (
        <ul>
          {filteredCards.map((card) => (
            <li key={card._id}>{card.title}</li>
          ))}
        </ul>
      ) : (
        <p>No cards available</p>
      )}
      </div>
    </>
  );
};
