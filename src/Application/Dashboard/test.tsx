import { useState } from 'react';
import { http } from '../../Infrastructure/Http/axios';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  email: string;
  password: string;
}

interface Board {
  _id: string;
  title: string;
  content: string;
}

interface List {
  _id: string;
  title: string;
  board_id: string;
}

export const TestRequest = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize,] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalBoards, setTotalBoards] = useState(0);
  const [totalLists, setTotalLists] = useState(0);

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await http.get(`/users_by_filters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: pageSize,
          page: currentPage,
        },
      });
      setUsers(response.data.results);
      setTotalCount(response.data.count);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClickBoard = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await http.get(`/boards_by_filters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: pageSize,
          page: currentPage,
        },
      });
      setBoards(response.data.results);
      setTotalBoards(response.data.count);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

const handleFetchLists = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token');
    const response = await http.get(`/listes_by_filters`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: pageSize,
        page: currentPage,
      },
    });
    const listsData = response.data;
    console.log('Received lists data:', listsData);
    let filteredLists = [];
    if (listsData && listsData.results && Array.isArray(listsData.results)) {
      filteredLists = listsData.results.filter((list: { board_id: string }) => list.board_id === '67e9276bb7cd2d0e4313f45b');
      console.log('Filtered lists:', filteredLists);
      setLists(filteredLists);
      setTotalLists(listsData.count);
    } else {
      console.log('listsData is not valid:', listsData);
      setLists([]);
      setTotalLists(0);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <button className="bg-black text-white" onClick={handleButtonClick}>
        Get All Users
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {users.map(user => (
              <li key={user._id}>
                <p>First Name: {user.firstName}</p>
                <p>Last Name: {user.lastName}</p>
                <p>Phone Number: {user.phoneNumber}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </li>
            ))}
          </ul>
          <div>
            <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            <p>Page {currentPage} of {Math.ceil(totalCount / pageSize)}</p>
          </div>
          <button className="bg-black text-white" onClick={handleButtonClickBoard}>
            Get All Board
          </button>
          <ul>
            {boards.map(board => (
              <li key={board._id}>
                <p>title: {board.title}</p>
                <p>content: {board.content}</p>
              </li>
            ))}
          </ul>
          <div>
            <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            <p>Page {currentPage} of {Math.ceil(totalBoards / pageSize)}</p>
          </div>
        </div>
      )}
      <div>
        <button className='bg-black text-white' onClick={handleFetchLists}>Fetch Lists</button>
        {loading ? (
            <p>Loading...</p>
          ) : (
            Array.isArray(lists) ? (
              lists.map((list, index) => (
                <div key={index}>
                  <h2>{list.title}</h2>
                </div>
              ))
            ) : (
              <p>No lists found</p>
            )
          )}
        <div>
          <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          <p>Page {currentPage} of {Math.ceil(totalLists / pageSize)}</p> 
        </div>
      </div>
    </>
  );
};