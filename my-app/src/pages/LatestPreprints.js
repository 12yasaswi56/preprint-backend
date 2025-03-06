import React, { useState, useEffect } from "react";
// import Footer from "../components/footer";
import Navbar from "../components/navbar";

const LatestPreprints = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [preprints, setPreprints] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/latestpreprints")
      .then((res) => res.json())
      .then((data) => setPreprints(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/search?query=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Navbar />
      <header style={styles.hheader}>
        <div style={styles.ccontainer}>
          
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or author"
              required
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>Search</button>
          </form>
        </div>
      </header>

      <main style={styles.container}>
        {searchQuery ? (
          <div>
            <h2>Search Results for "{searchQuery}"</h2>
            {results.length > 0 ? (
              <ul style={styles.preprintList}>
                {results.map((preprint) => (
                  <li key={preprint._id} style={styles.preprintItemSearch}>
                    <h3>
                      <a href={`/preprint/${preprint._id}`} style={styles.titleLink}>
                        {preprint.title}
                      </a>
                    </h3>
                    <p style={styles.author}>By {preprint.author}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        ) : (
          <section style={styles.preprints}>
            <h2>Latest Preprints</h2>
            <ul style={styles.preprintList}>
              {preprints.map((preprint) => (
                <li key={preprint._id} style={styles.preprintItem}>
                  <h3>
                    <a href={`/preprint/${preprint._id}`} style={styles.titleLink}>
                      {preprint.title}
                    </a>
                  </h3>
                  <p style={styles.author}>By {preprint.author}</p>
                  <p style={styles.abstract}>{preprint.abstract}</p>
                  {preprint.doi && <p><strong>DOI:</strong> {preprint.doi}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}
        <a href="/" style={styles.button}>Back to Home</a>
      </main>
      
    </div>
  );
};

const styles = {
  hheader: {
    padding: "15px",
    color: "white",
  },
  ccontainer: {
    paddingTop: "15px",
    maxWidth: "1200px",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    paddingBottom: "60px",
  },
  searchForm: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "5px",
    width: "100%",
    maxWidth: "600px",
  },
  searchInput: {
    flex: "1",
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    width: "100%",
  },
  searchButton: {
    padding: "12px 20px",
    backgroundColor: "#005bb5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s",
    whiteSpace: "nowrap",
  },
  searchButtonHover: {
    backgroundColor: "#004494",
  },
  preprints: {
    marginTop: "30px",
  },
  preprintList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "15px",
    listStyleType: "none",
    padding: "0",
  },
  preprintItem: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    margin: "10px 0",
    borderRadius: "10px",
    textAlign: "left",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
  },
  preprintItemSearch: {
    backgroundColor: "#e0f7fa",
    padding: "20px",
    margin: "10px 0",
    borderRadius: "10px",
    textAlign: "left",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
  },
  preprintItemHover: {
    transform: "scale(1.02)",
  },
  titleLink: {
    textDecoration: "none",
    color: "#0073e6",
    fontWeight: "bold",
    fontSize: "18px",
  },
  author: {
    fontSize: "14px",
    color: "#666",
  },
  abstract: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#333",
  },
  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 20px",
    backgroundColor: "#0073e6",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
    
  },
  buttonHover: {
    backgroundColor: "#005bb5",
  },
};


export default LatestPreprints;
