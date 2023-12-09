import { ChangeEvent, useEffect, useState } from "react";
import { db } from "../services/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import CardItem from "@/components/Carditem/CardItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { LayoutApp } from "@/layout/LayoutApp";

interface FlashCards {
  id: string;
  question: string;
  category: string;
  correct_answer: string;
}

const CreationCards = () => {
  const [cardToAdd, setCardToAdd] = useState({
    question: "",
    category: "",
    correct_answer: "",
  });
  const [flashCards, setFlashCards] = useState<FlashCards[]>([]);

  const navigate = useNavigate();

  const getFlashCardsFromFirestore = async () => {
    // Connexion avec la bdd Flashcards
    const collectionFlashCards = collection(db, "FlashCards");

    // On récupère les datas (toutes les cartes)
    const datas = await getDocs(collectionFlashCards);

    const allCards = datas.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(allCards);
    setFlashCards(allCards);
  };

  const addFlashCard = async () => {
    // Ajouter la carte
    await addDoc(collection(db, "FlashCards"), {
      question: cardToAdd.question,
      category: cardToAdd.category,
      correct_answer: cardToAdd.correct_answer,
    })
      .then((response) => {
        setFlashCards((previousState) => [
          {
            question: cardToAdd.question,
            category: cardToAdd.category,
            correct_answer: cardToAdd.correct_answer,
            id: response.id,
          },
          ...previousState,
        ]);

        setCardToAdd({
          question: "",
          category: "",
          correct_answer: "",
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFlashCardsFromFirestore();
  }, []);

  return (
    <LayoutApp>
      <Card className="shadow-lg pt-4">
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <CardTitle>Catégorie :</CardTitle>
                <Input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCardToAdd((previousState) => ({
                      ...previousState,
                      category: e.target.value,
                    }))
                  }
                  id="category"
                  value={cardToAdd.category}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <CardTitle>Question :</CardTitle>
                <Input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCardToAdd((previousState) => ({
                      ...previousState,
                      question: e.target.value,
                    }))
                  }
                  id="question"
                  value={cardToAdd.question}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <CardTitle>La réponse :</CardTitle>
                <Input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCardToAdd((previousState) => ({
                      ...previousState,
                      correct_answer: e.target.value,
                    }))
                  }
                  id="correct_answer"
                  value={cardToAdd.correct_answer}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={addFlashCard}
            disabled={
              cardToAdd.category === "" ||
              cardToAdd.question === "" ||
              cardToAdd.correct_answer === ""
            }
          >
            Valider
          </Button>
        </CardFooter>
      </Card>
      {flashCards.map((card, i) => (
        <CardItem key={i} card={card} />
      ))}
    </LayoutApp>
  );
};

export default CreationCards;
