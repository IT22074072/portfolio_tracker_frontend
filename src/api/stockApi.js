import axios from 'axios';

export const getStocks = async () => {
  const response = await axios.get('http://localhost:8080/api/stocks');
  return response.data;
};

export const addStock = async (stock) => {
  await axios.post('http://localhost:8080/api/stock', stock);
};

export const deleteStock = async (id) => {
  await axios.delete(`http://localhost:8080/api/stock/${id}`);
};

export const updateStock = async (id, updatedStock) => {
  await axios.put(`http://localhost:8080/api/stock/${id}`, updatedStock)
}