import React from "react";
import TicketItem from "./TicketItem";
import { useTickets } from "../context/TicketContext";
import { sortTickets } from "../utilities/sortingUtilities";
import "../App.css";

export default function TicketList() {
  const { tickets, loading, error, sortPreference } = useTickets();

  if (loading) {
    return <div className="loading">Loading tickets...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const sortedTickets = sortTickets(tickets, sortPreference);

  if (sortedTickets.length === 0) {
    return (
      <div className="no-tickets">
        No tickets found. Create your first ticket!
      </div>
    );
  }

  return (
    <div className="ticket-list">
      {sortedTickets.map((ticket: any) => (
        <TicketItem key={ticket._id} ticket={ticket} />
      ))}
    </div>
  );
}
