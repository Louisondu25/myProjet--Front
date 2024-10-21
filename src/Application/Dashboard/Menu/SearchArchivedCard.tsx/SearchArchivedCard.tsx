// import React, { useState, } from "react";
// import { CiSearch } from "react-icons/ci";

// // Define a type for the task object
// interface Task {
//     title: string; // Assuming each task has a 'name' property
// }

// export const SearchArchivedCard: React.FC = () => {
//     const [task, setTask] = useState<Task | null>(null); // State to hold the fetched task
//     const [searchTerm, setSearchTerm] = useState<string>(""); // State for the search input

//     // Fetch task from the backend based on search term
//     const fetchTask = async (taskName: string) => {
//         try {
//             const response = await fetch(`/task?name=${encodeURIComponent(taskName)}`); // Your API endpoint with query parameter

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data: Task = await response.json(); // Assuming the response is a single Task object
//             setTask(data); // Set the fetched task
//         } catch (error) {
//             console.error("Error fetching task:", error);
//         }
//     };

//     // Function to handle search input change
//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value;
//         setSearchTerm(value);

//         // Fetch task when the search term is not empty
//         if (value.trim()) {
//             fetchTask(value.trim());
//         } else {
//             setTask(null); // Clear task if search term is empty
//         }
//     };

//     return (
//         <div className="w-full h-screen flex flex-col items-center bg-gradient-to-b to-blue-500 from-cyan-500 to-white p-8">
//             <h1 className="font-medium text-2xl mb-20">Carte archivée</h1>
//             <div className="flex items-center">
//                 <CiSearch className="text-white" />
//                 <input
//                     type="text"
//                     placeholder="Recherche"
//                     className="px-6 py-1 rounded-md"
//                     value={searchTerm}
//                     onChange={handleSearchChange} // Update state on input change
//                 />
//             </div>
//             <div className="flex flex-col mt-20">
//                 <p className="font-medium">Nom:</p>
//                 {task ? (
//                     <p className="mt-2">{task.title}</p> // Display the fetched task name
//                 ) : (
//                     <p className="mt-2">Aucun résultat trouvé.</p> // Message when no task is found
//                 )}
//             </div>
//         </div>
//     );
// };


import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { http } from '../../../../Infrastructure/Http/axios';

// Define a type for the task object
interface Task {
    id: string;
    title: string;
    archive: boolean;
}

export const SearchArchivedCard: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [matchingCards, setMatchingCards] = useState<Task[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Function to fetch tasks based on the search term
    const fetchTasks = async (term: string) => {
        setLoading(true);
        try {
            const page = 1; // Fixed for this example
            const limit = 11; // Fixed for this example
            
            const response = await http.get(`/tasks_by_filters?page=${page}&limit=${limit}&q=${encodeURIComponent(term)}`);
            const data: { count: number; results: Task[] } = response.data; // Adjust based on your response structure
            
            // Log to see the fetched tasks
            console.log('All fetched tasks:', data.results);
            
            // Filter to include only archived tasks
            const filteredResults = data.results.filter(task => 
                task.title.toLowerCase().includes(term.toLowerCase()) && task.archive
            );

            console.log('Filtered results:', filteredResults); // Log the filtered results

            if (filteredResults.length > 0) {
                setMatchingCards(filteredResults);
                setErrorMessage("");
            } else {
                setMatchingCards([]);
                setErrorMessage("Aucun résultat trouvé."); // No results found
            }
        } catch (error) {
            console.error("Error fetching cards:", error);
            setErrorMessage("Une erreur s'est produite lors de la recherche.");
        } finally {
            setLoading(false);
        }
    };

    // Effect to debounce the search input
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm.trim() !== "") {
                fetchTasks(searchTerm.trim());
            } else {
                setMatchingCards([]); // Clear the results if searchTerm is empty
            }
        }, 300); // Adjust delay as needed

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Function to handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle key press events
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchTerm.trim() !== "") {
            fetchTasks(searchTerm.trim());
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center bg-gradient-to-b to-blue-500 from-cyan-500 to-white p-8">
            <h1 className="font-medium text-2xl mb-20">Carte archivée</h1>
            <div className="flex items-center">
                <CiSearch className="text-white mr-2" />
                <input
                    type="text"
                    aria-label="Search archived tasks"
                    placeholder="Recherche"
                    className="px-6 py-1 rounded-md"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress} // Add key press event handler
                />
            </div>
            <div className="flex flex-col mt-20">
                {loading && <p className="mt-2">Chargement...</p>} {/* Loading state */}
                {errorMessage && <p className="mt-2 text-black">{errorMessage}</p>}
                {matchingCards.length > 0 ? (
                    <div>
                        {matchingCards.map((card) => (
                            <div key={card.id} className="mt-2">
                                <p className="font-medium">Nom:</p>
                                <p>{card.title}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Aucune carte archivées trouvée.</p>
                )}
            </div>
        </div>
    );
};
