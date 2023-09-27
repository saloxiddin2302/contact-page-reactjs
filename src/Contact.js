import React from "react";
import "./App.css";

const Contact = ({ contact, onDelete, onEdit, onToggleFavorite }) => {
  const handleDelete = () => {
    onDelete(contact.id);
  };

  const handleEdit = () => {
    onEdit(contact.id);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(contact.id);
  };

  return (
    <div className="contact">
      {contact.image && (
        <div className="contact-image">
          <img src={contact.image} alt={contact.name} />
        </div>
      )}

      <div>
        <strong>Name:</strong> {contact.name}
      </div>
      <div>
        <strong>Email:</strong> {contact.email}
      </div>
      <div>
        <strong>Phone Number:</strong> {contact.phoneNumber}
      </div>
      <div>
        <strong>Favorite:</strong> {contact.isFavorite ? "Yes" : "No"}
      </div>

      <div className="contact-actions">
        <button onClick={handleToggleFavorite}>
          {contact.isFavorite ? "remove ✨" : "add ⭐"}
        </button>
        <button onClick={handleEdit}>✏️</button>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
};

export default Contact;
