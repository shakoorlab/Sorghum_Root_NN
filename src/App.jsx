import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MaskDataProvider } from "./context/MaskDataContext.jsx";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import GenerateMask from "./components/GenerateMask";

function App() {
  return (
    <Router>
      <MaskDataProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<GenerateMask />} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} />
            <Route path="#" element={<QuoteHero />} />
            <Route path="/team" element={<Team />} />
            <Route path="/news" element={<Cards />} />
            <Route path="/contact" element={<Contact />} /> */}
        </Routes>
        <Footer />
      </MaskDataProvider>
    </Router>
  );
}

export default App;
