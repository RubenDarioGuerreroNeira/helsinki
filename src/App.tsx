import React, { useState, useEffect } from 'react';
import PhonebookService from './PhonebookService';




const App = () => {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    PhonebookService.getUsers()
      .then((response: { data: React.SetStateAction<never[]>; }) => setUsers(response.data))
      .catch((error: any) => console.error('Error fetching users:', error));
  }, []);

  const addUser = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const userObject = { name: newName, number: newNumber };

    PhonebookService.createUser(userObject)
      .then((response: { data: ConcatArray<never>; }) => {
        setUsers(users.concat(response.data));
        setNewName('');
        setNewNumber('');
      })
      .catch((error: any) => console.error('Error adding user:', error));
  };

  const deleteUser = (id:string) => {
    PhonebookService.deleteUser(id)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
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
        {users.map(user => (
          <li key={user.id}>
            {user.name} {user.number}
            <button onClick={() => deleteUser(user.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;




// version 2-------------------
// import React, { useState, useEffect } from 'react';
// import PhonebookService from './PhonebookService'; // Asegúrate de que la ruta sea correcta

// const App = () => {
//   const [users, setUsers] = useState([]);
//   const [newName, setNewName] = useState('');
//   const [newNumber, setNewNumber] = useState('');

//   useEffect(() => {
//     PhonebookService
//       .getUsers()
//       .then((initialUsers: { data: React.SetStateAction<never[]>; }) => setUsers(initialUsers.data))
//       .catch((error: any) => console.error('Error fetching users:', error));
//   }, []);

//   const addUser = (event: { preventDefault: () => void; }) => {
//     event.preventDefault();
//     const userObject = { name: newName, number: newNumber };

//     PhonebookService
//       .createUser(userObject)
//       .then((returnedUser: { data: ConcatArray<never>; }) => {
//         setUsers(users.concat(returnedUser.data));
//         setNewName('');
//         setNewNumber('');
//       })
//       .catch((error: any) => console.error('Error adding user:', error));
//   };

//   const deleteUser = (id: any) => {
//     PhonebookService
//       .deleteUser(id)
//       .then(() => {
//         setUsers(users.filter(user => user.id !== id));
//       })
//       .catch((error: any) => console.error('Error deleting user:', error));
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



// este es el modulo de agenga 1
// import React, { useState, useEffect } from 'react';
// import PhonebookService from './PhonebookService';

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState('');
//   const [newImportant, setNewImportant] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);

// // Suggested code may be subject to a license. Learn more: ~LicenseLog:3227681169.
//  const [user, setUser]= useState({
//   name: '',
//   number: '',
// });
// const [number, setNumber] = useState('');


//   useEffect(() => {
//     PhonebookService.getNotes()
//       .then(response => {
//         setNotes(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching notes:', error);
//       });
//   }, []);

//   const addNote = (event) => {
//     event.preventDefault();
//     const noteObject = {
//       content: newNote,
//       important: newImportant,
//     };

//     PhonebookService.createNote(noteObject)
//       .then(response => {
//         setNotes(notes.concat(response.data));
//         setNewNote('');
//         setNewImportant(false);
//         setErrorMessage(null);
//       })
//       .catch(error => {
//         console.error('Error creating note:', error);
//         setErrorMessage('Error creating note: ' + error.response.data.error);
//       });
//   };

//   const handleNoteChange = (event) => {
//     setNewNote(event.target.value);
//   };

//   const handleImportantChange = (event) => {
//     setNewImportant(event.target.checked);
//   };

//   return (
//     <div>
//       <h1>Phonebook</h1>
//       {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
//       <form onSubmit={addNote}>
//         <input
//           value={newNote}
//           onChange={handleNoteChange}
//           placeholder="Write a new note"
//         />
//         <input
//           type="checkbox"
//           checked={newImportant}
//           onChange={handleImportantChange}
//         /> Important
//         <button type="submit">Save</button>
//       </form>
//       <ul>
//         {notes.map(note => (
//           <li key={note.id}>
//             {note.content} <strong>{note.important ? 'Important' : ''}</strong>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;



// // VERSION 2
// import React, { useState, useEffect } from 'react';
// import PhonebookService from './PhonebookService';

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState('');
//   const [newImportant, setNewImportant] = useState(false);

//   useEffect(() => {
//     PhonebookService.getNotes()
//       .then(response => {
//         setNotes(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching notes:', error);
//       });
//   }, []);

//   const addNote = (event) => {
//     event.preventDefault();
//     const noteObject = {
//       content: newNote,
//       important: newImportant,
//     };

//     PhonebookService.createNote(noteObject)
//       .then(response => {
//         setNotes(notes.concat(response.data));
//         setNewNote('');
//         setNewImportant(false);
//       })
//       .catch(error => {
//         console.error('Error creating note:', error);
//       });
//   };

//   const handleNoteChange = (event) => {
//     setNewNote(event.target.value);
//   };

//   const handleImportantChange = (event) => {
//     setNewImportant(event.target.checked);
//   };

//   return (
//     <div>
//       <h1>Phonebook Notes</h1>
//       <form onSubmit={addNote}>
//         <input
//           value={newNote}
//           onChange={handleNoteChange}
//           placeholder="Write a new note"
//         />
//         <input
//           type="checkbox"
//           checked={newImportant}
//           onChange={handleImportantChange}
//         /> Important
//         <button type="submit">Save</button>
//       </form>
//       <ul>
//         {notes.map(note => (
//           <li key={note.id}>
//             {note.content} <strong>{note.important ? 'Important' : ''}</strong>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;

// ----------------version1---------------
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Person {
//   id: number;
//   name: string;
//   numbrer: number;
// }

// const App: React.FC = () => {
//   const [persons, setPersons] = useState<Person[]>([]);
//   const [newName, setNewName] = useState('');
//   const [newNumber, setNewNumber] = useState('');

//   useEffect(() => {
//     axios.get('/persons')
//       .then(response => {
//         setPersons(response.data);
//       });
//   }, []);

//   const addPerson = (event: React.FormEvent) => {
//     event.preventDefault();
//     const newPerson = {
//       name: newName,
//       numbrer: newNumber,
//     };

//     axios.post('/persons', newPerson)
//       .then(response => {
//         setPersons(persons.concat(response.data));
//         setNewName('');
//         setNewNumber('');
//       });
//   };

//   const deletePerson = (id: number) => {
//     axios.delete(`/persons/${id}`)
//       .then(() => {
//         setPersons(persons.filter(person => person.id !== id));
//       });
//   };

//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <form onSubmit={addPerson}>
//         <div>
//           name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
//         </div>
//         <div>
//           number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
//         </div>
//         <button type="submit">add</button>
//       </form>
//       <h2>Numbers</h2>
//       <ul>
//         {persons.map(person => (
//           <li key={person.id}>
//             {person.name} {person.numbrer}
//             <button onClick={() => deletePerson(person.id)}>delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;






// // import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// // import axios from 'axios'; // Importa AxiosError para manejar errores específicos de Axios

// // interface Person {
// //   id: number;
// //   name: string;
// //   number: string;
// // }

// // const App: React.FC = () => {
// //   const [persons, setPersons] = useState<Person[]>([]);
// //   const [newName, setNewName] = useState<string>('');
// //   const [newNumber, setNewNumber] = useState<string>('');
// //   const [errorMessage, setErrorMessage] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await axios.get('/persons');
// //         setPersons(response.data);
// //       } catch (error) {
// //    if(axios.isAxiosError(error)){
// //     console.error('Error fetching persons:', error)
// //     setErrorMessage(error.response?.data.error || 'Error fetching persons');
// //     } else{
// //      console.error('error unexpected')
// //      setErrorMessage('Error desconocido');

// // }
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   const addPerson = async (event: FormEvent<HTMLFormElement>) => {
// //     event.preventDefault();
// //     try {
// //       const response = await axios.post('/persons', { name: newName, number: newNumber });
// //       setPersons([...persons, response.data]);
// //       setNewName('');
// //       setNewNumber('');
// //       setErrorMessage(null);
// //     } catch (error) {
// // if(axios.isAxiosError(error)){
// //   console.error('Error adding person:', error)
// //   setErrorMessage(error.response?.data.error || 'Error adding person');
// // } else{
// //   console.error('error unexpected')
// //   setErrorMessage('Error desconocido');

// // }
     
// //     }
// //   };

// //   const deletePerson = async (id: number) => {
// //     try {
// //       await axios.delete(`/persons/${id}`);
// //       const updatedPersons = persons.filter(person => person.id !== id);
// //       setPersons(updatedPersons);
// //     } catch (error) {
// //       if(axios.isAxiosError(error)){
// //         console.error('Error deleting person:', error)
// //         setErrorMessage(error.response?.data.error || 'Error deleting person');
// //       } else{
// //         console.error('error unexpected')
// //         setErrorMessage('Error desconocido');
  
// //       }
     
// //     }
// //   };

// //   const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
// //     setNewName(event.target.value);
// //   };

// //   const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
// //     setNewNumber(event.target.value);
// //   };

  
// //   return (
    
// //     <div>
// //       <h1>Phonebook</h1>
// //       {errorMessage && <div className="error">{errorMessage}</div>}

// //       <form onSubmit={addPerson}>
// //         <div>
// //           Name: <input value={newName} onChange={handleNameChange} />
// //         </div>
// //         <div>
// //           Phone Number: <input value={newNumber} onChange={handleNumberChange} />
// //         </div>
// //         <div>
// //           <button type="submit">Add</button>
// //         </div>
// //       </form>

// //       <h2>Numbers</h2>
// //       {persons.length > 0 ? (
// //         <ul>
// //           {persons.map(person => (
// //             <li key={person.id}>
// //               {person.name} {person.number}
// //               <button onClick={() => deletePerson(person.id)}>Delete</button>
// //             </li>
// //           ))}
// //         </ul>
// //       ) : (
// //         <p>No persons in the phonebook</p>
// //       )}
// //     </div>
// //   );
// // };


// // export default App;




// // ------AGENDA  TELEFONICA------------

// // import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// // import axios from 'axios';

// // interface NotificationProps {
// //   message: string | null;
// // }

// // const Notification: React.FC<NotificationProps> = ({ message }) => {
// //   if (message === null) {
// //     return null;
// //   }
// //   return <div className="error">{message}</div>;
// // };

// // interface Country {
// //   name: {
// //     common: string;
// //   };
// //   capital: string[];
// //   population: number;
// //   area: number;
// //   languages: { [key: string]: string };
// //   flags: {
// //     svg: string;
// //   };
// // }

// // const CountryInfo: React.FC<{ country: Country }> = ({ country }) => {
// //   return (
// //     <div>
// //       <h2>{country.name.common}</h2>
// //       <p>Capital: {country.capital.join(', ')}</p>
// //       <p>Population: {country.population}</p>
// //       <p>Area: {country.area} km²</p>
// //       <p>Languages: {Object.values(country.languages).join(', ')}</p>
// //       <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="200" />
// //     </div>
// //   );
// // };

// // interface Person {
// //   name: string;
// //   number: string;
// // }

// // const App: React.FC = () => {
// //   const [countries, setCountries] = useState<Country[]>([]);
// //   const [searchTerm, setSearchTerm] = useState<string>('');
// //   const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
// //   const [persons, setPersons] = useState<Person[]>([
// //     { name: 'Arto Hellas', number: '040-123456' },
// //     { name: 'John Harrison', number: '39-44-5323523' },
// //     { name: 'John Johnson', number: '12-43-234345' }
// //   ]);
// //   const [newName, setNewName] = useState<string>('');
// //   const [newNumber, setNewNumber] = useState<string>('');
// //   const [search, setSearch] = useState<string>('');
// //   const [errorMessage, setErrorMessage] = useState<string | null>('Waiting');

// //   useEffect(() => {
// //     const fetchCountries = async () => {
// //       try {
// //         const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
// //         setCountries(response.data);
// //       } catch (error) {
// //         console.error('Error fetching countries:', error);
// //       }
// //     };
// //     fetchCountries();
// //   }, []);

// //   useEffect(() => {
// //     const filtered = countries.filter((country) =>
// //       country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //     setFilteredCountries(filtered);
// //   }, [countries, searchTerm]);

// //   const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
// //     setSearchTerm(event.target.value);
// //   };

// //   const addName = (event: FormEvent<HTMLFormElement>) => {
// //     event.preventDefault();
// //     const existingPerson = persons.find((person) => person.name === newName);

// //     if (existingPerson) {
// //       const confirmReplace = window.confirm(
// //         `${newName} is already added to phonebook, replace the old number with a new one?`
// //       );

// //       if (confirmReplace) {
// //         const updatedPersons = persons.map((p) =>
// //           p.name === newName ? { ...p, number: newNumber } : p
// //         );
// //         setPersons(updatedPersons);
// //         setNewName('');
// //         setNewNumber('');
// //       }
// //     } else {
// //       const personObject = {
// //         name: newName,
// //         number: newNumber
// //       };
// //       setPersons(persons.concat(personObject));
// //       setNewName('');
// //       setNewNumber('');
// //       setErrorMessage(newName);
// //     }
// //   };

// //   const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
// //     setNewName(event.target.value);
// //   };

// //   const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
// //     setNewNumber(event.target.value);
// //   };

// //   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
// //     setSearch(event.target.value);
// //   };

// //   const handleDelete = (name: string) => {
// //     const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
// //     if (confirmDelete) {
// //       const updatedPersons = persons.filter((person) => person.name !== name);
// //       setPersons(updatedPersons);
// //     }
// //   };

// //   useEffect(() => {
// //     console.log('Persons state updated:', persons);
// //   }, [persons]);

// //   return (
// //     <div>
// //       <h1>Country Information</h1>
// //       <input
// //         type="text"
// //         placeholder="Search for a country"
// //         value={searchTerm}
// //         onChange={handleSearch}
// //       />
// //       {filteredCountries.length > 10 ? (
// //         <p>Too many matches, specify another filter</p>
// //       ) : filteredCountries.length === 1 ? (
// //         <CountryInfo country={filteredCountries[0]} />
// //       ) : (
// //         filteredCountries.map((country) => (
// //           <div key={country.name.common}>
// //             {country.name.common}{' '}
// //             <button onClick={() => setSearchTerm(country.name.common)}>Show</button>
// //           </div>
// //         ))
// //       )}
      
// //       <h1 className="h1">Phonebook</h1>
// //       <Notification message={errorMessage} />

// //       <form onSubmit={addName}>
// //         <div>
// //           Name: <input value={newName} onChange={handleNameChange} />
// //         </div>
// //         <div>
// //           Phone Number: <input value={newNumber} onChange={handleNumberChange} />
// //         </div>
// //         <div>
// //           <button type="submit">add</button>
// //         </div>
// //       </form>

// //       <h2>Numbers</h2>
// //       {persons.length > 0 && (
// //         <div>
// //           {persons.map((person) => (
// //             <p key={person.name}>
// //               {person.name} {person.number} 
// //               <button onClick={() => handleDelete(person.name)}>Delete</button>
// //             </p>
// //           ))}
// //         </div>
// //       )}

// //       <div>
// //         Search <input value={search} onChange={handleSearchChange} />
// //       </div>
// //       {search.length === 0 ? (
// //         <p>No Results Found</p>
// //       ) : (
// //         <div>
// //           {persons
// //             .filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
// //             .map((person) => (
// //               <p key={person.name}>
// //                 {person.name} {person.number}
// //                 <button onClick={() => handleDelete(person.name)}>Delete</button>
// //               </p>
// //             ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default App;


