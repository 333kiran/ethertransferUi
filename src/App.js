import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Deposit from './Deposit';
import TransactionInfo from './TransactionInfo';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Token Approval App</h1>
          {/* <nav>
            <Link to="/">Home</Link>
            <Link to="/deposit">Deposit</Link>
            <Link to="/transaction-info">Transaction Info</Link>
          </nav> */}
        </header>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/deposit" element={<Deposit/>} />
          <Route exact path="/transaction-info" element={<TransactionInfo/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

