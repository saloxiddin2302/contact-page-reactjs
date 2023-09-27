import React, { useState, useEffect } from "react";
import Contact from "./Contact";
import Modal from "react-modal";
import "./App.css";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContactId, setEditingContactId] = useState(null);
  const [editingContactName, setEditingContactName] = useState("");
  const [editingContactEmail, setEditingContactEmail] = useState("");
  const [editingContactPhoneNumber, setEditingContactPhoneNumber] =
    useState("");
  const [editingContactImage, setEditingContactImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    updateLocalStorage(contacts);
  }, [contacts]);

  const updateLocalStorage = (updatedContacts) => {
    if (updatedContacts.length === 0) {
      localStorage.removeItem("contacts");
    } else {
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    }
  };

  const addContact = (contact) => {
    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts);
    updateLocalStorage(updatedContacts);
  };

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    updateLocalStorage(updatedContacts);
  };

  const toggleFavorite = (id) => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === id) {
        return {
          ...contact,
          isFavorite: !contact.isFavorite,
        };
      }
      return contact;
    });
    setContacts(updatedContacts);
    updateLocalStorage(updatedContacts);
  };

  const editContact = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    if (contactToEdit) {
      setEditingContactId(id);
      setEditingContactName(contactToEdit.name);
      setEditingContactEmail(contactToEdit.email);
      setEditingContactPhoneNumber(contactToEdit.phoneNumber);
      setEditingContactImage(contactToEdit.image);
      setIsModalOpen(true);
    }
  };

  const updateContact = () => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === editingContactId) {
        return {
          ...contact,
          name: editingContactName,
          email: editingContactEmail,
          phoneNumber: editingContactPhoneNumber,
          image: editingContactImage,
        };
      }
      return contact;
    });

    setContacts(updatedContacts);
    setIsModalOpen(false);
    cancelEdit();
    updateLocalStorage(updatedContacts);
  };

  const cancelEdit = () => {
    setEditingContactId(null);
    setEditingContactName("");
    setEditingContactEmail("");
    setEditingContactPhoneNumber("");
    setEditingContactImage("");
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phoneNumber, image } = e.target.elements;
    const contact = {
      id: Date.now(),
      name: name.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      image: image.value,
      isFavorite: false,
    };
    addContact(contact);
    e.target.reset();
  };

  const handleFilterChange = (e) => {
    setShowFavoritesOnly(e.target.value === "favorites");
  };

  const filteredContacts = showFavoritesOnly
    ? contacts.filter((contact) => contact.isFavorite)
    : contacts;

  return (
    <div className="container">
      <div className="filter">
        <label htmlFor="filter">Filter:</label>
        <select id="filter" onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="favorites">Favorites</option>
        </select>
      </div>

      <div className="contacts">
        {filteredContacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            onDelete={deleteContact}
            onEdit={editContact}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <div className="add-contact">
        <h2>Add Contact</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:🐧</label>
          <input type="text" id="name" required />

          <label htmlFor="email">Email:📩</label>
          <input type="email" id="email" required />

          <label htmlFor="phoneNumber">Phone Number:☎️</label>
          <input type="text" id="phoneNumber" required />

          <label htmlFor="image">Image URL:</label>
          <input type="text" id="image" required />

          <button type="submit">Add New➕</button>
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelEdit}
        contentLabel="Edit Contact Modal"
      >
        <h2>Edit Contact</h2>
        <form className="modalForm" onSubmit={updateContact}>
          <label htmlFor="editName">Name:</label>
          <input
            type="text"
            id="editName"
            value={editingContactName}
            onChange={(e) => setEditingContactName(e.target.value)}
            required
          />

          <label htmlFor="editEmail">Email:</label>
          <input
            type="email"
            id="editEmail"
            value={editingContactEmail}
            onChange={(e) => setEditingContactEmail(e.target.value)}
            required
          />

          <label htmlFor="editPhoneNumber">Phone Number:</label>
          <input
            type="text"
            id="editPhoneNumber"
            value={editingContactPhoneNumber}
            onChange={(e) => setEditingContactPhoneNumber(e.target.value)}
            required
          />

          <label htmlFor="editImage">Image URL:</label>
          <input
            type="text"
            id="editImage"
            value={editingContactImage}
            onChange={(e) => setEditingContactImage(e.target.value)}
            required
          />

          <button type="submit">Update</button>
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Contacts;
