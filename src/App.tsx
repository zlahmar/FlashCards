import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";
import { LayoutConnexion } from "./layout/LayoutConnexion";

function App() {
  return (
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
  );
}
export default App;
