import React from "react";

const categories = ["Math", "Science", "History"];

const CategoryPage = ({ onSelectCategory }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Select a Subject</h2>
      {categories.map((category) => (
        <button key={category} onClick={() => onSelectCategory(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryPage;
