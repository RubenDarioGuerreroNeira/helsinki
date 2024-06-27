import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface NotificationProps {
  message: string | null;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

interface Country {
  name: {
    common: string;
  };
  capital: string[];
  population: number;
  area: number;
  languages: { [key: string]: string };
  flags: {
    svg: string;
  };
}

const CountryInfo: React.FC<{ country: Country }> = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital.join(', ')}</p>
      <p>Population: {country.population}</p>
      <p>Area: {country.area} km²</p>
      <p>Languages: {Object.values(country.languages).join(', ')}</p>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="200" />
    </div>
  );
};

interface Person {
  name: string;
  number: string;
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [persons, setPersons] = useState<Person[]>([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'John Harrison', number: '39-44-5323523' },
    { name: 'John Johnson', number: '12-43-234345' }
  ]);
  const [newName, setNewName] = useState<string>('');
  const [newNumber, setNewNumber] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>('Waiting');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [countries, searchTerm]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const addName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmReplace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmReplace) {
        const updatedPersons = persons.map((p) =>
          p.name === newName ? { ...p, number: newNumber } : p
        );
        setPersons(updatedPersons);
        setNewName('');
        setNewNumber('');
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
      setErrorMessage(newName);
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleDelete = (name: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirmDelete) {
      const updatedPersons = persons.filter((person) => person.name !== name);
      setPersons(updatedPersons);
    }
  };

  useEffect(() => {
    console.log('Persons state updated:', persons);
  }, [persons]);

  return (
    <div>
      <h1>Country Information</h1>
      <input
        type="text"
        placeholder="Search for a country"
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <CountryInfo country={filteredCountries[0]} />
      ) : (
        filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{' '}
            <button onClick={() => setSearchTerm(country.name.common)}>Show</button>
          </div>
        ))
      )}
      
      <h1 className="h1">Phonebook</h1>
      <Notification message={errorMessage} />

      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Phone Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.length > 0 && (
        <div>
          {persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number} 
              <button onClick={() => handleDelete(person.name)}>Delete</button>
            </p>
          ))}
        </div>
      )}

      <div>
        Search <input value={search} onChange={handleSearchChange} />
      </div>
      {search.length === 0 ? (
        <p>No Results Found</p>
      ) : (
        <div>
          {persons
            .filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
            .map((person) => (
              <p key={person.name}>
                {person.name} {person.number}
                <button onClick={() => handleDelete(person.name)}>Delete</button>
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export default App;




// import React, { useState, useEffect } from 'react';
// import Communication from './Communication';
// import axios from 'axios';


// interface NotificationProps {
//   message: string | null;
// }


// // const Notification = ({ message }) => {
//   const Notification: React.FC<NotificationProps> = ({ message }) => {
//   if (message === null) {
//     return null;
//   }
//   return <div className="error">{message}</div>;
// };

// const CountryInfo:React.FC<{ country: any }> = ({ country }) => {
//   return (
//     <div>
//       <h2>{country.name.common}</h2>
//       <p>Capital: {country.capital}</p>
//       <p>Population: {country.population}</p>
//       <p>Area: {country.area} km²</p>
//       <p>Languages: {Object.values(country.languages).join(', ')}</p>
//       <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="200" />
//     </div>
//   );
// };

// const App = () => {
//   const [countries, setCountries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredCountries, setFilteredCountries] = useState([]);
//   const [persons, setPersons] = useState([
//     { name: 'Arto Hellas', number: '040-123456' },
//     { name: 'John Harrison', number: '39-44-5323523' },
//     { name: 'John Johnson', number: '12-43-234345' }
//   ]);
//   const [newName, setNewName] = useState('');
//   const [newNumber, setNewNumber] = useState('');
//   const [search, setSearch] = useState('');
//   const [errorMessage, setErrorMessage] = useState('Waiting');

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
//         setCountries(response.data);
//       } catch (error) {
//         console.error('Error fetching countries:', error);
//       }
//     };
//     fetchCountries();
//   }, []);

//   useEffect(() => {
//     const filtered = countries.filter((country) =>
//       country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCountries(filtered);
//   }, [countries, searchTerm]);

//   // const handleSearch = (event) => {
//     const handleSearch: React.FormEventHandler<HTMLFormElement> = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const addName = (event) => {
//     event.preventDefault();
//     const existingPerson = persons.find((person) => person.name === newName);

//     if (existingPerson) {
//       const confirmReplace = window.confirm(
//         `${newName} is already added to phonebook, replace the old number with a new one?`
//       );

//       if (confirmReplace) {
//         const updatedPersons = persons.map((p) =>
//           p.name === newName ? { ...p, number: newNumber } : p
//         );
//         setPersons(updatedPersons);
//         setNewName('');
//         setNewNumber('');
//       }
//     } else {
//       const personObject = {
//         name: newName,
//         number: newNumber
//       };
//       setPersons(persons.concat(personObject));
//       setNewName('');
//       setNewNumber('');
//       setErrorMessage(newName);
//     }
//   };

//   const handleNameChange: React.FormEventHandler<HTMLInputElement> = (event) => {
//     setNewName(event.target.value);
//   };

//   const handleNumberChange: React.FormEventHandler<HTMLInputElement> = (event) => {
//     setNewNumber(event.target.value);
//   };

//   const handleSearchChange: React.FormEventHandler<HTMLInputElement> = (event) => {
//     setSearch(event.target.value);
//   };

//   const handleDelete = (name) => {
//     const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
//     if (confirmDelete) {
//       const updatedPersons = persons.filter((person) => person.name !== name);
//       setPersons(updatedPersons);
//     }
//   };

//   useEffect(() => {
//     console.log('Persons state updated:', persons);
//   }, [persons]);

//   return (
//     <div>
//       <h1>Country Information</h1>
//       <input
//         type="text"
//         placeholder="Search for a country"
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//       {filteredCountries.length > 10 ? (
//         <p>Too many matches, specify another filter</p>
//       ) : filteredCountries.length === 1 ? (
//         <CountryInfo country={filteredCountries[0]} />
//       ) : (
//         filteredCountries.map((country) => (
//           <div key={country.name.common}>
//             {country.name.common}{' '}
//             <button onClick={() => setSearchTerm(country.name.common)}>Show</button>
//           </div>
//         ))
//       )}
      
//       <h1 className="h1">Phonebook</h1>
//       <Notification message={errorMessage} />

//       <form onSubmit={addName}>
//         <div>
//           Name: <input value={newName} onChange={handleNameChange} />
//         </div>
//         <div>
//           Phone Number: <input value={newNumber} onChange={handleNumberChange} />
//         </div>
//         <div>
//           <button type="submit">add</button>
//         </div>
//       </form>

//       <h2>Numbers</h2>
//       {persons.length > 0 && (
//         <div>
//           {persons.map((person) => (
//             <p key={person.name}>
//               {person.name} {person.number} 
//               <button onClick={() => handleDelete(person.name)}>Delete</button>
//             </p>
//           ))}
//         </div>
//       )}

//       <div>
//         Search <input value={search} onChange={handleSearchChange} />
//       </div>
//       {search.length === 0 ? (
//         <p>No Results Found</p>
//       ) : (
//         <div>
//           {persons
//             .filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
//             .map((person) => (
//               <p key={person.name}>
//                 {person.name} {person.number}
//                 <button onClick={() => handleDelete(person.name)}>Delete</button>
//               </p>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;




// // import { useState, useEffect } from 'react'
// // import Communication from './Comunication'
// // // country
// // import axios from 'axios';

// // const Notification = ({ message }) => {
// //   if (message === null) {
// //     return null
// //   }

// //   return (
// //     <div className="error">
// //       {message}
// //     </div>
// //   )
// // }

// // // country/////////////////////////////////////////////////////
// // const CountryInfo = ({ country }) => {
// //   return (
// //     <div>
// //       <h2>{country.name.common}</h2>
// //       <p>Capital: {country.capital}</p>
// //       <p>Population: {country.population}</p>
// //       <p>Area: {country.area} km²</p>
// //       <p>Languages: {Object.values(country.languages).join(', ')}</p>
// //       <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="200" />
// //     </div>
// //   );
// // };
// // ////////////////////////////////////////////////////////////////////

// // const App = () => {
// //   //countries//////////////////////////////////////////////

// //   const [countries, setCountries] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filteredCountries, setFilteredCountries] = useState([]);

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

// //   const handleSearch = (event) => {
// //     setSearchTerm(event.target.value);
// //   };

// //   //////////////////////////////////////////////////////////////


// //   const [persons, setPersons] = useState([
// //     { name: 'Arto Hellas', number : '   040-123456' },
// //     { name: 'John Harrison', number : ' 39-44-5323523' },
// //     { name: 'John Johnson', number : '  12-43-234345' }
// //   ])
// //   const [newName, setNewName] = useState('')
// //   const[error,setError]=useState(null)
// //   const[newNumber,setNewNumber]=useState('')
// //   const [confirmReplace, setConfirmReplace] = useState(false);
// //   const [replacePErson,setReplaceperson]=useState( null)
// //   const [errorMessage,seterrorMessage]=useState('Waiting')


// //   const addName = (event) => {
// //     event.preventDefault() // Evita el comportamiento por defecto del formulario
// // // Suggested code may be subject to a license. Learn more: ~LicenseLog:2388366658.
// //     const existingPerson=persons.find(person => person.name === newName)
// // // Suggested code may be subject to a license. Learn more: ~LicenseLog:1772284877.
// //     if(existingPerson){ 
// //       const confirmerPerson=window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

// //       if(confirmerPerson){
// //         const updatePerson=persons.map(p=>p.name===newName?{...p,name:newName,number:newNumber}:p)
// //         setPersons(updatePerson)
// //         setNewName('');
// //         setNewNumber('');
// //         setConfirmReplace(false);
// //         setReplacePerson(null);
// //       }

// //     }

// //     if(persons.find(person => person.name === newName)) {
// //       Communication.manejarError(newName)

// //       // setError('Name already exists')
// //       // setTimeout(() => {
// //       //   setError(null)
// //       //   alert('Name already exists')
// //       // }, 5000  )
// //       return
// //     }

// //     const findName=(event)=>{

// //       const person = persons.find(person => person.name === 'John Johnson')
// //       if (person) {
// //         person.number = '040-123456'
// //       }
// //       console.log(person)
// //     }

// //     const personObject = {
// //       name: newName,
// //       number:newNumber
// //     }
// //     setPersons(persons.concat(personObject))
// //     setNewName('')
// //     setNewNumber('')
// //     seterrorMessage(newName)

// //   }

// //   const handleNameChange = (event) => {
// //     setNewName(event.target.value)

// //   }

// //   const handleNumberChange = (event) => {
// //     setNewNumber(event.target.value)
// //   }
// //   const handleSearchChange = (event) => {
// //     setSearch(event.target.value)
// //   }

// //   const [search, setSearch] = useState('')

// //       const filteredPersons = persons.filter(person =>
// //       person.name.toLowerCase().includes(search.toLowerCase())
// //     )

// //     const handleDelete = (name) => {
// //       const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
// //       if (confirmDelete) {
// //         const updatedPersons = persons.filter(person => person.name !== name);
// //         setPersons(updatedPersons);
// //       }
// //     };
     

// //   useEffect(() => {
// //     console.log('Persons state updated:', persons)
// //   }, [persons])

// //   return (

// //    ///////////////////countries /////////////////////////////
// //    <div>
      
// //       <h1>Country Information</h1>
// //    <input
// //      type="text"
// //      placeholder="Search for a country"
// //      value={searchTerm}
// //      onChange={handleSearch}
// //    />
// //    {filteredCountries.length > 10 ? (
// //      <p>Too many matches, specify another filter</p>
// //    ) : filteredCountries.length === 1 ? (
// //      <CountryInfo country={filteredCountries[0]} />
// //    ) : (
// //      filteredCountries.map((country) => (
// //        <div key={country.name.common}>
// //          {country.name.common}{' '}
// //          <button onClick={() => setSearchTerm(country.name.common)}>Show</button>
// //        </div>
// //      ))
// //    )}
// //  //countries////////////////////////////////////////////////


// //       <h1 className='h1'>Phonebook</h1>
// //       <Notification message={errorMessage} /> 
      
// //       <form onSubmit={addName}>
// //         <div>
// //           Name: <input value={newName} onChange={handleNameChange} />
// //           </div>
          
// //           <div>
// //           Phone Number: <input value={newNumber} onChange={handleNumberChange} />
// //           </div>
        
// //         <div>
// //           <button type="submit">add</button>
// //         </div>
      
// //       </form>
// //       <h2>Numbers</h2>
// //       {persons.length > 0 && (
// //         <div>
// //           {persons.map(person => <p key={person.name}>{person.name}
// //           {person.number} 
// //           <button onClick={() => handleDelete(person.name)}>Delete</button>
// //           </p>)}
// //         </div> )}
      
      
// //       <div>Search <input value={search} onChange={handleSearchChange}/></div>
// //       {search.length === 0? (<p>No Results Found</p> )
// //       :
// //       (<div>
// //           {filteredPersons.map(person => (
// //             <p key={person.name}>{person.name} {person.number}
// //             <button onClick={() => handleDelete(person.name)}>Delete</button>
// //              </p>
// //           ))}
// //         </div>
       
// //       )}
// //     </div>
// //   )
// // }

// // export default App





// // // import { useState } from 'react'
// // // import reactLogo from './assets/react.svg'
// // // import viteLogo from '/vite.svg'
// // // import './App.css'

// // // function App() {
// // //   const [count, setCount] = useState(0)

// // //   return (
// // //     <>
// // //       <div>
// // //         <a href="https://vitejs.dev" target="_blank">
// // //           <img src={viteLogo} className="logo" alt="Vite logo" />
// // //         </a>
// // //         <a href="https://react.dev" target="_blank">
// // //           <img src={reactLogo} className="logo react" alt="React logo" />
// // //         </a>
// // //       </div>
// // //       <h1>Vite + React</h1>
// // //       <div className="card">
// // //         <button onClick={() => setCount((count) => count + 1)}>
// // //           count is {count}
// // //         </button>
// // //         <p>
// // //           Edit <code>src/App.tsx</code> and save to test HMR
// // //         </p>
// // //       </div>
// // //       <p className="read-the-docs">
// // //         Click on the Vite and React logos to learn more
// // //       </p>
// // //     </>
// // //   )
// // // }

// // // export default App
