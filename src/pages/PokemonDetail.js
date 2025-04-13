import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const typeMap = {
  1: "Acier", 2: "Combat", 3: "Dragon", 4: "Eau", 5: "Electrik", 6: "Fée",
  7: "Feu", 8: "Glace", 9: "Insecte", 10: "Normal", 11: "Plante", 12: "Poison",
  13: "Psy", 14: "Roche", 15: "Sol", 16: "Spectre", 17: "Ténèbres", 18: "Vol"
};

const formatType = (t) => {
  if (typeof t === "string") return t;
  if (typeof t === "object" && t.name) return t.name;
  if (typeof t === "number") return typeMap[t] || `Type ${t}`;
  return "Inconnu";
};

const PokemonDetail = () => {
  const { id } = useParams(); // id = slug maintenant
  const [pokemon, setPokemon] = useState(null);
  const [shiny, setShiny] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pokedex-api.3rgo.tech/api/pokemon/${id}`)
      .then(res => setPokemon(res.data.data))
      .catch(err => console.error("Erreur API :", err));
  }, [id]);

  if (!pokemon) return <p>Chargement...</p>;

  return (
    <div className="detail">
      <button onClick={() => navigate("/")}>⬅ Retour</button>
      <h1>{pokemon.name.fr} #{pokemon.id}</h1>
      <img src={shiny ? pokemon.image_shiny : pokemon.image} alt={pokemon.name.fr} />
      <button onClick={() => setShiny(!shiny)}>
        {shiny ? "Voir Normal" : "Voir Shiny"}
      </button>
      <p>Génération : {pokemon.generation}</p>
      <p>Type(s) : {pokemon.types.map(formatType).join(", ")}</p>
      <p>Taille : {pokemon.height} dm</p>
      <p>Poids : {pokemon.weight} hg</p>
      <h3>Statistiques</h3>
      <ul>
        {Object.entries(pokemon.stats).map(([stat, value]) => (
          <li key={stat}>{stat} : {value}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetail;
