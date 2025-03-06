import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import Team from "./pages/Team";
import SubmitPreprint from "./pages/SubmitPreprint";
import Home from "./pages/Home";
import About from "./pages/About";
import LatestPreprints from "./pages/LatestPreprints";
import LoginSignup from "./pages/LoginSignup";
import PreprintDetails from "./pages/PreprintDetails";
import ToolsAndServices from "./pages/ToolsAndServices";
import Footer from "./components/footer"; // Assuming your footer file is named Footer.js

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        <div style={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/latestpreprints" element={<LatestPreprints />} />
            <Route path="/about" element={<About />} />
            <Route path="/tools & services" element={<ToolsAndServices />} />
            <Route path="/team" element={<Team />} />
            <Route path="/preprint/:id" element={<PreprintDetails />} />
            <Route path="/submitpreprint" element={<SubmitPreprint />} />
            <Route path="/login" element={<LoginSignup />} />
          </Routes>
        </div>

        {/* Footer that stays at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

// CSS styles for layout
const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // Full screen height
  },
  contentWrapper: {
    flex: 1, // This will push the footer down if content is short
  },
};

export default App;
