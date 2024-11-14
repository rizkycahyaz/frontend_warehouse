import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Modal } from '@mui/material';

const ItemDetail = ({ items }) => {
  const itemArray = Array.isArray(items) ? items : [items];
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  if (!itemArray || itemArray.length === 0) return <Typography>No items available</Typography>;

  return (
    <Box sx={{ marginTop: 4, padding: 2 }}>
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }} aria-label="item details table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Lot/Batch No
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Part No
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Description
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Quantity
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Unit
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Location
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Photo material
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemArray.map((item, index) => (
              <TableRow
                key={item.id || index}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                  '&:hover': { backgroundColor: '#f0f0f0' },
                  transition: 'background-color 0.3s',
                }}
              >
                <TableCell align="center">{item.lot_batch_no}</TableCell>
                <TableCell align="center">{item.part_no}</TableCell>
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="center">{item.qty}</TableCell>
                <TableCell align="center">{item.unit}</TableCell>
                <TableCell align="center">
                  {/* Check for empty strings or null values */}
                  {
                    item.warehouse_name ? `${item.warehouse_name}${item.kolom}${item.baris}` : '-' // Display a default value if location properties are empty
                  }
                </TableCell>
                <TableCell align="center">
                  <Box
                    component="img"
                    src={item.photo ? `http://localhost:3000/uploads/${item.photo}` : 'default-image-url.jpg'}
                    alt="item photo"
                    onClick={() => handleOpen(`http://localhost:3000/uploads/${item.photo}`)}
                    sx={{
                      width: 100,
                      height: 50,
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: 1,
                      cursor: 'pointer',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal untuk menampilkan foto dalam ukuran besar */}
      <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          component="img"
          src={selectedImage}
          alt="Expanded item photo"
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: '8px',
            boxShadow: 3,
          }}
        />
      </Modal>
    </Box>
  );
};

export default ItemDetail;
