import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardItemProps {
  card: {
    id: string;
    question: string;
    category: string;
    correct_answer: string;
  };
  removeCard: (id: string) => void;
}

const CardItem = ({ card, removeCard }: CardItemProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  // const updateCard = async (cardId, newData) => {
  //   const currentCard = doc(db, 'FlashCards', cardId);

  //   await updateDoc(currentCard, newData).catch(err =>
  //     console.log('UpdateCardError ->', err)
  //   );
  // };

  return (
    <Card className="shadow-lg relative">
      <CardHeader>
        <CardTitle>Catégorie: {card.category}</CardTitle>
        <CardDescription>Question: {card.question}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? "Cacher la réponse" : "Afficher la réponse"}
        </Button>
      </CardContent>
      <CardFooter>{showAnswer && <p> {card.correct_answer}</p>}</CardFooter>
      <Button onClick={() => removeCard(card.id)} className="absolute right-5 bottom-5">
        Delete
      </Button>
    </Card>
  );
};

export default CardItem;
