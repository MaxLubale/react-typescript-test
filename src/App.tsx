
import React from 'react';
import StockTable from './stockTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center my-8">Stock Market</h1>
      <StockTable />
    </div>
  );
};

export default App;