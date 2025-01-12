import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Snackbar,
  Alert,
  Modal,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { deleteItem, getAdminItems } from '../api/itemAdminApi';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openModal, setOpenModal] = useState(false); // State untuk modal
  const [selectedImage, setSelectedImage] = useState(''); // State untuk gambar modal
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getAdminItems();
        const data = response;
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
      setSnackbarMessage('Item deleted successfully');
      setSnackbarOpen(true);
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpenModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage('');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box p={3} mb={4}>
      <Typography variant="h4" component="h1">
        Admin Dashboard
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} component={Link} to="/admin/add-item">
          Add New Item
        </Button>
      </Box>
      <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Lot/Batch Number</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Part No</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Unit</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Photo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <TableRow
                    key={item.lot_batch_no}
                    sx={{
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                    }}
                  >
                    <TableCell>{item.lot_batch_no}</TableCell>
                    <TableCell>{item.part_no}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell align="right">{item.qty}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{`${item.warehouse_name}${item.kolom}${item.baris}`}</TableCell>
                    <TableCell>
                      <img
                        src={`http://localhost:3000/uploads/${item.photo}`}
                        alt="Item"
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleOpenModal(`http://localhost:3000/uploads/${item.photo}`)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton component={Link} to={`/admin/edit-item/${item.lot_batch_no}`} color="primary" aria-label="Edit Item">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleOpenConfirm(item.lot_batch_no)} aria-label="Delete Item">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mt={2}>
        <Pagination count={Math.ceil(items.length / itemsPerPage)} page={currentPage} onChange={(_, page) => setCurrentPage(page)} color="primary" shape="rounded" />
      </Box>
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          component="img"
          src={selectedImage}
          alt="Expanded item photo"
          sx={{
            maxWidth: '90%',
            maxHeight: '90%',
            margin: 'auto',
            display: 'block',
            borderRadius: '8px',
          }}
        />
      </Modal>
    </Box>
  );
};

export default AdminDashboard;
