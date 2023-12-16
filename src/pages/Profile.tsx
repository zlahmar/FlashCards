import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { User, deleteUser } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
  user: User | null;
}

export const Profile = ({ user }: ProfileProps) => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [validationDelete, setValidationDelete] = useState<string>("");

  const handleDelete = () => {
    if (validationDelete === user?.email) {
      deleteUser(user)
        .then(() => {
          alert("Compte supprimé avec succès");
        })
        .catch((e) => {
          console.error(e);
        });
    }
    return;
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Button className="mb-4 w-[350px]" onClick={() => navigate(-1)}>
        Retour
      </Button>
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle>Votre compte</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="email-used">Email utilisé</Label>
          {user!.email && <Input value={user?.email} />}
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            onClick={() => {
              setShowInput(!showInput);
            }}
            variant="outline"
            className="bg-red-500 mb-4 w-full text-white hover:bg-red-700 hover:text-white"
          >
            Je souhaite supprimer mon compte
          </Button>
          {showInput && (
            <>
              <p>saisir : "{user?.email}"</p>
              <Input
                value={validationDelete}
                onChange={(e) => setValidationDelete(e.target.value)}
              />
              <Button className="mt-4 w-full" onClick={handleDelete}>
                Valider
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
