import './App.css';
import CardList from "./components/cardlist/cardlist.component";
import { SearchBar } from "./components/searchbar/searchbar.component";
import axios from 'axios';
import React, { useState, useEffect } from "react";
  
function App() {
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // This is for Fetch (which was replaced with Axios)
  // useEffect(() => {
  //   const fetchMonsters = async () => {
  //     const response = await fetch("https://jsonplaceholder.typicode.com/users");
  //     const monsters = await response.json();
  //     setMonsters(monsters)
  //   };
  //   fetchMonsters();
  // }, []); // empty array of dependencies, so runs once on initially load 

  // Using Axios (instead of Fetch):
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios(
        'https://jsonplaceholder.typicode.com/users',
      );
      setMonsters(response.data);
    };
    fetchUsers();
  }, []);
    

  useEffect(() => {
    let filtered = [];
    if (searchInput === "") {
    filtered = monsters
    } else {
    filtered = monsters.filter(monster =>
    monster.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    }
    setFilteredMonsters(filtered);
  }, [monsters, searchInput]); // renders when dependencies change

  const handleInput = e => {
    setSearchInput(e.target.value)
  };

  return (
    <div className="App">
      <h1>Monster Rolodex</h1>
      <SearchBar
        placeholder='Search Monster'
        handleInput={handleInput}
      />
      <CardList monsters={filteredMonsters} />
    </div>
    );
}

export default App;
