import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [totalValue, setTotalValue] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [topStock, setTopStock] = useState({});
  const [portfolioDistribution, setPortfolioDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the total portfolio value and portfolio data
        const portfolioResponse = await axios.get('http://localhost:8080/api/portfolio-value');
        setTotalValue(portfolioResponse.data.totalValue);
        setPortfolio(portfolioResponse.data.portfolio);

        // Fetch the top-performing stock
        const topStockResponse = await axios.get('http://localhost:8080/api/top-performing-stock');
        setTopStock(topStockResponse.data);

        // Fetch the portfolio distribution
        const distributionResponse = await axios.get('http://localhost:8080/api/portfolio-distribution');
        console.log('Portfolio Distribution:', distributionResponse.data); // Log the data for debugging
        
        // Map the distribution data to match the PieChart format
        const formattedDistribution = distributionResponse.data.map((item) => ({
          name: item.stock.name, // Extract the stock name
          value: item.distributionPercentage, // Extract the distribution percentage
        }));
        setPortfolioDistribution(formattedDistribution);
      } catch (error) {
        console.error('Error fetching data:', error);
        setPortfolioDistribution([
          { name: 'Stock 1', value: 50 },
          { name: 'Stock 2', value: 30 },
          { name: 'Stock 3', value: 20 }
        ]); // Use default data in case of error
      }
    };

    fetchData();
  }, []);

  // Define an array of colors for the pie chart segments
  const colors = [
    '#8884d8', '#82ca9d', '#ff7f50', '#f1c40f', '#e74c3c', 
    '#3498db', '#2ecc71', '#9b59b6', '#1abc9c', '#16a085'
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Portfolio Dashboard
      </Typography>

      {/* Total Portfolio Value */}
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Box sx={{ p: 3, mt: 3, bgcolor: 'primary.main', color: 'white', borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total Portfolio Value:</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>${totalValue.toFixed(2)}</Typography>
        </Box>
      </motion.div>

      {/* Top-Performing Stock */}
      {topStock.name && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
          <Card sx={{ p: 3, mt: 4, bgcolor: 'success.main', color: 'white', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Top Performing Stock:</Typography>
            <Typography variant="h5">{topStock.name} ({topStock.ticker})</Typography>
            <Typography variant="body1">Current Price: ${topStock.currentPrice.toFixed(2)}</Typography>
          </Card>
        </motion.div>
      )}

      {/* Portfolio Distribution (Pie Chart) */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>Portfolio Distribution</Typography>
      {portfolioDistribution.length === 0 ? (
        <Typography>Loading portfolio distribution...</Typography>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <PieChart width={400} height={400}>
            <Pie
              data={portfolioDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {portfolioDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>
      )}

      {/* Portfolio Details */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>Portfolio Details</Typography>
      <Grid container spacing={3}>
        {portfolio.map((stock) => (
          <Grid item xs={12} sm={6} md={4} key={stock.id}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: stock.id * 0.1 }}
            >
              <Card sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stock.name} ({stock.ticker})
                  </Typography>
                  <Typography>Quantity: <strong>{stock.quantity}</strong></Typography>
                  <Typography>Current Price: <strong>${stock.currentPrice.toFixed(2)}</strong></Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Total: ${(stock.quantity * stock.currentPrice).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
