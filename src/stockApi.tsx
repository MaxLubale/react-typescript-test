
// to be put in .env file during production
const API_KEY = 'RIBXT3XYLI69PC0Q ';     

export interface StockData {
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const fetchStockData = async (symbol: string): Promise<StockData[]> => {
  try {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await response.json();
    const stockData: StockData[] = [];

    for (const key in data['Time Series (Daily)']) {
      const stock = data['Time Series (Daily)'][key];
      stockData.push({
        symbol,
        open: parseFloat(stock['1. open']),
        high: parseFloat(stock['2. high']),
        low: parseFloat(stock['3. low']),
        close: parseFloat(stock['4. close']),
        volume: parseFloat(stock['5. volume']),
      });
    }

    return stockData;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export default fetchStockData; 
