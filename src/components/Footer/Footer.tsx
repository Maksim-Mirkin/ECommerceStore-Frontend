import { Link } from "react-router-dom";
import IconBox from "./IconBox";

const Footer = () => {
  return (
    <footer className="font-body flex flex-col sm:flex-row justify-evenly bg-primary-regular text-white">
      <IconBox />
      <nav className="flex flex-col gap-2 items-center my-4 sm:my-10 order-1 sm:order-2">
        <Link to="/about" aria-label="About Us">
          About
        </Link>
        <Link to="/contact-us" aria-label="Contact Us">
          Contact Us
        </Link>
        <a
          href="http://localhost:8080/swagger-ui/index.html"
          aria-label="Documentation"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
      </nav>
      <div className="flex flex-col gap-4 my-8 sm:my-12 items-center order-last">
        <span>
          <Link to="/terms" aria-label="Terms and Conditions">
            Terms
          </Link>{" "}
          ·{" "}
          <Link to="/privacy-policy" aria-label="Privacy Policy">
            Privacy Policy
          </Link>
        </span>
        <span>© All rights reserved 2024</span>
      </div>
    </footer>
  );
};

export default Footer;
