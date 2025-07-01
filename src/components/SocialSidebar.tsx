import { FaGithub, FaLinkedinIn, FaMedium, FaEnvelope } from "react-icons/fa";
import "./styles/SocialSidebar.css";

const SocialSidebar = () => {
  const socialLinks = [
    {
      icon: <FaGithub />,
      url: "https://github.com/ashmohdd",
      label: "GitHub"
    },
    {
      icon: <FaLinkedinIn />,
      url: "https://www.linkedin.com/in/abdulashwaq/",
      label: "LinkedIn"
    },
    {
      icon: <FaMedium />,
      url: "https://medium.com/@abdulashwaq12",
      label: "Medium"
    },
    {
      icon: <FaEnvelope />,
      url: "mailto:abdulashwaqmohammed@gmail.com",
      label: "Gmail"
    }
  ];

  return (
    <div className="social-sidebar">
      <div className="social-sidebar-container">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-sidebar-link"
            data-cursor="disable"
            title={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialSidebar;