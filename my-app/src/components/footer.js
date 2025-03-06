import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h2 style={styles.title}>EnerTransition</h2>
          <p style={styles.subtitle}>Preprint server</p>
          <p style={styles.text}>
            As a unit of Pro H2Vis Solutions, we are dedicated to accelerating advancements in energy transition by fostering open collaboration and knowledge sharing. 
            We provide a platform for researchers to publish preprints, exchange ideas, and contribute to the global shift towards sustainable energy.
          </p>
          <div style={styles.socialIcons}>
            <a href="https://www.linkedin.com/in/-harshitmittal/" target="_blank" rel="noopener noreferrer" style={styles.icon}>
              <i className="fab fa-linkedin"></i>
            </a>
            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
              <i className="fab fa-twitter"></i>
            </a> */}
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div style={styles.section}>
          <h3>Quick Links</h3>
          <ul style={styles.list}>
            <li><a href="#" style={styles.link}>Contact Us </a></li>
            <li><a href="/about" style={styles.link}>About Us </a></li>
            <li><a href="/team" style={styles.link}>Team </a></li>
          </ul>
        </div>

        <div style={styles.section}>
          <h3>Have a Question?</h3>
          <p style={styles.contact}><i className="fas fa-map-marker-alt"></i> Pro H2Vis Solutions LLP, Hubli, Karnataka, India pincode: 580031 </p>
          <p style={styles.contact}><i className="fas fa-phone"></i> +91 8743944555 </p>
          <p style={styles.contact}><i className="fas fa-envelope"></i> info@enertransition.com </p>
        </div>
      </div>

      <p style={styles.copyright}>
        &copy;2025 EnerTransition.com A unit of Pro H2Vis Solutions. All rights reserved.
      </p>
    </footer>
  );
};

// Inline Styles
const styles = {
  footer: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "20px 0",
    textAlign: "center",
    marginTop: "auto", // This helps when inside a flex container
    width: "100%",
    position: "relative", // Ensures it stays within document flow
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "0px",
  },
  section: {
    flex: "1",
    margin: "10px",
    minWidth: "220px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#ffcc00",
    marginBottom: "8px",
  },
  text: {
    fontSize: "13px",
    lineHeight: "1.5",
    marginBottom: "10px",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "8px",
  },
  icon: {
    fontSize: "18px",
    color: "#ffcc00",
    textDecoration: "none",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  link: {
    color: "#ffcc00",
    textDecoration: "none",
    fontSize: "14px",
    display: "block",
    margin: "3px 0",
  },
  contact: {
    fontSize: "13px",
    marginBottom: "5px",
  },
  copyright: {
    marginTop: "15px",
    fontSize: "12px",
  },
};

export default Footer;
