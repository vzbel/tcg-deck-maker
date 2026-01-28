import "./App.css";
import { useState } from "react";
import LoginForm from "./components/LoginForm.jsx";
import { Link } from "react-router";

const App = () => {
  const [session, setSession] = useState(null);
  return (
    <>
      <LoginForm session={session} setSession={setSession} />
      {session && (
        <Link to="/create">
          <button>Add a Card</button>
        </Link>
      )}
    </>
  );
};

export default App;
