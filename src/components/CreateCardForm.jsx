import "../styles/CreateCardForm.css";
import { useState } from "react";
import { supabase } from "../client.js";

import LabeledInput from "./LabeledInput.jsx";
import { useNavigate } from "react-router";

const levelRange = [1, 60];
const atkDefRange = [1, 1000];

const CreateCardForm = () => {
  const [card, setCard] = useState({
    color: "black",
    name: "",
    image: "",
    archetype: "fire",
    level: 0,
    atk: 0,
    def: 0,
    ability: "",
  });
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (card.archetype === "fire" && card.atk > 900) {
      alert("Too OP, lower attack");
    } else {
      setDisabled(true);
      const { error } = await supabase.from("CARD").insert(card);
      if (error) {
        alert(error);
      } else {
        setDisabled(false);
        alert("Successfully added card!");
        // navigate to home page
        navigate("/");
      }
    }
  };

  const handleFormChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleNumericFormChange = (e) => {
    setCard({ ...card, [e.target.name]: Number(e.target.value) });
  };

  return (
    <div>
      <h2>Create a Card</h2>
      <form onSubmit={handleSubmit} className="create-form">
        <label htmlFor="color">Color</label>
        <select
          name="color"
          id="color"
          required
          value={card.color}
          onChange={handleFormChange}
        >
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="green">Green</option>
        </select>
        {/* Card name */}
        <LabeledInput
          name="name"
          text="Name"
          placeholder="Andromeda, Galactic"
          value={card.name}
          onChange={handleFormChange}
        />

        {/* Card image */}
        <LabeledInput
          name="image"
          text="Image"
          placeholder="https://www.imgur.com/..."
          value={card.image}
          onChange={handleFormChange}
        />

        {/* Card archetype */}
        <label htmlFor="archetype">Archetype</label>
        <select
          name="archetype"
          id=""
          required
          value={card.archetype}
          onChange={handleFormChange}
        >
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="earth">Earth</option>
          <option value="wind">Wind</option>
        </select>

        {/* Card Level */}
        <label htmlFor="level">Level</label>
        <input
          id="level"
          type="range"
          name="level"
          min={levelRange[0]}
          max={levelRange[1]}
          value={card.level}
          step={1}
          onChange={handleNumericFormChange}
          required
        />
        <p>{card.level}</p>

        {/* Card ATK, DEF */}
        <label htmlFor="atk">Attack</label>
        <input
          type="range"
          name="atk"
          min={atkDefRange[0]}
          max={atkDefRange[1]}
          value={card.atk}
          step={1}
          onChange={handleNumericFormChange}
          required
        />
        <p>{card.atk}</p>

        <label htmlFor="def">Defense</label>
        <input
          type="range"
          name="def"
          min={atkDefRange[0]}
          max={atkDefRange[1]}
          value={card.def}
          step={1}
          onChange={handleNumericFormChange}
          required
        />
        <p>{card.def}</p>

        <label htmlFor="ability">Ability</label>
        <textarea
          name="ability"
          id="ability"
          value={card.ability}
          onChange={handleFormChange}
          required
          placeholder="astronomic fire - a fire of large magnitude, critical damage for earth characters"
        ></textarea>

        {/* Card ability */}
        <button disabled={disabled}>Submit</button>
      </form>
    </div>
  );
};

export default CreateCardForm;
