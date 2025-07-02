import { FaGithub, FaLinkedinIn, FaEnvelope, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
      icon: <FaXTwitter />,
      url: "https://twitter.com/abdulashwaq",
      label: "X (Twitter)"
    },
    {
      icon: <FaInstagram />,
      url: "https://instagram.com/abdulashwaq",
      label: "Instagram"
    },
    {
      icon: <FaEnvelope />,
      url: "mailto:abdulashwaqmohammed@gmail.com",
      label: "Email"
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