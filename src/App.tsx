import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";
import { LayoutConnexion } from "./layout/LayoutConnexion";
import CardsAleatoires from './pages/CardsAleatoires';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/connexion" element={<LayoutConnexion />}>
          <Route index element={<SignIn />} />
          <Route path="inscription" element={<SignUp />} />
        </Route>
        <Route path="/cards-aleatoires" element={<CardsAleatoires />} />
        <Route path="*" element={<h1>Erreur 404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
