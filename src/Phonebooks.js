import axios from 'axios';

const baseUrl = 'http://localhost:5058/api';

const getNotes = () => {
  return axios.get(`${baseUrl}/notes`);
};

const getUsers = () => {
  return axios.get(`${baseUrl}/users`);
};

const createNote = (newNote) => {
  return axios.post(`${baseUrl}/notes`, newNote);
};

const deleteUser = (id) => {
  return axios.delete(`${baseUrl}/users/${id}`);
};

const updateUser = (id, newUser) => {
  return axios.put(`${baseUrl}/users/${id}`, newUser);
};

const createUser = (newUser) => {
  return axios.post(`${baseUrl}/users`, newUser);
};

export default {
  getNotes,
  getUsers,
  createNote,
  deleteUser,
  updateUser,
  createUser,
};






// import axios from 'axios';

// const baseUrl = 'http://localhost:5058/api';

// const getNotes = () => {
//   return axios.get(`${baseUrl}/notes`);
// };

// const getUsers = () => {
//   return axios.get(`${baseUrl}/users`);
// };

// const createNote = (newNote) => {
//   return axios.post(`${baseUrl}/notes`, newNote);
// };

// const deleteUser = (id) => {
//   return axios.delete(`${baseUrl}/users/${id}`);
// };

// const updateUser = (id, newUser) => {
//   return axios.put(`${baseUrl}/users/${id}`, newUser);
// };

// const createUser = (newUser) => {
//   return axios.post(`${baseUrl}/users`, newUser);
// };

// export default {
//   getNotes,
//   getUsers,
//   createNote,
//   deleteUser,
//   updateUser,
//   createUser,
// };




// // import axios from 'axios';

// // const baseUrl = 'http://localhost:5058/api'; // Asegúrate de que este sea el puerto correcto

// // const getNotes = () => {
// //   return axios.get(`${baseUrl}/notes`);
// // };

// // const getUsers = () => {
// //   return axios.get(`${baseUrl}/users`);
// // };

// // const createNote = (newNote) => {
// //   return axios.post(`${baseUrl}/notes`, newNote);
// // };

// // const deleteUser = (id) => {
// //   return axios.delete(`${baseUrl}/user/${id}`);
// // };

// // const updateUser = (id, newUser) => {
// //   return axios.put(`${baseUrl}/user/${id}`, newUser);
// // };

// // const createUser= (newUser) => {
// //   return axios.post(`${baseUrl}/user`, newUser);
// // };

// // export default {
// //   getNotes,
// //   createNote,
// //   deleteUser,
// //   updateUser,
// //   createUser,
// // };
