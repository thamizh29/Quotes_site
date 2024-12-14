import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./test.scss";

function Default(){
  
}

function Content(){
  return(
    <div class="birthday-card">
  <div class="card-content">
    <h1>Happy Birthday!</h1>
    <p>Wishing you a day filled with love, laughter, and all your favorite things.</p>
    <div class="balloons">
      <div class="balloon red"></div>
      <div class="balloon blue"></div>
      <div class="balloon yellow"></div>
    </div>
    <div class="party-elements">
      <div class="confetti"></div>
      <div class="confetti"></div>
      <div class="confetti"></div>
    </div>
    <button>Celebrate!</button>
  </div>
</div>

  )
}

export default function Test() {
  const [selectedItem, setSelectedItem] = useState("கவிதைகள்");
  const [data, setData] = useState([]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

 const handleFetchData = async (type) => {
    
    const all = `https://quotes-app-84u8.onrender.com/api/quotes`;
    let url = `https://quotes-app-84u8.onrender.com/api/get_quote/${type}`;
    try {
      if(type === "கவிதைகள்")
      {
      const result = await axios.get(all);
      setData(result.data);
      }
      else{
        const result = await axios.get(url);
      setData(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleMenuClick = (item) => {
    if (selectedItem === item) return;
    setSelectedItem(item);
    handleFetchData(item);
    setSidebarVisible(false);
  };
  const sidebarRef = useRef(null); // Reference for the sidebar
  const menuBtnRef = useRef(null); // Reference for the menu button
  useEffect(() => {
    const handleClickOutside = (e) => {
      // If the click is outside both the sidebar and the menu button, close the sidebar
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target)
      ) {
        setSidebarVisible(false);
      }
    };

    // Add event listener for document click
    document.body.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    handleFetchData("கவிதைகள்");
  }, []);

  const renderComponent = () => {
    switch (selectedItem) {
      case "கவிதைகள்":
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
        <button
          className="menu-btn"
          onClick={() => setSidebarVisible(!isSidebarVisible)}
          ref={menuBtnRef}
        >
          ☰
        </button>
        
        <div className="btn-container">
          <Link to="/upload">
            <button className="upload-btn">பதிவேற்றம்</button>
          </Link>
        </div>
      </div>
      <div className="main-container">
        <div
          className={`container-left ${
            isSidebarVisible ? "visible" : "hidden"
          }`}
          ref={sidebarRef}
        >
            <img src="" alt="Logo"/>
          <ul>
            {[
              "என்னவளுக்காக (💖💖)",
              "கவிதைகள்",
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
        <div className={`container-right ${isSidebarVisible ? "blurred" : ""}`}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

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



