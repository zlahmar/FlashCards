import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";
import { LayoutConnexion } from "./layout/LayoutConnexion";

import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { authentification } from "./services/firebase";
import { AuthContext } from "./context/AuthContext";

import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Profile } from "./pages/Profile";
import CardManager from "./pages/CardManager";
import RandomCards from "./pages/CardsAleatoires";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(authentification, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={currentUser}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/random-cards"
            element={
              <ProtectedRoute user={currentUser}>
                <RandomCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={currentUser}>
                <Profile user={currentUser} />
              </ProtectedRoute>
            }
          />
          <Route element={<LayoutConnexion />}>
            <Route path="/connexion" element={<SignIn />} />
            <Route path="/inscription" element={<SignUp />} />
          </Route>

          <Route path="/cards" element={<CardManager />} />

          <Route path="*" element={<h1> Erreur 404</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
export default App;
