import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './App';
import Upload from './upload';
import QuotesApp from './test2';
import LoginForm from './login';
import Default from './test';



export default function Main() {
  return (
  
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/test" element={<Default />} />
          <Route path="/test-2" element={<QuotesApp />}/>
          <Route path="/login" element={<LoginForm />}/>
        </Routes>
      </Router>

  );
}


