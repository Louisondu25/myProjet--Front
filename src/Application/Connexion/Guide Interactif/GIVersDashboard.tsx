// import { NavLink, useNavigate } from "react-router-dom";
// import { http } from '../../../Infrastructure/Http/axios'; // Assurez-vous que http est bien configuré

// export const Giversdashboard = () => {
//   const navigate = useNavigate();

//    const pageSize = 20; // changer selon le nombre d'elements dans le tableau.
//   const currentPage = 1;

//   const handleFinish = async (boardId: string) => {
//     try {
//       // Retrieve token from local storage
//       const token = localStorage.getItem('token');

//       // Fetch board data
//       const response = await http.get(`/board/${boardId}`, {
//         headers: {
//           'Authorization': 'Bearer ' + token,
//         },
//       });

//       // Check if board data is fetched successfully
//       if (response.status >= 200 && response.status < 300) {
//         // Fetch all lists
//         const listsResponse = await http.get(`/listes_by_filters`, {
//           headers: {
//             'Authorization': 'Bearer ' + token,
//           },
//           params: {
//             limit: pageSize,
//             page: currentPage,
//           },
//         });

//         // Check if lists data is fetched successfully
//         if (listsResponse.status >= 200 && listsResponse.status < 300) {
//           const listsData = listsResponse.data;
//           console.log('Lists data:', listsData);

//           let filteredLists = [];
//           if (listsData && listsData.results && Array.isArray(listsData.results)) {
//             filteredLists = listsData.results.filter((list: { board_id: string }) => list.board_id === boardId);
//             console.log('Filtered lists:', filteredLists);
//           } else {
//             console.log('listsData is not valid:', listsData);
//           }

//           navigate('/dashboard', { state: { lists: filteredLists } });
//         } else {
//           throw new Error(`Error fetching lists data: ${listsResponse.status}`);
//         }
//       } else {
//         throw new Error(`Error fetching board data: ${response.status}`);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const handleFinishClick = async () => {
//     const boardId = '66e5981ee53acf69944d8d01'; 
//     await handleFinish(boardId);
//   }

//   return (
//     <>
//       <div className="h-screen w-full flex flex-col">
//         <h1 className="text-center text-3xl font-bold mt-5">Création de ton compte</h1>
//         <div className="text-center mt-16">
//           <p className="text-xl mb-16">Étape 1: Crée ton compte</p>
//           <p className="text-xl mb-16">Étape 2 : Clique sur Crée un tableau</p>
//           <NavLink to={"/premierecreationtableaux"}>
//             <button className="next-button text-center bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg mb-10">Crée un Tableau</button>
//           </NavLink>
//           <p className="text-xl mb-4">Étape 3 : Cliquez sur terminer</p>
//           <NavLink to={"/dashboard"}>
//             <button className="next-button text-center bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg mt-14" onClick={handleFinishClick}>Terminée</button>
//           </NavLink>
//         </div>
//       </div>
//     </>
//   );
// };



import React from 'react';
import { NavLink, } from "react-router-dom";
import { http } from '../../../Infrastructure/Http/axios';

export const Giversdashboard = () => {

  const pageSize = 20; // changer selon le nombre d'elements dans le tableau.
  const currentPage = 1;

  const handleFinish = async (boardId: string) => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');

      // Fetch board data
      const response = await http.get(`/board/${boardId}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      // Check if board data is fetched successfully
      if (response.status >= 200 && response.status < 300) {
        // Fetch all lists
        const listsResponse = await http.get(`/listes_by_filters`, {
          headers: {
            'Authorization': 'Bearer ' + token,
          },
          params: {
            limit: pageSize,
            page: currentPage,
          },
        });

        // Check if lists data is fetched successfully
        if (listsResponse.status >= 200 && listsResponse.status < 300) {
          const listsData = listsResponse.data;
          console.log('Lists data:', listsData);

          let filteredLists = [];
          if (listsData && listsData.results && Array.isArray(listsData.results)) {
            filteredLists = listsData.results.filter((list: { board_id: string }) => list.board_id === boardId);
            console.log('Filtered lists:', filteredLists);
          } else {
            console.log('listsData is not valid:', listsData);
          }

          return (
            <div>
              <h1>Filtered Lists:</h1>
              <ul>
                {filteredLists.map((list: { title: string }, index: number) => (
                  <li key={index}>{list.title}</li>
                ))}
              </ul>
            </div>
          );
        } else {
          throw new Error(`Error fetching lists data: ${listsResponse.status}`);
        }
      } else {
        throw new Error(`Error fetching board data: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleFinishClick = async () => {
    const boardId = '66e5981ee53acf69944d8d01'; 
    await handleFinish(boardId);
  }

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
            <button className="next-button text-center bg-blue-300 rounded-md px-6 py-2 font-medium shadow-md hover:shadow-lg mt-14" onClick={handleFinishClick}>Terminée</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};