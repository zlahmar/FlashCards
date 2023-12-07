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
import { Link } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
              </div>
            </div>
          </form>
          <p>Vous n'avez pas de compte ? </p>
          <Link to={"/inscription"}>Créer un compte</Link>
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
          <Button onClick={() => console.log(email)}>Valider</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
