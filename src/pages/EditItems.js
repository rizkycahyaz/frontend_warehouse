import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, updateItem } from '../api/itemAdminApi';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    lot_batch_no: '',
    part_no: '',
    description: '',
    qty: '',
    unit: '',
    location_id: '',
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await getItemById(id);
        setItem(response);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch item data.');
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateItem(id, item);
      alert('Item updated successfully.');
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Failed to update item.');
    }
  };

  return (
    <Box p={3} component={Paper} elevation={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Part No" name="part_no" value={item.part_no} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Description" name="description" value={item.description} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Quantity" name="qty" type="number" value={item.qty} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Unit" name="unit" value={item.unit} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Location ID" name="location_id" value={item.location_id} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditItem;
