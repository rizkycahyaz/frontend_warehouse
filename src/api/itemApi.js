import axios from "axios";

const baseURL = "http://localhost:3000/api/items";

const getItems = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching location");
  }
};

const addItem = async (item) => {
  try {
    const response = await axios.post(baseURL, item);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching location");
  }
};

const updateItem = async (id, updatedItem) => {
  try {
    const response = await axios.put(`${baseURL}/${id}`, updatedItem);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching location");
  }
};

const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching location");
  }
};

export { getItems, addItem, updateItem, deleteItem };
