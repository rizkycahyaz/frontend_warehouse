import React, { useState, useEffect } from 'react';
import { addItem, getLocations } from '../api/itemAdminApi';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button, Snackbar } from '@mui/material';
import Select from 'react-select';

const AddItem = () => {
  const [lotBatchNo, setLotBatchNo] = useState('');
  const [partNo, setPartNo] = useState('');
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState('');
  const [unit, setUnit] = useState('');
  const [locationId, setLocationId] = useState('');
  const [photo, setPhoto] = useState(null);
  const [locations, setLocations] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const fetchLocations = async () => {
    try {
      const data = await getLocations(); // Menggunakan fungsi getLocations
      console.log('Fetched locations:', data);
      setLocations(data); // Set data lokasi ke state
    } catch (error) {
      console.error('Error fetching locations:', error);
      alert('Failed to fetch locations');
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('lotBatchNo', lotBatchNo);
    formData.append('partNo', partNo);
    formData.append('description', description);
    formData.append('qty', qty);
    formData.append('unit', unit);
    formData.append('locationId', locationId);
    formData.append('photo', photo);

    try {
      await addItem(formData);
      setSnackbarMessage('Item added successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      // Tambahkan penundaan sebelum navigasi
      setTimeout(() => {
        navigate('/admin');
      }, 2000); // Penundaan selama 2 detik
    } catch (error) {
      console.error('Error adding item:', error.response?.data || error.message);
      setSnackbarMessage(error.response?.data?.error || 'Failed to add item');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ marginTop: 0 }}>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: '100vh', // Memastikan konten bisa memenuhi layar
          paddingBottom: '30px', // Memberikan padding bawah agar tidak menabrak footer
        }}
      >
        <Typography variant="h6" align="center">
          Add New Item
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Lot/Batch No" variant="outlined" fullWidth value={lotBatchNo} onChange={(e) => setLotBatchNo(e.target.value)} required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Part No" variant="outlined" fullWidth value={partNo} onChange={(e) => setPartNo(e.target.value)} required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description/Name" variant="outlined" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Quantity" type="number" variant="outlined" fullWidth value={qty} onChange={(e) => setQty(e.target.value)} required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Unit" variant="outlined" fullWidth value={unit} onChange={(e) => setUnit(e.target.value)} required />
            </Grid>
            <Grid item xs={12}>
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
                onChange={(selectedOption) => setLocationId(selectedOption?.value || '')}
                placeholder="Pilih lokasi"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: '#ccc',
                    boxShadow: 'none',
                    '&:hover': { borderColor: '#999' },
                  }),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Photo
                <input type="file" hidden onChange={handlePhotoChange} />
              </Button>
            </Grid>

            {photo && (
              <Grid item xs={12} container direction="column" alignItems="center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Preview"
                  style={{
                    width: '100%',
                    maxWidth: 200,
                    height: 'auto',
                    marginTop: '10px',
                  }}
                />
              </Grid>
            )}
            {photo && (
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  Photo uploaded: {photo.name}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button variant="contained" color="secondary" fullWidth onClick={() => navigate('/admin')}>
                Back
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      {/* Snackbar for alerts */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} severity={snackbarSeverity} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
    </div>
  );
};

export default AddItem;
