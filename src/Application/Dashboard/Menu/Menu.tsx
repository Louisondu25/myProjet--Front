// import { ImTable2 } from "react-icons/im";
// import { FcPicture } from "react-icons/fc";
// import { CiSearch } from "react-icons/ci";
// import { CiMenuKebab } from "react-icons/ci";
// import { NavLink } from "react-router-dom"


// export const Menu = () => {
// return(
//        <>
//   <div className="h-screen w-full flex flex-col justify-center items-center">
//     <h1 className="font-medium text-2xl">Menu</h1>
//     <div>
//       <button>
//         <h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-24">
//         <ImTable2 className="mr-2" /> À propos de ce tableau
//       </h2>
//       </button>
//       <p className="text-lg text-gray-600">Ajouter une description à ce tableau</p>
//     </div>
//     <div>
//       <NavLink to={"/changebackground"}>
//         <button><h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-24">
//         <FcPicture  className="mr-2"/> Changer de fond d'écran
//       </h2></button>
//       </NavLink>
//     </div>
//     <div>
//       <NavLink to={"/cartearchivés"}>
//         <button>
//         <h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-24">
//         <CiSearch  className="mr-2"/> Rechercher dans les cartes
//       </h2>
//       </button>
//       </NavLink>
//     </div>
//     <div>
//       <NavLink to={"/plus"}>
//         <button><h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-24">
//         <CiMenuKebab className="mr-1"/> Plus
//       </h2></button>
//       </NavLink>
//     </div>
//   </div>
// </>
//     )
// }


import { ImTable2 } from "react-icons/im";
import { FcPicture } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";
import { CiMenuKebab } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { http } from "../../../Infrastructure/Http/axios";

export const Menu = () => {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [description, setDescription] = useState('');
  const [boardId,] = useState('66e5981ee53acf69944d8d01');
  const [token,] = useState(localStorage.getItem('token'));

  const handleExitClick = () => {
    setShowAboutDropdown(false);
  };

const handleAcceptClick = async () => {
  try {
    if (!token) {
      console.error("Aucun token trouvé, veuillez vous reconnecter.");
      return;
    }

    const response = await http.get(`/board/${boardId}`, {
      headers: { 'Authorization': 'Bearer ' + token },
    });

    if (response.status >= 200 && response.status < 300) {
      const boardData = response.data;
      if (boardData.content) {
        console.log('Table already has a description:', boardData.content);
        // Update the content field
        try {
          await http.put(`/board/${boardId}`, {
            $set: { content: description } // Update only the content field
          }, {
            headers: { 'Authorization': 'Bearer ' + token },
          });
          console.log('Description updated successfully!');
          // Refresh the board data
          const updatedResponse = await http.get(`/board/${boardId}`, {
            headers: { 'Authorization': 'Bearer ' + token },
          });
          console.log('Updated board data:', updatedResponse.data);
        } catch (error) {
          console.error("Error making PUT request:", error);
        }
      } else {
        // Add a new description
        try {
          await http.put(`/board/${boardId}`, {
            content: description // Add a new content field
          }, {
            headers: { 'Authorization': 'Bearer ' + token },
          });
          console.log('Description added successfully!');
          // Refresh the board data
          const updatedResponse = await http.get(`/board/${boardId}`, {
            headers: { 'Authorization': 'Bearer ' + token },
          });
          console.log('Updated board data:', updatedResponse.data);
        } catch (error) {
          console.error("Error making PUT request:", error);
        }
      }
    } else {
      throw new Error(`Erreur lors de la récupération de l'ID du tableau : ${response.status}`);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'ID du tableau :", error);
  }
};

  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <h1 className="font-medium text-2xl">Menu</h1>
        <div>
          <button onClick={() => setShowAboutDropdown(!showAboutDropdown)}>
            <h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-24">
              <ImTable2 className="mr-2" /> À propos de ce tableau
            </h2>
          </button>
          <p>Ajouter une description à ce tableau.</p>
          {showAboutDropdown && (
            <div className="dropdown-about absolute bg-white rounded-md shadow-md p-4 mt-6 text-black border border-gray-500">
              <ul>
                <h1 className='mb-5 font-bold text-xl'>À propos de ce tableau</h1>
                <li>
                  <span className="font-medium mb-2 mr-2">Description :</span>
                  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Entrer votre description..." />
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={handleAcceptClick}
                  >
                    Accepter
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={handleExitClick}>
                    Refuser
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <NavLink to={"/changebackground"}>
            <button>
              <h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-24">
                <FcPicture className="mr-2" /> Changer de fond d'écran
              </h2>
            </button>
          </NavLink>
        </div>
        <div>
          <NavLink to={"/cartearchivés"}>
            <button>
              <h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-24">
                <CiSearch className="mr-2" /> Rechercher dans les cartes
              </h2>
            </button>
          </NavLink>
        </div>
        <div>
          <NavLink to={"/plus"}>
            <button>
              <h2 className=" text-xl flex justify-center items-center px-2 font-medium mt-24">
                <CiMenuKebab className="mr-1" /> Plus
              </h2>
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};