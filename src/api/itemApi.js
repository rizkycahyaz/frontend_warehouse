import axios from "axios";

const baseURL = "http://localhost:3000/api/items"; // Base URL

// Fungsi untuk mengambil item berdasarkan lotBatchNo
const getItemDetails = async (lotBatchNo) => {
  try {
    const response = await axios.get(`${baseURL}/detail/${lotBatchNo}`);
    return response.data; // Mengembalikan data item yang relevan
  } catch (error) {
    console.error("Error fetching item details:", error.message || error);
    throw new Error("Error fetching item details");
  }
};

export { getItemDetails };
