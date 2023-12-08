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
}

const CardItem = ({ card }: CardItemProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  // const updateCard = async (cardId, newData) => {
  //   const currentCard = doc(db, 'FlashCards', cardId);

  //   await updateDoc(currentCard, newData).catch(err =>
  //     console.log('UpdateCardError ->', err)
  //   );
  // };

  // const deleteCard = async cardId => {
  //   const currentCard = doc(db, 'FlashCards', cardId);
  //   await deleteDoc(currentCard).catch(err =>
  //     console.log('DeleteCardError ->', err)
  //   );
  // };

  return (
    <Card className="w-[350px] shadow-lg">
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
    </Card>
  );
};

export default CardItem;
