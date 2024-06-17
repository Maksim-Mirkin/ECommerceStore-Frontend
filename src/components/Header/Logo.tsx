/**
 * Logo Component
 * This component renders the logo image for the e-commerce website.
 *
 * The logo image is styled with a maximum height and a hover effect.
 *
 * Attributes:
 * - src: Path to the logo image.
 * - alt: Alternative text for the logo image, which improves accessibility.
 * - className: CSS classes for styling the logo, including a maximum height and hover effect.
 */

import { baseURL } from "../../utils/config";

const Logo = () => {
  return (
    <img
      src={`${baseURL}/assets/logo.png`}
      alt="E-commerce logo"
      className="max-h-16 hover-button"
    />
  );
};

export default Logo;
