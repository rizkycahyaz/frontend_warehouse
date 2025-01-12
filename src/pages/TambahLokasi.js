import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { addLocation } from '../api/locationApi'; // Pastikan path-nya sesuai

const TambahLokasi = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    warehouse_name: '',
    kolom: '',
    baris: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { warehouse_name, kolom, baris } = formData;
    const code = `${warehouse_name}${kolom}${baris}`; // Gabungkan menjadi code

    try {
      await addLocation({ code }); // Kirim hanya code ke API
      alert('Location added successfully.');
      navigate('/admin'); // Kembali ke dashboard
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Box p={3} component={Paper} elevation={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tambah Lokasi Baru
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Warehouse Name" name="warehouse_name" value={formData.warehouse_name} onChange={handleChange} fullWidth margin="normal" required />
        <TextField
          label="Kolom (01-27)"
          name="kolom"
          value={formData.kolom}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          inputProps={{
            pattern: '[0-9]{2}',
            title: 'Kolom harus berupa angka dua digit, misalnya 01 hingga 27',
          }}
        />
        <TextField
          label="Baris (A-J)"
          name="baris"
          value={formData.baris}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          inputProps={{
            pattern: '[A-J]',
            title: 'Baris harus berupa huruf A hingga J',
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Tambah Lokasi
        </Button>
      </form>
    </Box>
  );
};

export default TambahLokasi;
