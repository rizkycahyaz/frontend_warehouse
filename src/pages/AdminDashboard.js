import React, { useState, useEffect } from 'react';
import { deleteItem, getAdminItems } from '../api/itemAdminApi';
import { Link } from 'react-router-dom';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getAdminItems();
        const data = response;

        // Urutkan data berdasarkan `createdAt` dari yang terbaru
        const sortedData = Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
        setItems(sortedData);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteItem(deleteId);
      setItems(items.filter((item) => item.lot_batch_no !== deleteId));
      setOpenConfirm(false);
      setDeleteId(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleOpenConfirm = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setDeleteId(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} component={Link} to="/admin/add-item">
          Add New Item
        </Button>
      </Box>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lot/Batch No</TableCell>
              <TableCell>Part No</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Location ID</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 ? (
              items.map((item) => (
                <TableRow key={item.lot_batch_no}>
                  <TableCell>{item.lot_batch_no}</TableCell>
                  <TableCell>{item.part_no}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.location_id}</TableCell>
                  <TableCell>
                    <img
                      src={`http://localhost:3000/uploads/${item.photo}`}
                      alt="Item"
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`/admin/edit-item/${item.lot_batch_no}`} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleOpenConfirm(item.lot_batch_no)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Konfirmasi Hapus */}
      <Dialog open={openConfirm} onClose={handleCloseConfirm} aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-description">
        <DialogTitle id="confirm-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">Are you sure you want to delete this item?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
