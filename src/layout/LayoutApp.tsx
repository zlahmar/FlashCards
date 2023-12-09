import { ReactNode } from "react";


export const LayoutApp = ({ children }: {children: ReactNode}) => {
  return (
    <div className="p-4 bg-gradient-to-br from-blue-300 to-indigo-400">
      <h2 className="text-3xl font-bold mb-4">Mes Flashcards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
};
