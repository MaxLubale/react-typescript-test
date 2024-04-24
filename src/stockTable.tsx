import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { fetchStockData, StockData } from './stockApi';
import Spinner from 'react-bootstrap/Spinner';

const StockTable: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('');
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [filteredStockData, setFilteredStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching data
        const data = await fetchStockData(symbol);
        setStockData(data);
        setFilteredStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false); // Set loading to false when data fetching completes
      }
    };

    fetchData();
  }, [symbol]);

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(e.target.value);
  };

  const handleSearch = () => {
    const filteredData = stockData.filter(stock => stock.symbol.toUpperCase() === symbol.toUpperCase());
    setFilteredStockData(filteredData);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={symbol}
          onChange={handleSymbolChange}
          className="border border-gray-400 p-2 rounded-md"
        />
         <Button variant="primary">Search</Button>{' '}
      </div>
      {loading ? ( // Show Spinner if loading is true
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {filteredStockData.map((stock, index) => (
              <tr key={index}>
                <td>{stock.symbol}</td>
                <td>{stock.open}</td>
                <td>{stock.high}</td>
                <td>{stock.low}</td>
                <td>{stock.close}</td>
                <td>{stock.volume}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default StockTable;
