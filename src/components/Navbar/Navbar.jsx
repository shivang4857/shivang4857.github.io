import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const menuItems = [
  { id: "about",     label: "About me"   },
  { id: "skills",    label: "Skills"     },
  { id: "experience",label: "Experience" },
  { id: "work",      label: "Projects"   },
  { id: "education", label: "Education"  },
];

const Navbar = () => {
  const [isOpen, setIsOpen]           = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled]   = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuItemClick = (id) => {
    setActiveSection(id);
    setIsOpen(false);
    const sec = document.getElementById(id);
    sec?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
    className={`
      fixed top-0 w-full z-50
      bg-[#050414]/30 backdrop-blur-sm    /* always translucent */
      transition-all duration-300
      px-[7vw] md:px-[7vw] lg:px-[20vw]
      ${isScrolled
        ? "bg-[#050414]/60 shadow-lg py-4"  /* deepen & add shadow on scroll */
        : "py-6"                            /* default taller padding */
      }
    `}
  >
      <div className="flex items-center justify-between text-white">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-bold tracking-wide">
          <span className="text-[#8245ec]">&lt;</span>
          <span>Shivang</span>
          <span className="text-[#8245ec]">/</span>
          <span>Dwivedi</span>
          <span className="text-[#8245ec]">&gt;</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-2 space-x-10 text-lg">
          {menuItems.map(item => (
            <li
              key={item.id}
              className={`
                cursor-pointer rounded-full px-3 py-1
                transition-colors duration-200
                ${activeSection === item.id
                  ? "bg-white/30 text-white font-semibold"
                  : "text-gray-100 hover:text-white"}
              `}
            >
              <button onClick={() => handleMenuItemClick(item.id)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-6 text-2xl text-gray-200">
          <a href="https://github.com/codingmastr" target="_blank" rel="noopener noreferrer"
             className="hover:text-white">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/tarun-kaushik-553b441a4" target="_blank" rel="noopener noreferrer"
             className="hover:text-white">
            <FaLinkedin />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {isOpen
            ? <FiX className="text-4xl text-[#8245ec] cursor-pointer" onClick={() => setIsOpen(false)} />
            : <FiMenu className="text-4xl text-[#8245ec] cursor-pointer" onClick={() => setIsOpen(true)} />
          }
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
         <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-4/5 bg-[#050414]/60 backdrop-blur-lg rounded-xl shadow-xl mt-2 md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-6 text-white text-xl">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  className={activeSection === item.id ? "font-semibold" : ""}
                  onClick={() => handleMenuItemClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="flex space-x-6 pt-4">
              <a href="https://github.com/codingmastr" target="_blank" rel="noopener noreferrer">
                <FaGithub size={28} />
              </a>
              <a href="https://www.linkedin.com/in/tarun-kaushik-553b441a4" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={28} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
