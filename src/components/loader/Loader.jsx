// src/components/Loader.jsx
// src/components/NeonLoader.jsx
import React, { useState, useEffect } from "react";

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Bump progress by 1% every 20 ms => ~2s to reach 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start fade-out
          setIsFading(true);
          // After fade (500ms), tell parent we’re done
          setTimeout(() => {
            if (typeof onFinish === "function") onFinish();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      className={`
        fixed inset-0 
        /* transparent so you see stars behind: */
        bg-transparent  
        flex flex-col items-center justify-center 
        z-50

        /* fade in/out: */
        transition-opacity duration-500
        ${isFading ? "opacity-0" : "opacity-100"}
      `}
    >
      {/* ───── Glowing Percentage Text ───── */}
      <div
        className={`
          text-white 
          text-3xl md:text-4xl lg:text-5xl 
          font-semibold 
          [text-shadow:0_0_8px_rgba(255,255,255,0.8)]
          mb-4
        `}
      >
        {progress} %
      </div>

      {/* ───── Neon-Outlined Progress Bar ───── */}
      <div className="w-3/4 max-w-2xl px-4">
        <div
          className={`
            w-full 
            h-10 md:h-12 lg:h-14 
            border-2 border-white 
            rounded-md 
            overflow-hidden 
            [box-shadow:0_0_8px_rgba(255,255,255,0.8)]
          `}
        >
          <div
            className={`
              h-full 
              bg-white/80 
              [box-shadow:0_0_4px_rgba(255,255,255,0.8)]
              transition-all duration-200 ease-linear
            `}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ───── “LOADING…” Glowing Label ───── */}
      <div
        className={`
          mt-4 
          text-white 
          text-xl md:text-2xl 
          font-medium 
          [text-shadow:0_0_8px_rgba(255,255,255,0.8)]
        `}
      >
        LOADING…
      </div>

      {/* ───── Credit Line Below ───── */}
      <p className="mt-2 text-gray-300 text-sm">
        Made with passion by Shivang
      </p>
    </div>
  );
};

export default Loader;
