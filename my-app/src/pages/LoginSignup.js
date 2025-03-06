import React, { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    let dataObj;
    await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    console.log(dataObj);
    if (dataObj.success) {
      alert("login Succesful");
      localStorage.setItem("auth-token", dataObj.token);
     

      console.log("Stored Token:", localStorage.getItem("auth-token"));
      window.location.replace("/dashboard");
    } else {
      alert(dataObj.error);

    }
  };

  const signup = async () => {
    let dataObj;
    await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      alert("signup succesful");
      localStorage.setItem("auth-token", dataObj.token);
      

      window.location.replace("/");
    } else {
      alert(dataObj.error);
    }
  };

  return (
    <>
    <Navbar />
    <div style={styles.container}>
      
      <div style={styles.box}>
        <h1 style={styles.heading}>{state}</h1>
        <div style={styles.fields}>
          {state === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              style={styles.input}
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            style={styles.input}
          />
        </div>

        <button onClick={() => (state === "Login" ? login() : signup())} style={styles.button}>
          Continue
        </button>

        {state === "Login" ? (
          <p style={styles.toggleText}>
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")} style={styles.toggleLink}>
              Click here
            </span>
          </p>
        ) : (
          <p style={styles.toggleText}>
            Already have an account?{" "}
            <span onClick={() => setState("Login")} style={styles.toggleLink}>
              Login here
            </span>
          </p>
        )}

        <div style={styles.agree}>
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
    </>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    fontFamily: "Arial, sans-serif",
  },
  box: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  toggleText: {
    marginTop: "10px",
    color: "#555",
  },
  toggleLink: {
    color: "#007BFF",
    cursor: "pointer",
    textDecoration: "underline",
  },
  agree: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    color: "#555",
  },
};

export default LoginSignup;