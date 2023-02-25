import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components";
import {
  AboutUs,
  BookDetail,
  ContactUs,
  Feedback,
  Home,
  Profile,
} from "./pages";

function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <>
      <Navbar />
      <div
        className={`App ${transitionStage}`}
        onAnimationEnd={() => {
          if (transitionStage === "fadeOut") {
            setTransitionStage("fadeIn");
            setDisplayLocation(location);
          }
        }}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<BookDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact-us" element={<Feedback />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
      <div className="background-pattern"></div>
    </>
  );
}

export default App;
