import './App.css';

import CardList from "./components/cardlist/cardlist.component";
import { SearchBar } from "./components/searchbar/searchbar.component";

import React, { useState, useEffect } from "react";
  
function App() {
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchMonsters = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const monsters = await response.json();
      setMonsters(monsters)
    };
    fetchMonsters();
  }, []); // empty array of dependencies, so runs once on initially load 

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
