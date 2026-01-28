import Card from "./Card";

const DeckDisplay = ({ cards }) => {
  return (
    <main>
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </main>
  );
};

export default DeckDisplay;
