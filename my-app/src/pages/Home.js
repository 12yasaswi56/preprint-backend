// import React from "react";
import Navbar from "../components/navbar";
import React, { useState, useEffect } from 'react';
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="animated-background">
        <MainContent />
      </div>
    </>
  );
};

const MainContent = () => (
  <main style={styles.container}>
    <HeaderSection />
    <FeaturedSubjects />
    <ResearchQualityEvaluation />
  </main>
);
const images = [
  '/physics-science-seamless-pattern-background-vector-10003644.jpg',  // Replace with your actual file path
  '/science-seamless-pattern-background-with-outline-icons-in-blue-color-for-scientific-research-concept-i.jpg',  // Second generated image
  '/0ab53e4495f85b4806afdeb17e3e1d49.jpg', // Keep one placeholder for now or replace
];
const HeaderSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.headingSection}>
      <div style={styles.animatedShape}>
        <img
          src={images[currentImage]}
          alt="Slideshow"
          style={styles.slideshowImage}
        />
      </div>

      <div style={styles.headingGlow}></div>

      <div style={styles.headingContent}>
        <h1 style={styles.firstLine}>FIRST OF ITS KIND</h1>
        <h1 style={styles.secondLine}>TRANSPARENT RESEARCH SERVER</h1>
        <div style={styles.sub}>
          <a href="/submitpreprint" style={styles.navLinkButton}>
            Submit Preprint
            <span style={styles.buttonArrow}>→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const FeaturedSubjects = () => {
  const subjects = [
    "Anesthesiology & Pain Medicine",
    "Cancer Biology",
    "Computational Biology",
    "Dentistry",
    "Developmental Biology",
    "Epigenetics & Genomics",
    "General Microbiology",
    "Infectious Diseases",
    "Internal Medicine",
    "Neurology",
    "Oncology",
    "Pediatrics",
    "Physiology",
    "Psychology",
    "Structural Biology"
  ];

  return (
    <div style={styles.featuredContainer}>
      <h2 style={styles.sectionTitle}>
        <span style={styles.highlightText}>Featured Subjects</span>
      </h2>
      <div style={styles.subjectGrid}>
        {subjects.map((subject, index) => (
          <div key={index} style={styles.subjectItem}>
            {subject}
            <div style={styles.subjectItemShine}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ResearchQualityEvaluation = () => {
  return (
    <div style={styles.rqeContainer}>
      <div style={styles.rqeBackgroundShape}></div>
      <h2 style={styles.sectionTitle}>
        <span style={styles.highlightText}>Research Quality Evaluation</span>
      </h2>
      <p style={styles.rqeDescription}>
        Our transparent preprint server offers <b style={styles.boldHighlight}>Research Quality Evaluation (RQE)</b>, providing authors with
        objective feedback on their research before formal peer review. This evaluation helps authors improve:
      </p>
      <ul style={styles.rqeList}>
        {["Scientific Rigor", "Clarity of Writing", "Methodological Soundness", "Reproducibility", "Ethical Considerations"].map((item, index) => (
          <li key={index} style={styles.rqeListItem}>
            <span style={styles.rqeListIcon}>✓</span> {item}
          </li>
        ))}
      </ul>
      <p style={styles.rqeNote}>
        Gain confidence in your research by receiving expert evaluations tailored to improve your work and
        enhance transparency in scientific publishing.
      </p>
      <div style={styles.rqeGradientBar}></div>
    </div>
  );
};

const styles = {
  container: {
    padding: "60px 30px",
    fontFamily: "'Inter', system-ui, sans-serif",
    background: "linear-gradient(145deg,rgb(173, 195, 216) 0%, #e6f7ff 100%)",
    color: "#1a2a3a",
    position: "relative",
    overflow: "hidden",
    
  },
  headingSection: {
    textAlign: "right",
    marginBottom: "60px",
    padding: "70px 0",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 115, 230, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.2)",
   
  },
  headingGlow: {
    position: "absolute",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0, 115, 230, 0.2) 0%, rgba(0, 115, 230, 0) 70%)",
    top: "-30px",
    right: "-30px",
    zIndex: 0,
  },
  headingContent: {
    textAlign: "left",
    display: "inline-block",
    position: "relative",   // Important
    left: "-100px"          // This will shift the content left directly
}
,

  firstLine: {
    fontSize: "42px",
    fontWeight: "800",
    margin: "0",
    color: "#0a1a2a",
    letterSpacing: "2px",
    position: "relative",
    textShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(90deg, #1a365d 0%, #0073e6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  secondLine: {
    fontSize: "42px",
    fontWeight: "800",
    margin: "10px 0 30px 0",
    position: "relative",
    background: "linear-gradient(90deg, #1a365d 0%, #0073e6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  sub: {
    marginTop: "25px",
    position: "relative",
  },
  animatedShape: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "550px", // Adjust this width to cover leftover space
    height: "100%",
    background: "linear-gradient(135deg, rgba(0,115,230,0.1), rgba(0,115,230,0.3))",
    clipPath: "polygon(0 0, 100% 0, 70% 100%, 0% 100%)", // Shape - you can change to blob if needed
    zIndex: 1,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  slideshowImage: {
    width: "100%",
    height: "100%",
    borderRadius: "12px",
    objectFit: "cover"
  },
  navLinkButton: {
    padding: "16px 36px",
    background: "linear-gradient(135deg, #0073e6 0%, #00a3e0 100%)",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "17px",
    transition: "all 0.3s ease",
    display: "inline-block",
    boxShadow: "0 4px 15px rgba(0, 115, 230, 0.3)",
    position: "relative",
    overflow: "hidden",
    border: "none",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  buttonArrow: {
    marginLeft: "8px",
    transition: "transform 0.2s ease",
    display: "inline-block",
    transform: "translateX(0)",
  },
  sectionTitle: {
    fontSize: "28px",
    marginBottom: "25px",
    color: "#1a365d",
    fontWeight: "700",
    position: "relative",
    display: "inline-block",
  },
  highlightText: {
    position: "relative",
    zIndex: "1",
    "&::after": {
      content: "''",
      position: "absolute",
      bottom: "5px",
      left: "0",
      width: "100%",
      height: "8px",
      background: "rgba(0, 115, 230, 0.15)",
      zIndex: "-1",
    },
  },
  featuredContainer: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "60px",
    position: "relative",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
  },
  subjectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "18px",
  },
  subjectItem: {
    padding: "18px",
    background: "rgba(241, 245, 249, 0.7)",
    textAlign: "center",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "500",
    color: "#2a4a6a",
    transition: "all 0.3s ease",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    border: "1px solid rgba(230, 240, 250, 0.8)",
    backdropFilter: "blur(5px)",
    transform: "translateY(0)",
  },
  subjectItemShine: {
    position: "absolute",
    top: "-100%",
    left: "-100%",
    width: "60px",
    height: "200%",
    background: "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)",
    transform: "rotate(30deg)",
    transition: "all 0.6s ease",
  },
  rqeContainer: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 5px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
  },
  rqeBackgroundShape: {
    position: "absolute",
    top: "-100px",
    right: "-100px",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0, 115, 230, 0.05) 0%, rgba(0, 115, 230, 0) 70%)",
    zIndex: "0",
  },
  rqeDescription: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#435a70",
    lineHeight: "1.7",
    position: "relative",
    zIndex: "1",
  },
  boldHighlight: {
    fontWeight: "700",
    color: "#0073e6",
  },
  rqeList: {
    padding: "0",
    fontSize: "16px",
    color: "#435a70",
    marginBottom: "20px",
    listStyle: "none",
    position: "relative",
    zIndex: "1",
  },
  rqeListItem: {
    marginBottom: "12px",
    paddingLeft: "10px",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  rqeListIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #0073e6 0%, #00a3e0 100%)",
    color: "white",
    marginRight: "10px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  rqeNote: {
    fontSize: "15px",
    color: "#5a738a",
    fontStyle: "italic",
    position: "relative",
    zIndex: "1",
    paddingLeft: "15px",
    borderLeft: "3px solid #0073e6",
  },
  rqeGradientBar: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "5px",
    background: "linear-gradient(90deg, #0073e6, #00a3e0, #0073e6)",
    backgroundSize: "200% 100%",
    animation: "gradientShift 3s ease infinite",
  },
};

// You would need to add these CSS animations to your global CSS or create a stylesheet
const globalStyles = `
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-background {
  position: relative;
  overflow: hidden;
}

.animated-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(125deg, #f0f4f8 0%, #e6f7ff 50%, #f0f4f8 100%);
  background-size: 200% 200%;
  animation: gradientAnimation 15s ease infinite;
  z-index: -1;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

${styles.subjectItem}:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 115, 230, 0.15);
  background: rgba(230, 240, 255, 0.8);
}

${styles.subjectItem}:hover ${styles.subjectItemShine} {
  top: -50%;
  left: 150%;
  transition: all 0.6s ease;
}

${styles.navLinkButton}:hover {
  box-shadow: 0 6px 20px rgba(0, 115, 230, 0.4);
  transform: translateY(-2px);
}

${styles.navLinkButton}:hover ${styles.buttonArrow} {
  transform: translateX(5px);
}
`;

export default Home;