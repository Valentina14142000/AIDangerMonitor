import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaPlus } from "react-icons/fa";

export default function EmergencyContactsPage() {
  const navigate = useNavigate();

  const staticContacts = [
    {
      name: "Police (St. Petersburg, Russia)",
      phone: "+7 (812) 573-21-81",
    },
    {
      name: "Emergency (St. Petersburg, Russia)",
      phone: "112",
    },
    {
      name: "Police (St. Petersburg, Florida, USA)",
      phone: "+1 (727) 893-7780",
    },
    {
      name: "Emergency (St. Petersburg, Florida, USA)",
      phone: "911",
    },
    {
      name: "Tourist Help Center (Russia)",
      phone: "+7 (800) 550-00-55",
    },
  ];

  const [myContacts, setMyContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myEmergencyContacts") || "[]");
    setMyContacts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("myEmergencyContacts", JSON.stringify(myContacts));
  }, [myContacts]);

  const handleAddContact = () => {
    if (newName.trim() && newPhone.trim()) {
      setMyContacts([...myContacts, { name: newName.trim(), phone: newPhone.trim() }]);
      setNewName("");
      setNewPhone("");
    }
  };

  const handleDeleteContact = (index) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const updated = [...myContacts];
      updated.splice(index, 1);
      setMyContacts(updated);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        color: "#333",
        padding: "2rem",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "transparent",
          border: "none",
          color: "#333",
          cursor: "pointer",
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <FaArrowLeft />
        Back
      </button>

      <h2>📞 Emergency Contacts</h2>
      <p>Important contacts for St. Petersburg and your own saved contacts.</p>

      <h3>Official Contacts</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {staticContacts.map((contact, idx) => (
          <li
            key={idx}
            style={{
              marginBottom: "0.75rem",
              padding: "0.75rem",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <strong>{contact.name}</strong>
            <br />
            <a
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              style={{
                color: "#007bff",
                textDecoration: "none",
              }}
            >
              {contact.phone}
            </a>
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: "2rem" }}>My Emergency Contacts</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {myContacts.length > 0 ? (
          myContacts.map((contact, idx) => (
            <li
              key={idx}
              style={{
                marginBottom: "0.75rem",
                padding: "0.75rem",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{contact.name}</strong>
                <br />
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  style={{
                    color: "#007bff",
                    textDecoration: "none",
                  }}
                >
                  {contact.phone}
                </a>
              </div>
              <button
                onClick={() => handleDeleteContact(idx)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#d32f2f",
                  cursor: "pointer",
                }}
                title="Delete contact"
              >
                <FaTrash />
              </button>
            </li>
          ))
        ) : (
          <p>No personal contacts saved.</p>
        )}
      </ul>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h4>Add New Contact</h4>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <button
          onClick={handleAddContact}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <FaPlus /> Add Contact
        </button>
      </div>
    </div>
  );
}
