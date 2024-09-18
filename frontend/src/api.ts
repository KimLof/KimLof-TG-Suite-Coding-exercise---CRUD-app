import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Tämä pitää olla sama backendissä
// backend/src/main.ts

// Käyttäjän
export const getUsers = () => axios.get(`${API_URL}/users`);
export const getUserById = (id: number) => axios.get(`${API_URL}/users/${id}`);
export const createUser = (user: any) => axios.post(`${API_URL}/users`, user);
export const updateUser = async (id: number, userData: { name: string }) => {
    return axios.put(`${API_URL}/users/${id}`, userData);
  };
export const deleteUser = (id: number) => axios.delete(`${API_URL}/users/${id}`);


// Eventtien
export const getEvents = () => axios.get(`${API_URL}/events`);
export const getEventById = (id: number) => axios.get(`${API_URL}/events/${id}`);
export const createEvent = (event: any) => axios.post(`${API_URL}/events`, event);