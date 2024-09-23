import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import SearchPage from './components/SearchPage';
import AddLocation from './components/AddLocation';
import TambahLokasi from './components/TambahLokasi';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddLocation />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
