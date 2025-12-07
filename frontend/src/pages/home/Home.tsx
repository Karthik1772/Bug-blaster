import React from "react";
import { useNavigate } from "react-router-dom";
import TicketList from "../../components/TicketList";
import { useTickets } from "../../context/TicketContext";
import "./Home.scss";
export default function Home() {
  const navigate = useNavigate();
  const { sortPreference, setSortPreference } = useTickets();

  return (
    <div className="container">
      <header className="app-header">
        <h1>Ticket Management System</h1>
        <p>Manage your tickets efficiently</p>
      </header>

      <div className="controls">
        <button
          className="button button-primary"
          onClick={() => navigate("/create")}
        >
          Create New Ticket
        </button>

        <div className="sort-control">
          <label htmlFor="sort">Sort by Priority: </label>
          <select
            id="sort"
            value={sortPreference}
            onChange={(e) => setSortPreference(e.target.value)}
            className="sort-select"
          >
            <option value="None">None</option>
            <option value="High to Low">High to Low</option>
            <option value="Low to High">Low to High</option>
          </select>
        </div>
      </div>

      <TicketList />
    </div>
  );
}
