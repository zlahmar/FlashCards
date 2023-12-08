import { signOut } from "firebase/auth";
import { authentification } from "@/services/firebase";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const Home = () => {
  const currentUser = useContext(AuthContext)
  
  return (
    <div>
      <h1>HOME</h1>
      {currentUser ? `Je suis connecté en tant que ${currentUser.email}` : "Je ne suis pas connecté"}
      
      <Button onClick={() => signOut(authentification)}>Logout</Button>
    </div>
  );
};
