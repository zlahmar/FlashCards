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

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const [prenom, setPrenom] = useState<string>("");

  const navigate = useNavigate();

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
                <Label htmlFor="nom">Nom</Label>
                <Input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNom(e.target.value)
                  }
                  id="nom"
                  placeholder="galvin"
                  value={nom}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="prenom">Prenom</Label>
                <Input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPrenom(e.target.value)
                  }
                  id="prenom"
                  placeholder="matis"
                  value={prenom}
                />
              </div>
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
          <Button onClick={() => console.log(email)}>Valider</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
