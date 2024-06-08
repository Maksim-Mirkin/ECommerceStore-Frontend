import { Link } from "react-router-dom";
import IconBox from "./IconBox";

/**
 * Footer Component
 * This component renders the footer of the application, which includes navigation links and an icon box.
 *
 * The component uses:
 * - `IconBox` component: Displays a box with icons for various actions.
 * - `Link` components from `react-router-dom` for navigation within the application.
 * - An anchor (`<a>`) element for an external link to the API documentation.
 *
 * Structure:
 * - The footer is a flex container with a column layout on small screens and a row layout on larger screens.
 * - It contains three main sections:
 *   1. `IconBox` for various icons (e.g., social media, theme toggle).
 *   2. A navigation section with links to About, Contact Us, and API Documentation.
 *   3. A section with legal links (Terms and Privacy Policy) and a copyright notice.
 *
 * The links and buttons have appropriate `aria-label` attributes for accessibility.
 * The external link to the API documentation includes `target="_blank"` and `rel="noopener noreferrer"` for security.
 */

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
