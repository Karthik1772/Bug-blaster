import React, { useState, useEffect } from "react";
import "./TicketForm.scss";

// Define types for props and ticket data
interface TicketData {
  title: string;
  description: string;
  priority: string;
}

interface TicketFormProps {
  onSubmit: (data: TicketData) => Promise<void>;
  initialData?: TicketData;
  buttonText?: string;
  onCancel?: () => void;
}

const TicketForm: React.FC<TicketFormProps> = ({
  onSubmit,
  initialData,
  buttonText = "Submit",
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setPriority(initialData.priority || "1");
    }
  }, [initialData]);

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({ title, description, priority });

      // Clear form if not editing
      if (!initialData) {
        setTitle("");
        setDescription("");
        setPriority("1");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          className="form-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          className="form-input"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          rows={4}
          required
        />
      </div>

      <fieldset className="priority-fieldset">
        <legend>Priority</legend>
        {Object.entries(priorityLabels).map(([value, label]) => (
          <label key={value} className="priority-label">
            <input
              type="radio"
              value={value}
              checked={priority === value}
              className="priority-input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriority(e.target.value)}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <div className="button-group">
        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : buttonText}
        </button>

        {onCancel && (
          <button
            type="button"
            className="button button-secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TicketForm;
