import React from "react";
import { Link } from "react-router-dom";
// import Footer from "../components/footer"; // Import Footer component
import Navbar from "../components/navbar";
const Team = () => {
  return (
    <div>
      <Navbar />
      <header style={styles.header}>
        <div style={styles.container}>
          
          
        </div>
      </header>

      <section style={styles.members}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Our Team</h2>
          <div style={styles.memberList}>
            {teamMembers.map((member, index) => (
              <div key={index} style={styles.member}>
                <img src={member.image} alt={member.name} style={styles.image} />
                <h3 style={styles.memberName}>{member.name}</h3>
                <p style={styles.role}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

// Team Members Data
const teamMembers = [
  {
    name: "Alan Munigety",
    role: "Team Lead, Backend Developer",
    image: "\WhatsApp Image 2025-02-05 at 18.29.15_bd7a3571.jpg"
  },
  {
    name: "Harshal Kumar",
    role: "Frontend Developer",
    image: "\photo_2025-02-08_11-41-47.jpg"
  },
  {
    name: "Yasaswi Kopparapu",
    role: "Backend Developer",
    image: "\photo_2025-02-08_11-41-36.jpg"
  },
  {
    name: "Dhanashree Patil",
    role: "Frontend Developer",
    image: "\photo_2025-02-08_11-41-41.jpg"
  },
  {
    name: "Mr Harshit Mittal",
    role: "Co-founder & Chief Executive Officer",
    image: "\WhatsApp Image 2025-02-08 at 11.45.17_4105c098.jpg"
  },
  {
    name: "Mr Vivek Yadav",
    role: "Co-founder & Chief of Management and Industrial Relations",
    image: "\WhatsApp Image 2025-02-08 at 11.45.17_a35c9872.jpg"
  }
];

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  header: {
    padding: "20px",
    color: "#004080",
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  members: {
    padding: "50px 20px",
    background: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    marginTop: "20px",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "40px",
    color: "#004080",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  memberList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    justifyContent: "center",
    alignItems: "stretch", // Make all cards equal height
  },
  member: {
    background: "linear-gradient(135deg, #ffffff, #f0f5ff)",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  memberHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
  },
  image: {
    width: "100%",
    height: "300px", // Increased for better visual appeal
    borderRadius: "10px",
    objectFit: "cover",
    marginBottom: "15px",
    backgroundColor: "#e0e0e0",
  },
  memberName: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#00264d",
    margin: "10px 0 5px",
  },
  role: {
    fontSize: "15px",
    color: "#666",
    fontStyle: "italic",
  },
};





export default Team;
