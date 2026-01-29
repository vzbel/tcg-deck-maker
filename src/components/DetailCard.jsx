import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

import { supabase } from "../client";

const DetailCard = () => {
  const [card, setCard] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let ignore = false;
    const getCard = async () => {
      if(!ignore){
        const {data, error} = await supabase.from("CARD").select().eq("id", id);
        if(!error){
          setCard(data[0]);
        }
      }
    };
    getCard();

    return () => { ignore = true };
  }, []);

  let textColor = "black";
  let date = "unknown";
  if(card){
    if (card.color === "black" || card.color === "green") {
      textColor = "white";
    }
    date = new Date(card.created_at).toLocaleDateString();
  }

  return (
    card ?
    <article
      style={{ backgroundColor: card.color, color: textColor }}
      className="card"
    >
      <div>
        <h3>{card.name}</h3>
        <p>Archetype: {card.archetype}</p>
      </div>
      <p>Level: {card.level}</p>
      <div>
        <p>ID: {card.id} </p>
        <p>Created At: {date} </p>
      </div>
      <img
        src={card.image}
        alt="Card image"
        width={200}
        height={250}
        style={{ objectFit: "cover" }}
      />
      <div>
        <small>Ability: {card.ability}</small>
        <br />
        <div>
          <small>ATK: {card.atk} </small>
          <small>DEF: {card.def}</small>
        </div>
      </div>
      <Link to={`/edit/${card.id}`}>
        <button>Edit</button>
      </Link>
    </article>
    :
    <p>No card to show.</p>
  );
};

export default DetailCard;