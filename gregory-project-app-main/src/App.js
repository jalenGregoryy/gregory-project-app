import React, { useState } from "react";
import "./App.css";
import Button from "./Button";
import Login from "./components/Login";
import CategoryPage from "./components/CategoryPage";

const flashcards = {
  Math: [
    { question: "What is 2 + 2?", answer: "4", },
    { question: "What is 10 ÷ 2?", answer: "5", },
    { question: "What is 5 x 3?", answer: "15", },
    { question: "What is 10 - 8?", answer: "2", },
  ],
  Science: [
    { question: "What planet is known as the Red Planet?", answer: "Mars", },
    { question: "What is H2O?", answer: "Water", },
    { question: "What is the chemical formula for salt?", answer: "NaCl", },
    { question: "What is the green pigment that plants use to make food during photosynthesis?", answer: "Chlorophyll", },
  ],
  History: [
    { question: "Who was the first US president?", answer: "George Washington", },
    { question: "What year did World War II end?", answer: "1945", },
    { question: "How many original colonies were there in 1776?", answer: "13", },
    { question: "How many stars are on the American flag?", answer: "50", },
  ],
};

function Flashcard({ card, inputText, setInputText }) {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>{card.question}</h2>
      <input
        type="text"
        placeholder="Enter your answer"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </div>
  );
}



function FlashcardGallery({ category, onGoBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [inputText, setInputText] = useState("");
  const [feedback, setFeedback] = useState(""); // stores correct or incorrect message

  const cards = flashcards[category];

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCount(count + 1);
      setInputText(""); 
      setFeedback("");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCount(count - 1);
      setInputText(""); 
      setFeedback(""); 
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setCount(0);
    setInputText(""); 
    setFeedback(""); 
  };

  const checkAnswer = () => {
    if (inputText.toLowerCase() === cards[currentIndex].answer.toLowerCase()) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Incorrect :( Try Again");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Category Title with Images */}
      {category === "Math" ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Deus_mathematics.png/960px-Deus_mathematics.png?20210211120521"
            alt="Math Illustration"
            style={{ width: "150px", height: "auto", marginRight: "10px" }}
          />
          <h1>{category} Flashcards</h1>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Deus_mathematics.png/960px-Deus_mathematics.png?20210211120521"
            alt="Math Illustration"
            style={{ width: "150px", height: "auto", marginLeft: "10px" }}
          />
        </div>
      ) : category === "Science" ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src="https://png.pngtree.com/png-vector/20230801/ourmid/pngtree-science-of-elementary-chemistry-png-image_6822789.png"
            alt="Science Illustration"
            style={{ width: "150px", height: "auto", marginRight: "10px" }}
          />
          <h1>{category} Flashcards</h1>
          <img
            src="https://png.pngtree.com/png-vector/20230801/ourmid/pngtree-science-of-elementary-chemistry-png-image_6822789.png"
            alt="Science Illustration"
            style={{ width: "150px", height: "auto", marginLeft: "10px" }}
          />
        </div>
      ) : category === "History" ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src="https://png.pngtree.com/png-clipart/20240416/original/pngtree-history-learn-educational-lesson-landing-header-vector-png-image_14867003.png"
            style={{ width: "150px", height: "auto", marginRight: "10px" }}
          />
          <h1>{category} Flashcards</h1>
          <img
            src="https://png.pngtree.com/png-clipart/20240416/original/pngtree-history-learn-educational-lesson-landing-header-vector-png-image_14867003.png"
            style={{ width: "150px", height: "auto", marginLeft: "10px" }}
          />
        </div>
      ) : (
        <h1>{category} Flashcards</h1>
      )}

      <h2>Cards Studied: {count}</h2>

      {/* Flashcard and Input Section */}
      <Flashcard 
        card={cards[currentIndex]} 
        inputText={inputText} 
        setInputText={setInputText} 
      />

      <button onClick={checkAnswer} style={{ margin: "10px" }}>Submit Answer</button>
      <h3>{feedback}</h3> {/* Displays Correct/Incorrect message */}

      {/* Navigation Buttons */}
      <Button label="Next Card" onClick={handleNext} />
      <Button label="Previous Card" onClick={handlePrev} />
      <Button label="Reset" onClick={handleReset} />

      {/* Back to Categories Button */}
      <button onClick={onGoBack} style={{ marginTop: "10px" }}>
        Back to Categories
      </button>
    </div>
  );
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleGoBackToCategories = () => {
    setSelectedCategory(null);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (!selectedCategory) {
    return <CategoryPage onSelectCategory={handleCategorySelect} />;
  }

  return <FlashcardGallery category={selectedCategory} onGoBack={handleGoBackToCategories} />;
}

export default App;
