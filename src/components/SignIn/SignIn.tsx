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
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentification } from "@/services/firebase";

export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(authentification, email, password);
      navigate("/");
    } catch (error) {
      setError("Identifiants incorrects");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="w-1/2 flex items-center justify-center">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Connectez-vous à votre compte</CardDescription>
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
                />
                {error && <p className="text-red-600">{error}</p>}
              </div>
            </div>
          </form>
          <p className="mt-4">Vous n'avez pas de compte ? </p>
          <Link to={"/inscription"} className="text-indigo-500">
            Créer un compte
          </Link>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            onClick={() => {
              setEmail("");
              setPassword("");
            }}
            variant="outline"
          >
            Annuler
          </Button>
          {/* Se connecter par la bdd */}
          <Button onClick={login}>Valider</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
