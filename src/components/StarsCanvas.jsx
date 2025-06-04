// src/components/StarsCanvas.jsx
import { useRef, useEffect } from "react";

const StarsCanvas = () => {
  const canvasRef          = useRef(null);
  const animationFrameRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initial dimensions
    let width   = (canvas.width  = window.innerWidth);
    let height  = (canvas.height = window.innerHeight);
    let centerX = width  / 2;
    let centerY = height / 2;

    // Focal length for perspective
    const FOCAL_LENGTH = width;
    const STAR_COUNT   = 2400;

    // Build our 3D‐positioned stars
    const stars = Array.from({ length: STAR_COUNT }).map(() => ({
      x: (Math.random() * 2 - 1) * width,
      y: (Math.random() * 2 - 1) * height,
      z: Math.random() * width,
      baseRadius: Math.random() * 1.5 + 0.2,
      alpha: Math.random(),
      alphaDir: Math.random() < 0.5 ? 1 : -1,
    }));

    // Buffer for shooting stars
    let shootingStars = [];
    const addShootingStar = () => {
      const startX = Math.random() * width;
      const startY = Math.random() * height * 0.5;
      const length = Math.random() * 300 + 200;
      const speed  = Math.random() * 8 + 4;
      const angle  = Math.PI * 0.25; // 45 degrees
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      shootingStars.push({ x: startX, y: startY, vx, vy, length, speed });
    };

    // Rotation state
    let rotationAngle = 0;    // accumulated rotation in radians
    let lastTime      = 0;    // timestamp of last frame
    const ROT_SPEED   = 0.00003; // radians per millisecond

    const draw = (now) => {
      // If this is the very first frame, initialize lastTime
      if (!lastTime) lastTime = now;
      // Δt in milliseconds
      const delta = now - lastTime;
      lastTime = now;

      // Accumulate rotation angle
      rotationAngle += delta * ROT_SPEED;

      // Clear entire canvas
      ctx.clearRect(0, 0, width, height);

      // Precompute cos/sin of the current rotation
      const cosA = Math.cos(rotationAngle);
      const sinA = Math.sin(rotationAngle);

      // 1) Draw & update each “static” star in 3D space
      stars.forEach((star) => {
        // Rotate star around Y axis (for a slow “spin” effect)
        const x3 = star.x * cosA - star.z * sinA;
        const z3 = star.x * sinA + star.z * cosA;

        // Perspective projection
        const p  = FOCAL_LENGTH / (FOCAL_LENGTH + z3);
        const sx = centerX + x3 * p;
        const sy = centerY + star.y * p;

        // Depth‐scaled radius & alpha
        const r = star.baseRadius * p * 1.5;
        const a = Math.max(0, Math.min(1, star.alpha * p));

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();

        // Twinkle logic
        star.alpha += 0.02 * star.alphaDir;
        if (star.alpha <= 0) {
          star.alpha = 0;
          star.alphaDir = 1;
        } else if (star.alpha >= 1) {
          star.alpha = 1;
          star.alphaDir = -1;
        }

        // If the star has spun “behind” the camera, recycle it
        if (z3 < -FOCAL_LENGTH * 0.9) {
          star.x = (Math.random() * 2 - 1) * width;
          star.y = (Math.random() * 2 - 1) * height;
          star.z = width;
        }
      });

      // 2) Randomly spawn new shooting stars
      if (Math.random() < 0.002) {
        addShootingStar();
      }

      // 3) Draw & update existing shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        // Compute tail end point
        const tailX = s.x - (s.vx * (s.length / s.speed));
        const tailY = s.y - (s.vy * (s.length / s.speed));

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Move the shooting star along its velocity
        s.x += s.vx;
        s.y += s.vy;

        // If it left the screen, remove it
        if (s.x > width + 50 || s.y > height + 50) {
          shootingStars.splice(i, 1);
        }
      }

      // 4) Queue up next frame
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    // Kick‐off the first frame
    animationFrameRef.current = requestAnimationFrame(draw);

    // Handle window resize so canvas always fills the screen
    const handleResize = () => {
      width   = canvas.width  = window.innerWidth;
      height  = canvas.height = window.innerHeight;
      centerX = width  / 2;
      centerY = height / 2;
      // Note: We keep FOCAL_LENGTH constant = original width,
      // but if you want focal length to change on resize, you could reassign it here.
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount (just in case React ever tears this component down)
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{ display: "block" }}
    />
  );
};

export default StarsCanvas;
