import React, { useState } from "react";

const flashcards = {
  Math: [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the square root of 16?", answer: "4" },
  ],
  Science: [
    { question: "What planet is known as the Red Planet?", answer: "Mars" },
    { question: "What is H2O?", answer: "Water" },
  ],
  History: [
    { question: "Who was the first president of the US?", answer: "George Washington" },
    { question: "What year did World War II end?", answer: "1945" },
  ],
  Literature: [
    { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
    { question: "What is the main theme of '1984'?", answer: "Totalitarianism" },
  ],
};

const FlashcardPage = ({ category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const cards = flashcards[category];

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  return (
    <div className="flashcard-container">
      <h2>{category} Flashcards</h2>
      <div className="flashcard" onClick={() => setShowAnswer(!showAnswer)}>
        <p>{showAnswer ? cards[currentIndex].answer : cards[currentIndex].question}</p>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default FlashcardPage;
