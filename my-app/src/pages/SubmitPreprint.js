import { useState, useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
export default function SubmitPreprint() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    abstract: "",
    pdf: null,
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("auth-token");
    console.log("Retrieved Token:", storedToken);
    setToken(storedToken);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, pdf: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.pdf) {
      alert("Please upload a PDF file.");
      return;
    }
    
    if (!token) {
      alert("You must be logged in to submit a preprint.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("abstract", formData.abstract);
    formDataToSend.append("pdf", formData.pdf);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const result = await response.json();
      setLoading(false);
      console.log("Server Response:", result);
      
      if (response.ok) {
        alert("Preprint submitted successfully!");
        setFormData({ title: "", author: "", abstract: "", pdf: null });
      } else {
        alert("Error: " + (result.error || "Submission failed"));
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Internal Server Error.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <header style={styles.header}>
        <h1 style={styles.logo}>EnerTransition.com <span style={styles.tagline}>A Unit of Pro H2Vis Solutions</span></h1>
        
      </header>

      <main style={styles.container}>
        <section style={styles.formSection}>
          <h2 style={styles.heading}>Submit a New Preprint</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required style={styles.input} />

            <label style={styles.label}>Author:</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} required style={styles.input} />

            <label style={styles.label}>Abstract:</label>
            <textarea name="abstract" rows="5" value={formData.abstract} onChange={handleChange} required style={styles.textarea} />

            <label style={styles.label}>Upload PDF:</label>
            <input type="file" accept="application/pdf" onChange={handleFileChange} required style={styles.fileInput} />

            <button type="submit" style={styles.submitButton} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const styles = {
  container: { maxWidth: "800px", margin: "0 auto", padding: "20px" },
  header: { backgroundColor: "#333", padding: "20px", color: "#fff", textAlign: "center" },
  logo: { fontSize: "24px", fontWeight: "bold" },
  tagline: { display: "block", fontSize: "12px", fontStyle: "italic", color: "#bbb" },
  nav: { display: "flex", justifyContent: "center", gap: "15px", marginTop: "10px" },
  navLink: { color: "#fff", textDecoration: "none", fontSize: "16px", padding: "5px 10px", borderRadius: "5px", backgroundColor: "#444" },
  formSection: { backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" },
  heading: { textAlign: "center", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  label: { fontWeight: "bold" },
  input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  textarea: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  fileInput: { border: "none" },
  submitButton: { padding: "10px", backgroundColor: "#007BFF", color: "#fff", borderRadius: "5px", fontSize: "16px", border: "none", cursor: "pointer", marginTop: "10px" },
};
