import React, { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate } from 'react-router';

export default function Upload() {
  const navigate = useNavigate();
  const [isload,setisload] = useState(false)
  const [data, setData] = useState({
    category: "",
    quote: "",
    author: "",
    title:"",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://quotes-app-84u8.onrender.com/api/upload`;
    try {
      setisload(true)
      const result = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", result.data);
      window.alert("upload sucessfully")
      navigate('/quote')
    } catch (error) {
      console.error("Error uploading data:", error);
    }finally{
      setisload(false)
    }
  };

  return (
    <>
      <div className="header-container">
        <div className='image-container'>
          <img src="" alt="Logo" />
        </div>
        <div className="btn-container">
          <Link to="/quotes">
            <button className="upload-btn">கவிதை</button>
          </Link>
        </div>
      </div>
      <div className="upload-container">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-group">
              <label>கவிதை வகைகள்</label>
              <select
                name="title"
                value={data.title}
                onChange={handleChange}
              >
                <option value="காதல்">காதல்</option>
                <option value="மகிழ்ச்சி">மகிழ்ச்சி</option>
                <option value="நண்பன்">நண்பன்</option>
                <option value="பார்வை">பார்வை</option>
                <option value="அம்மா">அம்மா</option>
                <option value="அப்பா">அப்பா</option>
                <option value="உடன் பிறந்தவர்கள்">சோலை</option>
              </select>
            </div>
            <div className="form-group">
              <label>கவிதை தலைப்பு</label>
              <input
                name="category"
                placeholder="கவிதை தலைப்பு"
                type="text"
                value={data.category}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>ஆசிரியர்
              </label>
              <input
                name="author"
                placeholder="ஆசிரியர்"
                type="text"
                value={data.author}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>கவிதை</label>
              <textarea
                name="quote"
                placeholder="கவிதை"
                value={data.quote}
                onChange={handleChange}
              />
            </div>
            {!isload ? (
            <button type="submit" className="submit-btn">பதிவேற்றம்</button>)
              :
            (<div class="spinner"></div>)
          }
          </form>
        </div>
      </div>
    </>
  );
}
