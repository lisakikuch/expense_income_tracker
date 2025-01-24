import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";

// import NavBar from './components/NavBar';
import TransactionDetails from './components/TransactionDetailsPage';
import TransactionManager from './components/TransactionManager';
import AddTransaction from './components/AddTransaction';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <NavBar /> */}
        <h1>Expense/Income Tracker</h1>
        <Routes>
          <Route
            path="/transactions"
            element={
              <>
                <AddTransaction />
                <TransactionManager />
              </>
            }
          />
          <Route
            path='/transactions/:id'
            element={<TransactionDetails />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
