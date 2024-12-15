import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./test.scss";
import './card.scss';

export default function Default() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return !show ? <Content setShow={setShow} /> : <Test setShow={setShow} />;
}

function Content({setShow}) {
  const[data,setdata] = useState([])
  const GetData = async () => {
    const url =`https://quotes-app-84u8.onrender.com/api/get_quote/default`
  try{
    const response = await axios.get(url); // Fetch data from API
    setdata(response.data)
  }catch(error){
    console.error(error)
  }
  }
  useEffect(() => {
    GetData()
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);
  
  return (
    <div className="parent-container"> 
    <div className="birthday-card">
      <div className="card-content">
        <h1>Happy Birthday!</h1>
        {data.length > 0 ? (
          data.map((item, index) => (
            <p key={index}>{item.quote}</p> // Return JSX inside map
          ))
        ) : (
          <p>Loading wishe...</p> // Fallback UI
        )}
        <div className="balloons">
          <div className="balloon red"></div>
          <div className="balloon blue"></div>
          <div className="balloon yellow"></div>
        </div>
        <div className="party-elements">
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div>
      </div>
    </div>
    </div>
  );
}


export function Test({ setShow }) {
  const [selectedItem, setSelectedItem] = useState("கவிதைகள்");
  const [data, setData] = useState([]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const sidebarRef = useRef(null);
  const menuBtnRef = useRef(null);

  const handleFetchData = async (type) => {
    const allUrl = `https://quotes-app-84u8.onrender.com/api/quotes`;
    const categoryUrl = `https://quotes-app-84u8.onrender.com/api/get_quote/${type}`;
    try {
      const response = type === "கவிதைகள்" ? await axios.get(allUrl) : await axios.get(categoryUrl);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleMenuClick = (item) => {
    if (selectedItem === item) return;
    setSelectedItem(item);
    handleFetchData(item);

    // If "open" is selected, trigger setShow(true)
    if (item === "வாழ்த்துக்கள்") {
      setShow(false);
    }

    setSidebarVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target)
      ) {
        setSidebarVisible(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
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
      case "உடன் பிறந்தவர்கள்":
      case "நண்பன்":
      case "அப்பா":
      case "அம்மா ":
      case "மகிழ்ச்சி":
        return <QuoteList data={data} title={selectedItem} />;
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
          className={`container-left ${isSidebarVisible ? "visible" : "hidden"}`}
          ref={sidebarRef}
        >
          <h1 className="logo-txt">SS Quotes</h1>
          <ul>
            {[
              "என்னவளுக்காக (💖💖)",
              "கவிதைகள்",
              "காதல்",
              "மகிழ்ச்சி",
              "நண்பன்",
              "அப்பா",
              "அம்மா ",
              "உடன் பிறந்தவர்கள்",
              "வாழ்த்துக்கள்",
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

function SmallCard({ quote, onClick }) {
  return (
    <div className="small-card" onClick={onClick}>
      <h3>{quote.category}</h3>
      <p>{quote.quote.substring(0, 50)}...</p>
      <span>- {quote.author}</span>
    </div>
  );
}

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
