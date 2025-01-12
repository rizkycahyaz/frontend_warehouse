import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, updateItem, getLocations } from '../api/itemAdminApi';
import { Box, Button, TextField, Typography, Paper, Snackbar } from '@mui/material';
import Select from 'react-select';

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    lot_batch_no: '',
    part_no: '',
    description: '',
    qty: '',
    unit: '',
  });
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState('');
  const [photo, setPhoto] = useState(null); // Tambahkan state untuk foto baru
  const [previewPhoto, setPreviewPhoto] = useState(null); // Preview foto baru
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Fetch item data dan daftar lokasi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItemById(id);
        setItem(response);

        const locationData = await getLocations();
        setLocations(locationData);

        const currentLocation = locationData.find((loc) => loc.location_id === response.location_id);
        if (currentLocation) {
          setLocationId(`${currentLocation.warehouse_name}${currentLocation.kolom.padStart(2, '0')}${currentLocation.baris}`);
        }
      } catch (error) {
        console.error(error);
        alert('Failed to fetch data.');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleLocationChange = (selectedOption) => {
    setLocationId(selectedOption?.value || '');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file); // Simpan file foto baru
    setPreviewPhoto(URL.createObjectURL(file)); // Buat preview URL untuk foto baru
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedLocation = locations.find((loc) => `${loc.warehouse_name}${loc.kolom.padStart(2, '0')}${loc.baris}` === locationId);

      if (!selectedLocation) {
        alert('Invalid location selected.');
        return;
      }

      const formData = new FormData();
      formData.append('part_no', item.part_no);
      formData.append('description', item.description);
      formData.append('qty', item.qty);
      formData.append('unit', item.unit);
      formData.append('location_id', selectedLocation.location_id);
      if (photo) {
        formData.append('photo', photo); // Tambahkan foto baru jika ada
      }

      await updateItem(id, formData); // Kirim FormData

      setSnackbarMessage('Item edited successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      console.error(error);
      setSnackbarMessage(error.response?.data?.error || 'Failed to edit item');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box p={3} component={Paper} elevation={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Item
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField label="Part No" name="part_no" value={item.part_no} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Description" name="description" value={item.description} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Quantity" name="qty" type="number" value={item.qty} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Unit" name="unit" value={item.unit} onChange={handleChange} fullWidth margin="normal" />
        <Typography variant="subtitle1" gutterBottom>
          Location
        </Typography>
        <Select
          options={locations.map((loc) => ({
            value: `${loc.warehouse_name}${loc.kolom.padStart(2, '0')}${loc.baris}`,
            label: `${loc.warehouse_name}${loc.kolom.padStart(2, '0')}${loc.baris}`,
          }))}
          value={
            locationId
              ? {
                  value: locationId,
                  label: locations
                    .map((loc) => ({
                      value: `${loc.warehouse_name}${loc.kolom.padStart(2, '0')}${loc.baris}`,
                      label: `${loc.warehouse_name}${loc.kolom.padStart(2, '0')}${loc.baris}`,
                    }))
                    .find((opt) => opt.value === locationId)?.label,
                }
              : null
          }
          onChange={handleLocationChange}
          placeholder="Pilih lokasi"
        />
        <Typography variant="subtitle1" gutterBottom>
          Photo
        </Typography>
        <Button variant="outlined" component="label">
          <input type="file" onChange={handlePhotoChange} />
        </Button>
        {previewPhoto && <img src={previewPhoto} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="primary" onClick={() => navigate('/admin')}>
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} severity={snackbarSeverity} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
    </Box>
  );
};

export default EditItem;
