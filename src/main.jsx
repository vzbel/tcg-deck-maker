import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import CreateCardForm from "./components/CreateCardForm.jsx";
import "./index.css";
import App from "./App.jsx";
import EditCardForm from "./components/EditCardForm.jsx";
import DetailCard from "./components/DetailCard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<CreateCardForm />} />
        <Route path="/edit/:id" element={<EditCardForm />} />
        <Route path="/card/:id" element={<DetailCard />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
