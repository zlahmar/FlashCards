import React, { useState, useEffect } from "react";
import axios from "axios";
import Flashcard from "./Cards";
import { LayoutApp } from "@/layout/LayoutApp";

interface Flashcard {
  category: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
}

const CardsAleatoires: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
      );
      setFlashcards(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LayoutApp titre={"Flashcards Aléatoires"}>
      {flashcards.map((flashcard, index) => (
        <Flashcard key={index} flashcard={flashcard} />
      ))}
    </LayoutApp>
  );
};

export default CardsAleatoires;
