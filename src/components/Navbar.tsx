import { Link } from "react-router-dom";

/**
 * Navbar Component
 * Renders a navigation bar with links to various product categories, including laptops, cellulars, TVs, and headphones.
 * Each link is styled with hover and active states for better user interaction.
 *
 * Features:
 * - Navigation links to different product categories.
 * - Styled with hover and active states for improved user experience.
 * - Uses React Router's `Link` component for client-side navigation.
 */
const Navbar = () => {
  const  hoverClasses = "hover:bg-primary-light active:bg-primary-regular transition-all duration-300 ease-in-out"
  const cssClasses = `border-r-2 border-slate-100 flex-1 hover:bg-primary-light active:bg-primary-regular ${hoverClasses}`
  return (
    <nav className="bg-primary-regular flex justify-between border-t-2 border-slate-100 text-center">
      <Link
        to="/category/laptop"
        className={cssClasses}
        aria-label="Laptops category"
      >
        <p className="text-white">Laptop</p>
      </Link>
      <Link
        to="/category/cellular"
        className={cssClasses}
        aria-label="Cellulars category"
      >
        <p className="text-white">Cellulars</p>
      </Link>
      <Link
        to="/category/tv"
        className={cssClasses}
        aria-label="TV category"
      >
        <p className="text-white">TV</p>
      </Link>
      <Link
        to="/category/headphone"
        className={`flex-1 ${hoverClasses}`}
        aria-label="Headphones category"
      >
        <p className="text-white">Headphones</p>
      </Link>
    </nav>
  );
};

export default Navbar;
