import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteTicket } from "../services/api";
import { useTickets } from "../context/TicketContext";
import "../App.css";

export default function TicketItem({ ticket }) {
  const navigate = useNavigate();
  const { refreshTickets } = useTickets();

  const priorityClass = {
    1: "priority-low",
    2: "priority-medium",
    3: "priority-high",
  };

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await deleteTicket(ticket._id);
        await refreshTickets();
      } catch (error) {
        console.error("Error deleting ticket:", error);
        alert("Failed to delete ticket. Please try again.");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${ticket._id}`);
  };

  return (
    <div className="ticket-item">
      <div className={`priority-dot ${priorityClass[ticket.priority]}`}></div>

      <div className="ticket-content">
        <h3>{ticket.title}</h3>
        <p>{ticket.description}</p>
        <span className="priority-badge">
          Priority: {priorityLabels[ticket.priority]}
        </span>
      </div>

      <div className="ticket-actions">
        <button className="button button-edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="button button-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
