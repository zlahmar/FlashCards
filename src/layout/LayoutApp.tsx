import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export const LayoutApp = ({
  children,
  titre,
}: {
  children: ReactNode;
  titre: string;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="p-4 min-h-screen ">
        <Button onClick={() => navigate(-1)}>Retour</Button>
        <h2 className="text-3xl font-bold mb-4">{titre}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {children}
        </div>
      </div>
    </>
  );
};
