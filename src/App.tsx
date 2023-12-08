import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";
import { LayoutConnexion } from "./layout/LayoutConnexion";
import { useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { authentification } from "./services/firebase";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  onAuthStateChanged(authentification, (user) => {
    setCurrentUser(user);
  });

  return (
    <AuthContext.Provider value={currentUser}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<LayoutConnexion />}>
            <Route path="/connexion" element={<SignIn />} />
            <Route path="/inscription" element={<SignUp />} />
          </Route>
          <Route path="*" element={<h1> Erreur 404</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
export default App;
