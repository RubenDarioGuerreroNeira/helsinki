import React, { useState, useEffect } from 'react';
import axios from 'axios';


const baseUrl = 'http://localhost:5059/api';

export const getUsers = () => {
  return axios.get(`${baseUrl}/users`);
};

export const createUser = (newUser: any) => {
  return axios.post(`${baseUrl}/users`, newUser);
};

export const deleteUser = (id: any) => {
  return axios.delete(`${baseUrl}/users/${id}`);
};

const App = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    getUsers()
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const addUser = (event: React.FormEvent) => {
    event.preventDefault();
    const userObject = { name: newName, number: newNumber };

    createUser(userObject)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewName('');
        setNewNumber('');
      })
      .catch((error) => console.error('Error adding user:', error));
  };

  const deleteUs = (id: string) => {
    deleteUser(id)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error: any) => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addUser}>
        <div>
          Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} {user.number}
            <button onClick={() => deleteUs(user.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;


// import React, { useState, useEffect } from 'react';
// import { getUsers, createUser} from './PhoneBook';

// const App = () => {
//   // const [users, setUsers] = useState([]);
//   const [users, setUsers] = useState<{ id: string, name: string, number: string }[]>([]);
//   const [newName, setNewName] = useState('');
//   const [newNumber, setNewNumber] = useState('');

//   useEffect(() => {
//     getUsers()
//       // .then((response: { data: React.SetStateAction<never[]>; }) => setUsers(response.data))
//       .then((response: { data: React.SetStateAction<{id:string,name:string,number:string}[]>; }) => setUsers(response.data))
//       .catch((error: any) => console.error('Error fetching users:', error));
//   }, []);

//   const addUser = (event: { preventDefault: () => void; }) => {
//     event.preventDefault();
//     const userObject = { name: newName, number: newNumber };

//     createUser(userObject)
//       .then((response: { data: ConcatArray<never>; }) => {
//         setUsers(users.concat(response.data));
//         setNewName('');
//         setNewNumber('');
//       })
//       .catch((error: any) => console.error('Error adding user:', error));
//   };

//   const deleteUser = (id:string):Promise<void> => {
//     return new Promise<void>((resolve, reject) => {
//     deleteUser(id)
//       .then(() => {
//         setUsers(users.filter(user => user.id !== id));
//         resolve();
//       })
//       .catch((error: any) => {
//         console.error('Error deleting user:', error);
//         reject(error);
//       });
//     });
//   };


//   return (
//     <div>
//       <h1>Phonebook</h1>
//       <form onSubmit={addUser}>
//         <div>
//           Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
//         </div>
//         <div>
//           Number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
//         </div>
//         <button type="submit">add</button>
//       </form>
//       <h2>Numbers</h2>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>
//             {user.name} {user.number}
//             <button onClick={() => deleteUser(user.id)}>delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;





