import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { getStocks, deleteStock, updateStock } from '../api/stockApi';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [updatedStock, setUpdatedStock] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });


  useEffect(() => {
    const fetchStocks = async () => {
      const data = await getStocks();
      setStocks(data);
    };
    fetchStocks();
  }, []);

  const handleDelete = async () => {
    if (selectedStock) {
      await deleteStock(selectedStock.id);
      setStocks(stocks.filter((stock) => stock.id !== selectedStock.id));
      setSnackbar({open:true, message:'Stock deleted successfully!', severity:'success'});
      setDeleteDialogOpen(false);
      setSelectedStock(null);
    }
  };

  const handleUpdate = async () => {
    if (selectedStock) {
      await updateStock(selectedStock.id, updatedStock);
      setStocks(
        stocks.map((stock) =>
          stock.id === selectedStock.id ? { ...stock, ...updatedStock } : stock
        )
      );
      setSnackbar({open:true, message:'Stock updated successfully!', severity:'success'});
      setUpdateDialogOpen(false);
      setSelectedStock(null);
    }
  };

  const openDeleteDialog = (stock) => {
    setSelectedStock(stock);
    setDeleteDialogOpen(true);
  };

  const openUpdateDialog = (stock) => {
    setSelectedStock(stock);
    setUpdatedStock(stock);
    setUpdateDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedStock(null);
  };

  const closeUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedStock(null);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStock({ ...updatedStock, [name]: value });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1976d2' }}
      >
        Your Stocks
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ticker</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Buy Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Total Purchase</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.length > 0 ? (
              stocks.map((stock) => (
                <TableRow key={stock.id}>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell>{stock.ticker}</TableCell>
                  <TableCell>{stock.quantity}</TableCell>
                  <TableCell>${stock.buyPrice.toFixed(2)}</TableCell>
                  <TableCell>${(stock.buyPrice * stock.quantity).toFixed(2)}</TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ mr: 1 }}
                      onClick={() => openUpdateDialog(stock)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => openDeleteDialog(stock)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No stocks found. Add your first stock!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the stock{' '}
            <strong>{selectedStock?.name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Stock Dialog */}
      <Dialog
        open={updateDialogOpen}
        onClose={closeUpdateDialog}
        aria-labelledby="update-dialog-title"
      >
        <DialogTitle id="update-dialog-title">Update Stock</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={updatedStock.name || ''}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ticker"
            name="ticker"
            value={updatedStock.ticker || ''}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={updatedStock.quantity || ''}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Buy Price"
            name="buyPrice"
            type="number"
            value={updatedStock.buyPrice || ''}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="success">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Success Messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default StockTable;
