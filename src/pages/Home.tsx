import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { authentification } from "@/services/firebase";

export const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-300 to-indigo-400 h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Bienvenue dans Flash Cards</h1>
      <div className="flex space-x-4">
        <Link
          to="/profile"
          className="bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Profil
        </Link>
        <Link
          to="/cards"
          className="bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Créer des Flashcards
        </Link>
        <Link
          to="/cards-aleatoires"
          className="bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Cartes Aléatoires
        </Link>
        <Button onClick={() => signOut(authentification)}>
          Se déconnecter
        </Button>
      </div>
    </div>
  );
};
