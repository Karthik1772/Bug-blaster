import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.scss";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button className="button button-primary" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
}
