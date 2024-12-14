import React from "react";
import "./BirthdayCard.css"; // Create a separate CSS file for styling

const BirthdayCard = () => {
  return (
    <div className="birthday-card">
      <div className="balloons">
        <div className="balloon red"></div>
        <div className="balloon blue"></div>
        <div className="balloon yellow"></div>
      </div>
      <div className="card-content">
        <h1 className="title">Happy Birthday!</h1>
        <div className="cake">
          <div className="cake-base">
            <div className="layer top"></div>
            <div className="layer middle"></div>
            <div className="layer bottom"></div>
          </div>
          <div className="candles">
            <div className="candle"></div>
            <div className="candle"></div>
            <div className="candle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCard;
