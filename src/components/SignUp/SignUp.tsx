import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentification } from "@/services/firebase";
import { FirebaseError } from "firebase/app";

export const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");

  const handleSignUp = async () => {
    if (email.trim() === "" || !email.includes("@") || !email.includes(".")) {
      setError("Veuillez entrer une adresse email valide.");
    } else if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
    }

    try {
      await createUserWithEmailAndPassword(authentification, email, password);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue.");
      }
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="w-1/2 flex items-center justify-center">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle>Inscription</CardTitle>
          <CardDescription>Inscrivez-vous sur la plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  id="email"
                  placeholder="matis.galvin@gmail.com"
                  value={email}
                  required
                  type="email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  id="password"
                  type="password"
                  placeholder="*********"
                  value={password}
                  required
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            variant="outline"
          >
            Revenir à la connexion
          </Button>
          <Button disabled={password.length < 8} onClick={handleSignUp}>
            Valider
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
