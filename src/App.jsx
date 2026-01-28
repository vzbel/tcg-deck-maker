import "./App.css";
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm.jsx";
import DeckDisplay from "./components/DeckDisplay.jsx";
import { Link } from "react-router";
import { supabase } from "./client.js";

const App = () => {
  const [session, setSession] = useState(null);
  const [cards, setCards] = useState(null);

  useEffect(() => {
    let ignore = false;
    const getCards = async () => {
      if (!ignore) {
        const { data, error } = await supabase
          .from("CARD")
          .select()
          .order("created_at", { ascending: false });
        if (error) {
          console.error(error);
        } else {
          setCards(data);
        }
      }
    };
    getCards();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <LoginForm session={session} setSession={setSession} />
      {session && (
        <Link to="/create">
          <button>Add a Card</button>
        </Link>
      )}
      {session && cards && <DeckDisplay cards={cards} />}
    </>
  );
};

export default App;
