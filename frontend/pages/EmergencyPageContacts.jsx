import React from "react";

export default function EmergencyContactsPage() {
  const stPetersburgPoliceContacts = [
    { name: "St. Petersburg Police Department", number: "+7 812 234 9000" },
    { name: "Emergency (General)", number: "112" },
    { name: "Fire Department", number: "+7 812 315 6912" },
    { name: "Ambulance", number: "+7 812 312 0294" },
    { name: "Tourist Police", number: "+7 812 573 2120" },
  ];

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#4caf50", // green background
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
          🚨 Emergency Contacts
        </h1>
        

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {stPetersburgPoliceContacts.map((contact, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#4caf50",
                color: "#000",
                padding: "0.8rem 1rem",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <strong style={{ fontSize: "1rem", marginBottom: "0.3rem" }}>
                {contact.name}
              </strong>
              📞{" "}
              <a
                href={`tel:${contact.number}`}
                style={{ color: "#fdfdfd", textDecoration: "underline" }}
              >
                {contact.number}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
