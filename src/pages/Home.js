import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import "./Home.css";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState("");
  const [sortBy, setSortBy] = useState("id");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    axios.get("https://pokedex-api.3rgo.tech/api/pokemon")
      .then((response) => {
        setPokemonList(response.data.data);
        setFilteredList(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erreur lors du chargement des données.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...pokemonList];

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.fr.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        Array.isArray(pokemon.types) && pokemon.types.includes(selectedType)
      );
    }

    if (selectedGeneration) {
      filtered = filtered.filter((pokemon) =>
        pokemon.generation === parseInt(selectedGeneration)
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.fr.localeCompare(b.name.fr);
      if (sortBy === "weight") return a.weight - b.weight;
      if (sortBy === "height") return a.height - b.height;
      return a.id - b.id;
    });

    setFilteredList(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedGeneration, sortBy, pokemonList]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredList.slice(startIndex, startIndex + itemsPerPage);

  const allTypes = [
    ...new Set(
      pokemonList
        .flatMap((p) => Array.isArray(p.types) ? p.types : [])
        .filter((t) => typeof t === "string")
    ),
  ];

  return (
    <div className="home">
      <h1>Pokédex</h1>

      <button onClick={() => document.body.classList.toggle("dark-mode")}>
        🌙 Mode Sombre
      </button>

      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <select onChange={(e) => setSelectedGeneration(e.target.value)} defaultValue="">
          <option value="">-- Génération --</option>
          {[...Array(9).keys()].map((n) => (
            <option key={n + 1} value={n + 1}>Génération {n + 1}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedType(e.target.value)} defaultValue="">
          <option value="">-- Type --</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select onChange={(e) => setSortBy(e.target.value)} defaultValue="id">
          <option value="id">Numéro</option>
          <option value="name">Nom</option>
          <option value="weight">Poids</option>
          <option value="height">Taille</option>
        </select>
      </div>

      <div className="pokemon-list">
        {currentItems.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>⬅️ Précédent</button>
        <span style={{ margin: "0 15px" }}>Page {currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Suivant ➡️</button>
      </div>
    </div>
  );
};

export default Home;
