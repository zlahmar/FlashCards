import { ChangeEvent, useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import CardItem from "@/components/Carditem/CardItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LayoutApp } from "@/layout/LayoutApp";
import { Loading } from "@/components/Loading/Loading";

export interface FlashCards {
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

  const updateCard = (updatedCardData: FlashCards) => {
    const updatedFlashCards = flashCards.map((card) =>
      card.id === updatedCardData.id ? { ...card, ...updatedCardData } : card
    );
  
    setFlashCards(updatedFlashCards);
  };

  const removeCard = async (id: string) => {
    const updatedFlashCards = flashCards.filter((card) => card.id !== id);
    const currentCard = doc(db, "FlashCards", id);
    await deleteDoc(currentCard).catch((err) =>
      console.log("DeleteCardError ->", err)
    );
    setFlashCards(updatedFlashCards);
  };

  useEffect(() => {
    getFlashCardsFromFirestore();
  }, []);

  return (
    <LayoutApp titre="Mes flashCards">
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
      {flashCards.length > 0 ? (
        flashCards.map((card, i) => (
          <CardItem key={i} card={card} removeCard={removeCard} />
        ))
      ) : (
        <Loading />
      )}
      {flashCards.length > 0 ? flashCards.map((card, i) => (
        <CardItem
          updateCard={() => updateCard}
          key={i}
          card={card}
          removeCard={removeCard}
        />
      )): (
        <Loading />
      )}
    </LayoutApp>
  );
};

export default CreationCards;
