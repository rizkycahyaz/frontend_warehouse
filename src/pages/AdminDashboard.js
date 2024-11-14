import React, { useState, useEffect } from "react";
import { deleteItem, getAdminItems } from "../api/itemAdminApi";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const AdminDashboard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getAdminItems();
        console.log("Data fetched:", response);
        const data = response;
        console.log("Data structure:", data[0]);
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter((item) => item.lot_batch_no !== id));
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" component="h1" gutterBottom></Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/admin/add-item"
        >
          Add New Item
        </Button>
      </Box>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
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
                  <TableCell>{item.id}</TableCell>
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
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="eror"
                      onClick={() => handleDelete(item.lot_batch_no)}
                    >
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
    </Box>
  );
};

export default AdminDashboard;
