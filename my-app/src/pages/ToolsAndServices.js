import React from "react";
import Navbar from "../components/navbar";

const ToolsAndServices = () => {
  return (
    <>
      <Navbar />
      <div style={styles.pageContainer}>
        <div style={styles.overlay}> {/* Optional overlay for readability */}
          <div style={styles.contentWrapper}>
            <div style={styles.mainContent}>
              <h1 style={styles.heading}>Tools and Services</h1>
              <div style={styles.card}>
                <p style={styles.subText}>
                  🚀 <strong>Coming Soon:</strong>{" "}
                  <span style={styles.resify}>Resify</span>
                </p>
                <p style={styles.description}>
                  Stay tuned for <strong>Resify</strong>, an innovative platform
                  designed to enhance your research experience. Something unique is on
                  the way!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  pageContainer: {
    fontFamily: "'Poppins', Arial, sans-serif",
    backgroundImage: "url('/WhatsApp Image 2025-03-06 at 13.36.54_36a50011.jpg')", // Set background image
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    paddingTop: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    zIndex: 0,
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Light overlay for better readability
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 0",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  mainContent: {
    textAlign: "center",
    padding: "50px 20px",
    width: "100%",
    maxWidth: "1000px",
  },
  heading: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "40px",
    color: "#0073e6",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
    display: "inline-block",
    textAlign: "center",
    maxWidth: "600px",
    width: "100%",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 16px 36px rgba(0, 0, 0, 0.2)",
  },
  subText: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#2c3e50",
  },
  resify: {
    color: "#ff5733",
    fontWeight: "700",
    fontSize: "28px",
  },
  description: {
    fontSize: "18px",
    color: "#555",
    marginTop: "10px",
    lineHeight: "1.8",
    fontWeight: "400",
  },
};

export default ToolsAndServices;
