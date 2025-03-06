import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav style={styles.navContainer}>
      {/* Logo Section */}
      <div style={styles.logoSection}>
        <img src="/ThynkCafe.png" alt="Logo" style={styles.logoImage} />
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>
            <span style={styles.ener}>Ener</span>
            <span style={styles.trans}>Tra</span>
            <span style={styles.sition}>nsition.com</span>
          </h1>
          <span style={styles.tagline}>A Unit of Pro H2Vis Solutions</span>
        </div>
      </div>

      {/* Navigation Links */}
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/latestpreprints" style={styles.navLink}>Latest Preprints</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/tools & Services" style={styles.navLink}>Tools & Services</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/about" style={styles.navLink}>About</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/team" style={styles.navLink}>Team</Link>
        </li>

        <li style={styles.navItem}>
          {isAuthenticated ? (
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          ) : (
            <Link to="/loginSignup" style={styles.navLink}>Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

// Modern Glassmorphism + Professional Academic Style
const styles = {
  navContainer: {
   
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",
    borderBottom: "2px solid #e0e0e0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    fontFamily: "Arial, sans-serif"
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  logoImage: {
    height: "50px"
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  logo: {
    fontSize: "22px",
    margin: 0,
    fontWeight: "bold",
    color: "#2c3e50"
  },
  ener: { color: "#3498db" },
  trans: { color: "#e74c3c" },
  sition: { color: "#2c3e50" },
  tagline: {
    fontSize: "12px",
    color: "#7f8c8d"
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    margin: 0,
    padding: 0
  },
  navItem: {
    position: "relative"
  },
  navLink: {
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 500,
    color: "#2c3e50",
    padding: "8px 15px",
    transition: "all 0.3s ease",
    borderRadius: "20px"
  },
  navLinkHover: {
    background: "rgba(52, 152, 219, 0.1)"
  },
  logoutButton: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease"
  }
};

export default Navbar;
