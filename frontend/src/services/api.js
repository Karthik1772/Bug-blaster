import axios from "axios";

const API_URL = "/api/tickets";

// Get all tickets using Promises
export const getAllTickets = () => {
  return axios
    .get(API_URL)
    .then((response) => response.data.data)
    .catch((error) => {
      console.error("Error fetching tickets:", error);
      throw error;
    });
};

// Get single ticket using Async/Await
export const getTicketById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching ticket:", error);
    throw error;
  }
};

// Create ticket using Async/Await
export const createTicket = async (ticketData) => {
  try {
    const response = await axios.post(API_URL, ticketData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};

// Update ticket using Promises
export const updateTicket = (id, ticketData) => {
  return axios
    .put(`${API_URL}/${id}`, ticketData)
    .then((response) => response.data.data)
    .catch((error) => {
      console.error("Error updating ticket:", error);
      throw error;
    });
};

// Delete ticket using Async/Await
export const deleteTicket = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ticket:", error);
    throw error;
  }
};
