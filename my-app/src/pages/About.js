import React from "react";
import Navbar from "../components/navbar";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div>
      <Navbar />
      <header style={styles.header}>
        <div style={styles.container}></div>
      </header>

      <main style={styles.mainContent}>
        {/* Animated Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={styles.aboutSection}
        >
          {/* Text Section with Animated Boxes */}
          <div style={styles.textContainer}>
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={styles.sectionTitle}
            >
              About EnerTransition
            </motion.h3>

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={styles.sectionSubtitle}
            >
              Advancing Innovation, Empowering Minds.
            </motion.h2>

            {/* Info Boxes */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              style={styles.infoBox}
            >
              <h4 style={styles.boxTitle}>What It Is</h4>
              <p style={styles.boxText}>
                EnerTransition.com is a dedicated platform for sharing research and preprints
                in the field of energy transition. As a unit of Pro H2Vis Solutions, we serve
                as a hub for knowledge exchange and innovation in sustainable energy.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              style={styles.infoBox}
            >
              <h4 style={styles.boxTitle}>What We Do</h4>
              <p style={styles.boxText}>
                We empower researchers by providing a space to publish their work, share insights,
                and collaborate with a global community. Our mission is to accelerate advancements
                in energy transition through open access to cutting-edge research and meaningful discussions.
              </p>
            </motion.div>
          </div>

          {/* Image Section with Hover Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            style={styles.imageContainer}
          >
            <img
              src="/pexels-photo-1194775.webp"
              alt="Learning Illustration"
              style={styles.image}
            />
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
};

// Modernized Styles (Aligned with Navbar's Glassmorphism + Professional Style)
const styles = {
  header: {
    position: "relative",
    zIndex: 1000,
    width: "100%",
    backgroundColor: "#f0f4f8",
    padding: "0 0 10px 0",
  },
  container: {
    padding: "20px",
  },
  mainContent: {
    background: "linear-gradient(to bottom right, #f0f4f8, #d6e4f0)",
    padding: "60px 0",
    fontFamily: "'Inter', sans-serif",
  },
  aboutSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "40px",
    width: "90%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },
  textContainer: {
    width: "55%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#2c3e50",
    margin: "0",
  },
  sectionSubtitle: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#555",
    margin: "5px 0 15px 0",
  },
  infoBox: {
    background: "linear-gradient(to bottom right, #ffffff, #f8f9fa)",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    border: "1px solid #eef2f7",
  },
  infoBoxHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
  },
  boxTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#0077cc",
    marginBottom: "10px",
  },
  boxText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#444",
  },
  imageContainer: {
    width: "40%",
    overflow: "hidden",
    borderRadius: "15px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    borderRadius: "15px",
    transition: "transform 0.3s ease",
  },
};


export default About;
