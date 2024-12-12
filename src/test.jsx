import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuoteCard from "./card";

export default function Test() {
  const [selectedItem, setSelectedItem] = useState("Love");
  const [data, setData] = useState([]);

  const handleFetchData = async (type) => {
    let url = "";
    switch (type) {
      case "For You":
        url = `https://quotes-app-84u8.onrender.com/api/get_quote/birthday`;
        break;
      case "Love":
        url = `http://192.168.1.18:5000/api/quotes`;
        break;
      // Add other cases with their respective APIs
      default:
        return;
    }

    try {
      const result = await axios.get(url);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuClick = (item) => {
    setSelectedItem(item);
    handleFetchData(item); // Fetch data when menu is clicked
  };

  const renderComponent = () => {
    switch (selectedItem) {
      case "For You":
      case "Love":
        return <QuoteList data={data} title={selectedItem} />;
      case "Friend":
        return <FriendComponent />;
      case "Appa":
        return <AppaComponent />;
      case "Amma":
        return <AmmaComponent />;
      case "Siblings":
        return <SiblingsComponent />;
      default:
        return <div>Select an item to display</div>;
    }
  };

  return (
    <div>
      <div className="header-container">
        <div className="image-container">
          <img src="" alt="Logo" />
        </div>
        <div className="btn-container">
          <Link to={"/upload"}>
            <button className="upload-btn">Upload</button>
          </Link>
        </div>
      </div>
      <div className="main-container">
        <div className="container-left">
          <ul>
            {["For You", "Love", "Friend", "Appa", "Amma", "Siblings"].map(
              (item) => (
                <li key={item} onClick={() => handleMenuClick(item)}>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
        <div className="container-right">{renderComponent()}</div>
      </div>
    </div>
  );
}

// QuoteList Component
function QuoteList({ data, title }) {
  return (
    <div>
      <h2>{title} Quotes</h2>
      <div>
        {data.map((item, key) => (
          <QuoteCard
            key={key}
            title={item.category}
            quote={item.quote}
            author={item.author}
          />
        ))}
      </div>
    </div>
  );
}

// Friend Component
function FriendComponent() {
  return <div>This is the Friend Component</div>;
}

// Appa Component
function AppaComponent() {
  return <div>This is the Appa Component</div>;
}

// Amma Component
function AmmaComponent() {
  return <div>This is the Amma Component</div>;
}

// Siblings Component
function SiblingsComponent() {
  return <div>This is the Siblings Component</div>;
}


