import React, { useState, useEffect } from "react";
import { addItem, getAllLocations } from "../api/itemAdminApi";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";

const AddItem = () => {
  const [lotBatchNo, setLotBatchNo] = useState("");
  const [partNo, setPartNo] = useState("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("");
  const [locationId, setLocationId] = useState("");
  const [photo, setPhoto] = useState(null);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  const fetchLocations = async () => {
    try {
      const data = await getAllLocations();
      setLocations(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch locations");
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
    formData.append("lotBatchNo", lotBatchNo);
    formData.append("partNo", partNo);
    formData.append("description", description);
    formData.append("qty", qty);
    formData.append("unit", unit);
    formData.append("locationId", locationId);
    formData.append("photo", photo);

    try {
      await addItem(formData);
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Failed to add item");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add New Item
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Lot/Batch No"
              variant="outlined"
              fullWidth
              value={lotBatchNo}
              onChange={(e) => setLotBatchNo(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Part No"
              variant="outlined"
              fullWidth
              value={partNo}
              onChange={(e) => setPartNo(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description/Name"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Quantity"
              type="number"
              variant="outlined"
              fullWidth
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Unit"
              variant="outlined"
              fullWidth
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              required
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
                  width: "100%",
                  maxWidth: 200,
                  height: "auto",
                  marginTop: "10px",
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
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => navigate("/admin")}
            >
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
  );
};

export default AddItem;
