import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Cards';

interface Flashcard {
  category: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
}

const CardsAleatoires: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'
        );
        setFlashcards(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gradient-to-br from-blue-300 to-indigo-400">
      <h2 className="text-3xl font-bold mb-4">Flashcards Aléatoires</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map((flashcard, index) => (
          <Flashcard key={index} flashcard={flashcard} />
        ))}
      </div>
    </div>
  );
};

export default CardsAleatoires;
