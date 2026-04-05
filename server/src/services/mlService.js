const axios = require("axios");

const ML_API_URL = "http://127.0.0.1:8000/predict";

exports.analyzeDreamML = async (text) => {
  try {
    const response = await axios.post(ML_API_URL, {
      text: text,
    });

    return response.data;
  } catch (error) {
    console.error("ML API Error:", error.message);
    return null;
  }
};