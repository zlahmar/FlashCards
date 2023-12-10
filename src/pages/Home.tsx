import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { authentification } from "@/services/firebase";

export const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Bienvenue dans Flash Cards</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/profile"
          className="bg-indigo-700 hover:bg-indigo-600 text-center  text-xl text-white p-32 rounded-lg"
        >
          Profil
        </Link>
        <Link
          to="/cards"
          className="bg-indigo-700 hover:bg-indigo-600 text-white   text-xl  p-32 rounded-lg"
        >
          Créer des Flashcards
        </Link>
        <Link
          to="/cards-aleatoires"
          className="bg-indigo-700 hover:bg-indigo-600 text-white   text-xl p-32 rounded-lg"
        >
          Cartes Aléatoires
        </Link>
        <Button
          className="p-32 h-full text-xl  rounded-lg"
          onClick={() => signOut(authentification)}
        >
          Se déconnecter
        </Button>
      </div>
    </div>
  );
};
