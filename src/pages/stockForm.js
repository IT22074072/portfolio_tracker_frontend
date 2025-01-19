import React, { useState } from 'react';
import { addStock } from '../api/stockApi';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Grid,
  Snackbar, // Snackbar for displaying messages
  Alert, // Alert component from MUI
} from '@mui/material';

const StockForm = () => {
  const [stock, setStock] = useState({
    name: '',
    ticker: '',
    quantity: '',
    buyPrice: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addStock({
        ...stock,
        quantity: parseFloat(stock.quantity) || 0,
        buyPrice: parseFloat(stock.buyPrice) || 0,
      });
      setSuccessMessage('Stock added successfully!');
      setOpenSnackbar(true); // Show snackbar on success
      setStock({ name: '', ticker: '', quantity: '', buyPrice: '' }); // Reset form
      setErrorMessage(''); // Reset error message if stock is successfully added
    } catch (error) {
      console.error(error);
      setErrorMessage('Error adding stock. Please try again!');
      setOpenSnackbar(true); // Show snackbar on error
      setSuccessMessage(''); // Reset success message if there's an error
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          width: '100%',
          borderRadius: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1976d2' }}
        >
          Add a Stock
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Keep track of your investments by adding stock details below.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Stock Name"
                name="name"
                value={stock.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Ticker Symbol"
                name="ticker"
                value={stock.ticker}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Quantity"
                name="quantity"
                value={stock.quantity}
                onChange={handleChange}
                fullWidth
                type="number"
                inputProps={{ min: 0 }}
                margin="normal"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Buy Price"
                name="buyPrice"
                value={stock.buyPrice}
                onChange={handleChange}
                fullWidth
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                margin="normal"
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={16} />}
              sx={{
                px: 4,
                py: 1.5,
                textTransform: 'capitalize',
                fontWeight: 'bold',
              }}
            >
              {isLoading ? 'Submitting...' : 'Add Stock'}
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Snackbar for success or error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={errorMessage ? 'error' : 'success'} sx={{ width: '100%' }}>
          {errorMessage || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StockForm;
