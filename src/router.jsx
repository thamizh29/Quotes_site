import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './upload';
import LoginForm from './login';
import Default from './test';



export default function Main() {
  return (
      <Router>
        <Routes>
          <Route path="/">
          <Route index element={<LoginForm />}/>
          <Route path="/upload" element={<Upload />} />
          <Route path="/quotes" element={<Default />} />
          </Route>
        </Routes>
      </Router>

  );
}


