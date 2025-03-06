import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PreprintDetails = () => {
  const { id } = useParams();
  const [preprint, setPreprint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [videoUrl, setVideoUrl] = useState(""); 
  const [generating, setGenerating] = useState(false); 

  useEffect(() => {
    fetch(`http://localhost:5000/preprint/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Fetched Data:", data.preprint);
          setPreprint(data.preprint);
        } else {
          setError(data.error || "Failed to fetch preprint data");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching preprint:", err);
        setError("Failed to fetch preprint");
        setLoading(false);
      });
  }, [id]);

  const handleGenerateVideo = () => {
    if (!preprint) return;

    setGenerating(true);
    fetch("http://localhost:5000/generate-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: preprint.title,
        abstract: preprint.abstract,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVideoUrl(data.videoUrl);
        } else {
          setError("Failed to generate video");
        }
        setGenerating(false);
      })
      .catch(() => {
        setError("Failed to generate video");
        setGenerating(false);
      });
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{preprint.title}</h2>
      <p style={styles.author}><strong>By:</strong> {preprint.author}</p>
      <p style={styles.abstract}>{preprint.abstract}</p>

      {preprint.doi && preprint.pdf ? (
        <p style={styles.doi}>
          <strong>DOI:</strong>{" "}
          <a
            href={`http://localhost:5000/uploads/${preprint.pdf}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.doiLink}
          >
            {preprint.doi}
          </a>
        </p>
      ) : (
        <p style={styles.errorText}>PDF not available</p>
      )}

      {preprint.references && preprint.references.length > 0 ? (
        <div style={styles.referencesContainer}>
          <h3>References</h3>
          <ul style={styles.referenceList}>
            {preprint.references.map((ref, index) => (
              <li key={index} style={styles.referenceItem}>
                {ref.link ? (
                  <a href={ref.link} target="_blank" rel="noopener noreferrer" style={styles.referenceLink}>
                    {ref.title}
                  </a>
                ) : (
                  ref.title
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p style={styles.noReferences}>No references available.</p>
      )}

      {preprint.pdf && (
        <div>
          <a
            href={`http://localhost:5000/uploads/${preprint.pdf}`}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <button style={styles.downloadButton}>Download PDF</button>
          </a>
        </div>
      )}

      {/* Video Generation Section */}
      <div style={styles.videoSection}>
        <button
          onClick={handleGenerateVideo}
          style={styles.generateButton}
          disabled={generating}
        >
          {generating ? "Generating Video..." : "Generate Video"}
        </button>

        {videoUrl && (
          <div style={styles.videoContainer}>
            <h3>Generated Video:</h3>
            <video controls style={styles.videoPlayer}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "10px",
  },
  author: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
  },
  abstract: {
    fontSize: "15px",
    color: "#444",
    backgroundColor: "#f8f9fa",
    padding: "12px",
    borderRadius: "6px",
    lineHeight: "1.5",
  },
  doi: {
    marginTop: "12px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  doiLink: {
    color: "#007bff",
    textDecoration: "none",
  },
  errorText: {
    color: "red",
  },
  referencesContainer: {
    marginTop: "20px",
    backgroundColor: "#f8f9fa",
    padding: "12px",
    borderRadius: "6px",
  },
  referenceList: {
    paddingLeft: "20px",
  },
  referenceItem: {
    fontSize: "14px",
    marginBottom: "5px",
  },
  referenceLink: {
    color: "#007bff",
    textDecoration: "none",
  },
  noReferences: {
    color: "#777",
  },
  downloadButton: {
    marginTop: "15px",
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
  },
  videoSection: {
    marginTop: "20px",
    textAlign: "center",
  },
  generateButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  videoContainer: {
    marginTop: "20px",
  },
  videoPlayer: {
    width: "100%",
    maxHeight: "400px",
    borderRadius: "8px",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#007bff",
  },
  error: {
    textAlign: "center",
    fontSize: "18px",
    color: "red",
  },
};

export default PreprintDetails;
