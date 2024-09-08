import axios from 'axios';

// Configuration de base de Axios
export const http = axios.create({
  baseURL:  'http://localhost:3001/',  // Changez par l'URL de votre API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête si disponible
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Récupérer le token depuis localStorage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Ajouter le token dans l'en-tête Authorization
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});
