import Card from "./Card";

import {
  BarChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from "recharts";

const DeckDisplay = ({ cards }) => {
  let cardSubset = cards;
  if (cards.length > 10) {
    cardSubset = cards.slice(0, 10);
  }

  const totalAtk = cards.reduce((acc, card) => card.atk + acc, 0);

  return (
    <main>
      <BarChart
        style={{
          width: "100%",
          maxWidth: "500px",
          maxHeight: "300px",
          aspectRatio: 1.618,
        }}
        responsive
        data={cardSubset}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Bar dataKey="atk" fill="#d40000" />
        <Bar dataKey="def" fill="#5f5f5f" />
      </BarChart>
      {totalAtk > 1000 ? (
        <p>You have a powerful team... (atk {">"} 1000)</p>
      ) : (
        <></>
      )}
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </main>
  );
};

export default DeckDisplay;
