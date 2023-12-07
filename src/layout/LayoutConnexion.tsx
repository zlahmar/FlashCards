import { Outlet } from "react-router-dom";

export const LayoutConnexion = () => {
  return (
    <div className="h-screen w-screen flex">
      {/* Soit connexion soit inscription */}
      <Outlet />

      {/* Carré bleu */}
      <div className="w-1/2 bg-indigo-600 flex justify-center items-center rounded-l-[60px]">
        <h1 className="text-white text-3xl">Flashcards</h1>
      </div>
    </div>
  );
};
