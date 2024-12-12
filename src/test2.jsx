import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.scss";

export default function Test() {
  const [selectedItem, setSelectedItem] = useState("கவிதை");
  const [data, setData] = useState([]);

  // Fetch data for the selected item
  const handleFetchData = async (type) => {
    let url = "";
    switch (type) {
      case "கவிதை":
        url = "http://192.168.1.18:5000/api/quotes";
        break;
      case "என்னவளுக்காக (💖💖)":
        url = "https://quotes-app-84u8.onrender.com/api/get_quote/birthday";
        break;
      case "காதல்":
        url = "https://quotes-app-84u8.onrender.com/api/get_quote/birthday";
        break;
      // Add additional cases for other menu items if needed
      default:
        return;
    }

    try {
      const result = await axios.get(url);
      setData(result.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Handle menu item click
  const handleMenuClick = (item) => {
    if (selectedItem === item) return; // Prevent redundant fetch
    setSelectedItem(item);
    handleFetchData(item);
  };

  // Initial fetch for all quotes
  useEffect(() => {
    handleFetchData("கவிதை");
  }, []);

  // Render the appropriate component based on selected item
  const renderComponent = () => {
    switch (selectedItem) {
      case "கவிதை":
      case "என்னவளுக்காக (💖💖)":
      case "காதல்":
        return <QuoteList data={data} title={selectedItem} />;
      case "நண்பன்":
        return <FriendComponent />;
      case "அப்பா":
        return <AppaComponent />;
      case "அம்மா ":
        return <AmmaComponent />;
      case "உடன் பிறந்தவர்கள்":
        return <SiblingsComponent />;
      default:
        return <div>Select an item to display</div>;
    }
  };

  return (
    <div>
      <div className="header-container">
        <div className="image-container">
          <img src="" alt="சின்னம்" />
        </div>
        <div className="btn-container">
          <Link to="/upload">
            <button className="upload-btn">பதிவேற்றம்</button>
          </Link>
        </div>
      </div>
      <div className="main-container">
        <div className="container-left">
          <ul>
            {[
              "கவிதை",
              "என்னவளுக்காக (💖💖)",
              "காதல்",
              "நண்பன்",
              "அப்பா",
              "அம்மா ",
              "உடன் பிறந்தவர்கள்",
            ].map((item) => (
              <li key={item} onClick={() => handleMenuClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="container-right">{renderComponent()}</div>
      </div>
    </div>
  );
}

// QuoteList Component
function QuoteList({ data, title }) {
  const [selectedQuote, setSelectedQuote] = useState(null);

  const handleCardClick = (quote) => {
    setSelectedQuote(quote);
  };

  const handleClose = () => {
    setSelectedQuote(null);
  };

  return (
    <div className="app-container">
      <h2>{title}</h2>
      <div className="quote-grid">
        {data.length > 0 ? (
          data.map((quote, index) => (
            <SmallCard
              key={index}
              quote={quote}
              onClick={() => handleCardClick(quote)}
            />
          ))
        ) : (
          <p>No quotes available.</p>
        )}
      </div>

      {selectedQuote && (
        <FullScreenCard quote={selectedQuote} onClose={handleClose} />
      )}
    </div>
  );
}

// Friend Component
function FriendComponent() {
  return <div>This is the நண்பன் Component</div>;
}

// Appa Component
function AppaComponent() {
  return <div>This is the Appa Component</div>;
}

// Amma Component
function AmmaComponent() {
  return <div>This is the அம்மா  Component</div>;
}

// Siblings Component
function SiblingsComponent() {
  return <div>This is the உடன் பிறந்தவர்கள் Component</div>;
}

// SmallCard Component
function SmallCard({ quote, onClick }) {
  return (
    <div className="small-card" onClick={onClick}>
      <h3>{quote.category}</h3>
      <p>{quote.quote.substring(0, 50)}...</p>
      <span>- {quote.author}</span>
    </div>
  );
}

// FullScreenCard Component
function FullScreenCard({ quote, onClose }) {
  return (
    <div className="fullscreen-card">
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
      <div className="content">
        <h2>{quote.title}</h2>
        <p>"{quote.quote}"</p>
        <span>- {quote.author}</span>
      </div>
    </div>
  );
}
