import React from 'react';

import Header from './molecules/Header';
import ExchangeForm from './molecules/ExchangeForm';
import TransactionsList from './molecules/TransactionsList';

const App = () => (
  <div className="app">
    <Header />
    <div className="container">
      <div className="content">
        <div>
          <ExchangeForm />
        </div>
        <div style={{ marginTop: 20 }}>
          <TransactionsList />
        </div>
      </div>
    </div>
  </div>
);

export default App;

