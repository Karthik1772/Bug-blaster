import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import { getTicketById, updateTicket } from "../services/api";
import { useTickets } from "../context/TicketContext";
import "../App.css";

export default function EditTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshTickets } = useTickets();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getTicketById(id);
        setTicket(data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
        alert("Failed to load ticket");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, navigate]);

  const handleSubmit = async (ticketData: any) => {
    try {
      await updateTicket(id, ticketData);
      await refreshTickets();
      navigate("/");
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return <div className="loading">Loading ticket...</div>;
  }

  if (!ticket) {
    return <div className="error">Ticket not found</div>;
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1>Edit Ticket</h1>
        <button
          className="button button-secondary"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </header>

      <div className="form-container">
        <TicketForm
          onSubmit={handleSubmit}
          initialData={ticket}
          buttonText="Update Ticket"
          onCancel={() => navigate("/")}
        />
      </div>
    </div>
  );
}
