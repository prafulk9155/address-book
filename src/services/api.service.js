// const BASE_URL = "http://localhost:3000/"; 
const BASE_URL = "https://adbms.ogesone.com/api/";



export const get = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during GET request:", error.message);
    throw error;
  }
};

// Function to handle HTTP POST requests
export const post = async (endpoint, body) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: body }), 
    });

    // Handle non-2xx response errors
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`Network Error: ${errorResponse.message || "Unknown error"}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during POST request:", error);
    const data = await response.json();
    return data;
    throw error; 
  }
};
