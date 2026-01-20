import "./App.css";
import { useState } from "react";
import LoginForm from "./components/LoginForm.jsx";

const App = () => {
  const [session, setSession] = useState(null);
  return (
    <>
      <LoginForm session={session} setSession={setSession} />
    </>
  );
};

export default App;
