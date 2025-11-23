import React from "react";
import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import { createTicket } from "../services/api";
import { useTickets } from "../context/TicketContext";
import "../App.css";

export default function CreateTicket() {
  const navigate = useNavigate();
  const { refreshTickets } = useTickets();

  const handleSubmit = async (ticketData) => {
    try {
      await createTicket(ticketData);
      await refreshTickets();
      navigate("/");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Create New Ticket</h1>
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
          buttonText="Create Ticket"
          onCancel={() => navigate("/")}
        />
      </div>
    </div>
  );
}
