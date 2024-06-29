// import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// import axios, { AxiosError } from 'axios';

// interface NotificationProps {
//   message: string | null;
// }

// const Notification: React.FC<NotificationProps> = ({ message }) => {
//   if (message === null) {
//     return null;
//   }
//   return <div className="error">{message}</div>;
// };

// interface Person {
//   id: number;
//   name: string;
//   number: string;
// }

// const App: React.FC = () => {
//   const [persons, setPersons] = useState<Person[]>([]);
//   const [newName, setNewName] = useState<string>('');
//   const [newNumber, setNewNumber] = useState<string>('');
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   useEffect(() => {
//     // Cargar personas desde el backend al montar el componente
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/persons'); // Cambia la URL según tu configuración de backend
//         setPersons(response.data);
//       } catch (error) {
//         console.error('Error fetching persons:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const addName = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('/persons', { name: newName, number: newNumber });
//       setPersons([...persons, response.data]);
//       setNewName('');
//       setNewNumber('');
//       setErrorMessage(null);
//     } catch (error:unknown) {
//       if(axios.isAxiosError(error)){
//         console.error('Error adding person:', error);
//         setErrorMessage(error.response?.data.error || 'Error adding person');
      
//       } else{
//         console.error('error unexpected')
//       }
     
      
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`/persons/${id}`);
//       const updatedPersons = persons.filter((person) => person.id !== id);
//       setPersons(updatedPersons);
//     } catch (error) {
//       console.error('Error deleting person:', error);
//       setErrorMessage(error.response?.data.error || 'Error deleting person');
//     }
//   };

//   const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setNewName(event.target.value);
//   };

//   const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setNewNumber(event.target.value);
//   };

//   return (
//     <div>
//       <h1>Phonebook</h1>
//       <Notification message={errorMessage} />

//       <form onSubmit={addName}>
//         <div>
//           Name: <input value={newName} onChange={handleNameChange} />
//         </div>
//         <div>
//           Phone Number: <input value={newNumber} onChange={handleNumberChange} />
//         </div>
//         <div>
//           <button type="submit">Add</button>
//         </div>
//       </form>

//       <h2>Numbers</h2>
//       {persons.length > 0 && (
//         <div>
//           {persons.map((person) => (
//             <div key={person.id}>
//               {person.name} {person.number}
//               <button onClick={() => handleDelete(person.id)}>Delete</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
