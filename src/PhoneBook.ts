import axios from 'axios';

const baseUrl = 'http://localhost:5059/api';

export const getNotes = () => {
  return axios.get(`${baseUrl}/notes`);
};

export const getUsers = () => {
  return axios.get(`${baseUrl}/users`);
};

export const createNote = (newNote:any) => {
  return axios.post(`${baseUrl}/notes`, newNote);
};

export const deleteUser = (id:any) => {
  return axios.delete(`${baseUrl}/users/${id}`);
};

export const updateUser = (id:any, newUser:any) => {
  return axios.put(`${baseUrl}/users/${id}`, newUser);
};

export const createUser = (newUser:any) => {
  return axios.post(`${baseUrl}/users`, newUser);
};



// declare module 'Phonebook' {
//     export function getUsers(): Promise<{ id: string, name: string, number: string }[]>;
//     export function createUser(user: { name: string, number: string }): Promise<any>;
//     export function deleteUser(id: string): Promise<void>;
//     // Añade aquí otras funciones que puedas necesitar
//   }

