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
  updateCard: (id: string, updatedCardData: any) => void;
  removeCard: (id: string) => void;
}

const CardItem = ({ card, removeCard, updateCard }: CardItemProps) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState(card.category);
  const [updatedQuestion, setUpdatedQuestion] = useState(card.question);
  const [updatedCorrectAnswer, setUpdatedCorrectAnswer] = useState(card.correct_answer);

  const handleUpdate = async () => {
    const updatedData = {
      category: updatedCategory,
      question: updatedQuestion,
      correct_answer: updatedCorrectAnswer,
    };

    // Mise à jour dans la base de données
    try {
      await updateDoc(doc(db, "FlashCards", card.id), updatedData);
      updateCard(card.id, updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleCancel = () => {
    // Réinitialiser les champs
    setUpdatedCategory(card.category);
    setUpdatedQuestion(card.question);
    setUpdatedCorrectAnswer(card.correct_answer);
    setIsEditing(false);
  };

  return (
    <Card className="shadow-lg relative">
      <CardHeader>
        <CardTitle>
          Catégorie: {isEditing ? (
            <Input
              type="text"
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
            />
          ) : (
            card.category
          )}
        </CardTitle>
        <CardDescription>
          Question: {isEditing ? (
            <Input
              type="text"
              value={updatedQuestion}
              onChange={(e) => setUpdatedQuestion(e.target.value)}
            />
          ) : (
            card.question
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isEditing && (
          <Button onClick={() => setShowAnswer(!showAnswer)}>
            {showAnswer ? "Cacher la réponse" : "Afficher la réponse"}
          </Button>
        )}
      </CardContent>
      <CardFooter>
        {showAnswer && <p>{isEditing ? updatedCorrectAnswer : card.correct_answer}</p>}
      </CardFooter>
      {isEditing ? (
        <>
          <CardFooter>
            <Input
              type="text"
              value={updatedCorrectAnswer}
              onChange={(e) => setUpdatedCorrectAnswer(e.target.value)}
            />
          </CardFooter>
          <div className="flex space-x-2 absolute left-500 bottom-5">
          <Button onClick={handleUpdate}>
            Valider
          </Button>
          <Button onClick={handleCancel}>
            Annuler
          </Button>
        </div>
        </>
      ) : (
        <Button onClick={() => setIsEditing(true)} className="absolute left-500 bottom-5">
          Modifier
        </Button>
      )}
      <Button onClick={() => removeCard(card.id)} className="absolute right-5 bottom-5">
        Supprimer
      </Button>
    </Card>
  );
};

export default CardItem;