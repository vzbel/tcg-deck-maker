import "../styles/Card.css";

const Card = ({ card }) => {
  let textColor = "black";
  if (card.color === "black" || card.color === "green") {
    textColor = "white";
  }
  return (
    <article
      style={{ backgroundColor: card.color, color: textColor }}
      className="card"
    >
      <div>
        <h3>{card.name}</h3>
        <p>Archetype: {card.archetype}</p>
      </div>
      <p>Level: {card.level}</p>
      <img src={card.image} alt="Card image" width={200} height={250} style={{objectFit: "cover"}}/>
      <div>
        <small>Ability: {card.ability}</small>
        <br />
        <div>
          <small>ATK: {card.atk} </small>
          <small>DEF: {card.def}</small>
        </div>
      </div>
    </article>
  );
};

export default Card;
