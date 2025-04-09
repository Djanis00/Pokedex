import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [shiny, setShiny] = useState(false);

  useEffect(() => {
    axios.get(`https://pokedex-api.3rgo.tech/api/pokemon/${id}`)
      .then((res) => {
        setPokemon(res.data.data);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement du Pokémon :", err);
      });
  }, [id]);

  if (!pokemon) return <p>Chargement...</p>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Link to="/">⬅️ Retour à la liste</Link>
      <h1>{pokemon.name.fr}</h1>
      <img
        src={shiny ? pokemon.image_shiny : pokemon.image}
        alt={pokemon.name.fr}
        
        style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
          
      />
      <br />
      <button onClick={() => setShiny(!shiny)}>
        {shiny ? "Voir version normale" : "Voir version shiny"}
      </button>
      <p><strong>Génération :</strong> {pokemon.generation}</p>
      <p><strong>Taille :</strong> {pokemon.height} m</p>
      <p><strong>Poids :</strong> {pokemon.weight} kg</p>
      <p><strong>Types :</strong> {pokemon.types.join(", ")}</p>

      <h3>Statistiques</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {pokemon.stats.map((stat, index) => (
          <li key={index}>
            {stat.name.fr} : {stat.value}
          </li>
        ))}
      </ul>

      {/* 🌱 Arbre des évolutions */}
      <h3>Évolution</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "20px" }}>
        {/* Évolutions précédentes */}
        {pokemon.evolution?.pre?.map((evo) => (
          <div key={evo.id}>
            <p>⬅️ {evo.name.fr}</p>
            <img src={evo.image} alt={evo.name.fr} width={80} />
          </div>
        ))}

        {/* Évolutions suivantes */}
        {pokemon.evolution?.next?.map((evo) => (
          <div key={evo.id}>
            <p>{evo.name.fr} ➡️</p>
            <img src={evo.image} alt={evo.name.fr} width={80} />
          </div>
        ))}
      </div>

    </div>
    
  );
};


export default PokemonDetail;
