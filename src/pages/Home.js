import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";

const typeMap = {
  1: "Acier", 2: "Combat", 3: "Dragon", 4: "Eau", 5: "Electrik", 6: "Fée",
  7: "Feu", 8: "Glace", 9: "Insecte", 10: "Normal", 11: "Plante", 12: "Poison",
  13: "Psy", 14: "Roche", 15: "Sol", 16: "Spectre", 17: "Ténèbres", 18: "Vol"
};

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [generation, setGeneration] = useState("");
  const [sort, setSort] = useState("id");

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  };

  useEffect(() => {
    axios.get("https://pokedex-api.3rgo.tech/api/pokemon")
      .then(res => {
        setPokemons(res.data.data);
        setFiltered(res.data.data);
      });
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") document.body.classList.add("dark");
  }, []);

  useEffect(() => {
    let result = [...pokemons];

    if (search) {
      result = result.filter(p =>
        p.name.fr.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type) {
      result = result.filter(p =>
        Array.isArray(p.types) &&
        p.types.some(t => {
          if (typeof t === "string") return t === type;
          if (typeof t === "object" && t.name) return t.name === type;
          if (typeof t === "number") return typeMap[t] === type;
          return false;
        })
      );
    }

    if (generation) {
      result = result.filter(p => p.generation === parseInt(generation));
    }

    if (sort === "name") {
      result.sort((a, b) => a.name.fr.localeCompare(b.name.fr));
    } else if (sort === "weight") {
      result.sort((a, b) => a.weight - b.weight);
    } else if (sort === "height") {
      result.sort((a, b) => a.height - b.height);
    } else {
      result.sort((a, b) => a.id - b.id);
    }

    setFiltered(result);
  }, [search, type, generation, sort, pokemons]);

  const allTypes = [
    ...new Set(
      pokemons.flatMap(p => p.types || []).map(t =>
        typeof t === "string"
          ? t
          : typeof t === "object" && t.name
          ? t.name
          : typeof t === "number"
          ? typeMap[t]
          : "Inconnu"
      )
    )
  ];

  return (
    <div className="home">
      <h1>Pokédex</h1>
      <button onClick={toggleTheme}>
        {document.body.classList.contains("dark") ? "☀️ Mode clair" : "🌙 Mode sombre"}
      </button>

      <input
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        <select onChange={(e) => setType(e.target.value)} defaultValue="">
          <option value="">Type</option>
          {allTypes.map(t => <option key={t}>{t}</option>)}
        </select>

        <select onChange={(e) => setGeneration(e.target.value)} defaultValue="">
          <option value="">Génération</option>
          {[...Array(9).keys()].map(i => (
            <option key={i + 1} value={i + 1}>Génération {i + 1}</option>
          ))}
        </select>

        <select onChange={(e) => setSort(e.target.value)} defaultValue="id">
          <option value="id">Numéro</option>
          <option value="name">Nom</option>
          <option value="weight">Poids</option>
          <option value="height">Taille</option>
        </select>
      </div>

      <div className="pokemon-list">
        {filtered.map(p => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            onClick={() => setSelectedPokemon(p)}
          />
        ))}
      </div>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
};

export default Home;
