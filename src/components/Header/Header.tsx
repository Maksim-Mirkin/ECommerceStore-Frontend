import { Link } from "react-router-dom";
import IconBox from "./IconBox";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useState } from "react";

/**
 * Header Component
 * This component renders the header of the application, including the logo, search bar, and icon box.
 *
 * State:
 * - isVisible: A boolean state that determines the visibility of the search bar and logo.
 * - toggleVisibility: A function that toggles the value of isVisible.
 *
 * Components:
 * - Link: A component from "react-router-dom" used for navigation. It wraps the Logo component to navigate to the home page.
 * - Logo: A component that displays the application's logo.
 * - SearchBar: A component that renders the search bar. It has customizable display, height, width, and rounded properties.
 * - IconBox: A component that provides an icon to toggle the visibility of the search bar and logo.
 *
 * Styling:
 * - The header has a primary background color and white text color.
 * - Flexbox is used to align items horizontally and justify content between the start and end.
 *
 * Accessibility:
 * - aria-label: Provides an accessible label for the home link.
 */

const Header = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <header className="bg-primary-regular text-white flex flex-row justify-between items-center">
      {isVisible ? (
        <>
          <Link to="/" aria-label="Home">
            <Logo />
          </Link>
          <SearchBar
            display="hidden sm:flex"
            height="h-12"
            width="w-[32rem]"
            rounded="rounded-3xl"
          />
          <IconBox onClick={toggleVisibility} />
        </>
      ) : (
        <SearchBar
          display="flex"
          height="h-16"
          width="w-full"
          onClick={toggleVisibility}
        />
      )}
    </header>
  );
};

export default Header;
