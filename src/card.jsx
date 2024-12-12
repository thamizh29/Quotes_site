import React from "react";

const QuoteCard = ({ title, quote, author }) => {
  return (
    <div className="quote-card">
      <h2 className="quote-title">{title}</h2>
      <p className="quote-text">"{quote}"</p>
      <p className="quote-author">- {author || "Anonymous"}</p>
    </div>
  );
};

export default QuoteCard;
