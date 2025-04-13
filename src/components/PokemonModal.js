import React, { useEffect, useState } from "react";
import axios from "axios";

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

const PokemonModal = ({ pokemon, onClose }) => {
  const [shiny, setShiny] = useState(false);
  const [evolutionData, setEvolutionData] = useState([]);

  useEffect(() => {
    setShiny(false);
    setEvolutionData([]);

    const target = pokemon.slug || pokemon.id;

    axios
      .get(`https://pokedex-api.3rgo.tech/api/pokemon/${target}`)
      .then((res) => {
        const evo = res.data.data.evolution || [];
        setEvolutionData(evo);
      })
      .catch((err) => {
        console.error("Erreur API :", err);
        setEvolutionData([]);
      });
  }, [pokemon]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>{pokemon.name.fr} #{pokemon.id}</h2>
        <img
          src={shiny ? pokemon.image_shiny : pokemon.image}
          alt={pokemon.name.fr}
        />
        <button onClick={() => setShiny(!shiny)}>
          {shiny ? "Voir Normal" : "Voir Shiny"}
        </button>

        <p><strong>Génération :</strong> {pokemon.generation}</p>
        <p><strong>Type(s) :</strong> {pokemon.types.map(formatType).join(", ")}</p>
        <p><strong>Taille :</strong> {pokemon.height} m</p>
        <p><strong>Poids :</strong> {pokemon.weight} kg</p>

        <h4>Statistiques</h4>
        <ul>
          {Object.entries(pokemon.stats).map(([stat, value]) => (
            <li key={stat}>{stat} : {value}</li>
          ))}
        </ul>

        {evolutionData.length > 0 && (
          <>
            <h4>Évolutions</h4>
            <div className="evolution-list">
              {evolutionData.map((evo) => (
                <div key={evo.id} className="evolution-item">
                  <img src={evo.image} alt={evo.name.fr} />
                  <p>{evo.name.fr}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonModal;
