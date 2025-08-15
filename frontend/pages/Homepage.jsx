import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

const taglines = [
  "Stay Informed. Stay Protected.",
  "Your AI Safety Hub.",
  "Navigate Risks with Confidence.",
];

const HomePage = () => {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState("");
  const [currentTagline, setCurrentTagline] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = taglines[currentTagline];
    let timeout;

    if (!deleting && charIndex < currentPhrase.length) {
      timeout = setTimeout(() => {
        setCurrentText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 100);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setCurrentText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 50);
    } else if (!deleting && charIndex === currentPhrase.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, currentTagline]);

  return (
    <div style={styles.container}>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div style={styles.overlay}>
        <h1 style={styles.logo}>AIDangerMonitor</h1>
        <p style={styles.typewriter}>{currentText}<span style={styles.cursor}>|</span></p>

        <div style={styles.buttons}>
          <button className="styledButton" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="styledButton" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url("/denys-nevozhai-7nrsVjvALnA-unsplash.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    position: "relative",
    color: "#fff",
    fontFamily: "'Roboto Mono', monospace",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    textAlign: "center",
  },
  logo: {
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "1rem",
    letterSpacing: "2px",
  },
  typewriter: {
    fontSize: "1.6rem",
    marginBottom: "2rem",
    color: "#00ffcc",
    minHeight: "2.5rem",
  },
  cursor: {
    display: "inline-block",
    marginLeft: "2px",
    width: "10px",
    backgroundColor: "#00ffcc",
    animation: "blink 1s infinite",
  },
  buttons: {
    display: "flex",
    gap: "1rem",
  },
};

export default HomePage;
