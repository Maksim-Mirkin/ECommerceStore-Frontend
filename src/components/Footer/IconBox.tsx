import {
  GithubWhiteIcon,
  InstagramIcon,
  LinkedInIcon,
  XTwitterWhiteIcon,
} from "../../ui/icons";

/**
 * IconBox Component
 * This component renders a box with icons linking to various social media profiles.
 *
 * The component uses:
 * - `GithubWhiteIcon`, `InstagramIcon`, `LinkedInIcon`, `XTwitterWhiteIcon` from the icons library.
 * - Anchor (`<a>`) elements to link to external social media profiles.
 *
 * Structure:
 * - The `div` container uses flexbox and grid layout classes for responsive design.
 * - On small screens (`sm:`), the icons are displayed in a grid with two columns and a gap.
 * - On larger screens, the icons are displayed in a row using flexbox.
 *
 * Accessibility:
 * - Each anchor element has an `aria-label` attribute describing the link.
 * - External links open in a new tab (`target="_blank"`) with `rel="noopener noreferrer"` for security.
 */

const IconBox = () => {
  return (
    <div className="flex order-2 sm:order-1 justify-evenly sm:grid sm:grid-cols-2 sm:gap-4 my-8">
      <a
        href="https://www.linkedin.com/in/maksim-mirkin/"
        aria-label="LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={LinkedInIcon} alt="LinkedIn icon" className="h-12 sm:h-9" />
      </a>
      <a
        href="https://github.com/Maksim-Mirkin"
        aria-label="GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={GithubWhiteIcon} alt="GitHub icon" className="h-12 sm:h-9" />
      </a>
      <a
        href="https://www.instagram.com/"
        aria-label="Instagram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={InstagramIcon} alt="Instagram icon" className="h-12 sm:h-9" />
      </a>
      <a
        href="https://twitter.com/"
        aria-label="Twitter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={XTwitterWhiteIcon}
          alt="Twitter icon"
          className="h-12 sm:h-9"
        />
      </a>
    </div>
  );
};

export default IconBox;
