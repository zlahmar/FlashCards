import React, { useState } from 'react';
import { Button } from '@/components/ui/button';


interface FlashcardProps {
  flashcard: {
    category: string;
    difficulty: string;
    correct_answer: string;
    incorrect_answers: string[];
    question: string;
  };
}

const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  const toggleAnswers = () => {
    setShowAnswers((prevShowAnswers) => !prevShowAnswers);
  };

  return (
    <div className="bg-blue-200 p-4 rounded shadow">
      <p className="font-bold text-lg mt-4">Category:</p>
      <p>{flashcard.category}</p>

      <p className="font-bold text-lg mt-4">Difficulty:</p>
      <p>{flashcard.difficulty}</p>

      <p className="font-bold text-lg mt-4">Question:</p>
      <p>{decodeURIComponent(flashcard.question)}</p>

      {/* Afficher le bouton Answer */}
      <Button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={toggleAnswers}>
        Answer
      </Button>

      {/* Condition pour afficher les réponses */}
      {showAnswers && (
        <>
          <p className="font-bold text-lg mt-4">Correct Answer:</p>
          <p>{decodeURIComponent(flashcard.correct_answer)}</p>
          <p className="font-bold text-lg mt-4">Incorrect Answers:</p>
          <ul>
            {flashcard.incorrect_answers.map((incorrectAnswer, i) => (
              <li key={i}>{decodeURIComponent(incorrectAnswer)}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Flashcard;
