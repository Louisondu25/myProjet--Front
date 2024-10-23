import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { http } from '../../../../../Infrastructure/Http/axios';

// Define a type for the list object
interface List {
    id: string;
    title: string;
    archive: boolean;
}

export const ArchivedList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [matchingLists, setMatchingLists] = useState<List[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Function to fetch lists based on the search term
    const fetchLists = async (term: string) => {
        setLoading(true);
        try {
            const page = 1; // Fixed for this example
            const limit = 16; // Fixed for this example
            
            const response = await http.get(`/listes_by_filters?page=${page}&limit=${limit}`);
            const data: { count: number; results: List[] } = response.data; // Adjust based on your response structure
            
            // Log to see the fetched lists
            console.log('All fetched lists:', data.results);
            
            // Filter to include only archived lists
            const filteredResults = data.results.filter(list => 
                list.title.toLowerCase().includes(term.toLowerCase()) && list.archive
            );

            console.log('Filtered results:', filteredResults); // Log the filtered results

            if (filteredResults.length > 0) {
                setMatchingLists(filteredResults);
                setErrorMessage("");
            } else {
                setMatchingLists([]);
                setErrorMessage("Aucune liste archivée trouvée."); // Updated message for lists
            }
        } catch (error) {
            console.error("Error fetching lists:", error);
            setErrorMessage("Une erreur s'est produite lors de la recherche.");
        } finally {
            setLoading(false);
        }
    };

    // Effect to debounce the search input
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm.trim() !== "") {
                fetchLists(searchTerm.trim());
            } else {
                setMatchingLists([]); // Clear the results if searchTerm is empty
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
            fetchLists(searchTerm.trim());
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center bg-gradient-to-b to-blue-500 from-cyan-500 to-white p-8">
            <h1 className="font-medium text-2xl mb-20">Listes archivées</h1> {/* Corrected title */}
            <div className="flex items-center">
                <CiSearch className="text-white mr-2" />
                <input
                    type="text"
                    aria-label="Search archived lists"
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
                {matchingLists.length > 0 ? (
                    <div>
                        {matchingLists.map((list) => ( // Changed from matchingCards to matchingLists
                            <div key={list.id} className="mt-2 bg-white rounded-md px-5">
                                <p className="font-medium">Nom:</p>
                                <p>{list.title}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Aucune liste archivées trouvée.</p>
                )}
            </div>
        </div>
    );
};