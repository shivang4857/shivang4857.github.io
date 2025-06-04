// src/App.jsx
import React, { useState } from "react";

import Navbar      from "./components/Navbar/Navbar";
import About       from "./components/About/About";
import Skills      from "./components/Skills/Skills";
import Experience  from "./components/Experience/Experience";
import Work        from "./components/Work/Work";
import Education   from "./components/Education/Education";
import Contact     from "./components/Contact/Contact";
import Footer      from "./components/Footer/Footer";
import StarsCanvas from "./components/StarsCanvas"; // if you still want the star‐field

import Loader from "./components/loader/Loader";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative bg-[#050414] min-h-screen overflow-hidden">
      {/* 
        1) If you still want the star‐field, it can be at z-0 so it runs behind everything. 
           Otherwise omit this line. 
      */}
      <StarsCanvas />

      {isLoading && (
        /* 2) Show the neon loader on top of everything
              It will fade itself out and call setIsLoading(false) */
        <Loader onFinish={() => setIsLoading(false)} />
      )}

      {!isLoading && (
        /* 3) Your real content, sitting at z-10 (above the star‐field, below loader) */
        <div className="relative pt-20 z-10">
          <Navbar />
          <About />
          <Skills />
          <Experience />
          <Work />
          <Education />
          <Contact />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
