import { FaSearch, FaUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

import HeaderButton from "./HeaderButton";
import { useContext, useState, MouseEvent } from "react";
import { AuthContext, DarkModeThemeContext } from "../../contexts";
import { Dialogs } from "../../ui/dialogs";
import UserMenu from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";
import { useShoppingCart } from "../../hooks";

interface IconBoxProps {
  onClick?: () => void;
}

/**
 * IconBox Component
 * This component renders a set of icons used in the header of the application. 
 * The icons include search, dark mode toggle, cart, and account buttons.
 *
 * Props:
 * - onClick: An optional function that handles the click event for the search button on mobile.
 *
 * Contexts:
 * - DarkModeThemeContext: Provides the toggleTheme function to switch between light and dark modes.
 * - AuthContext: Provides the isLoggedIn state and logout function for user authentication.
 * - useShoppingCart: Custom hook that provides functions to open the cart and the current cart quantity.
 *
 * State:
 * - anchorMenuEl: Manages the anchor element for the user menu dropdown.
 * - open: Boolean that indicates if the user menu dropdown is open.
 *
 * Functions:
 * - handleClick: Opens the user menu dropdown.
 * - handleClose: Closes the user menu dropdown.
 * - handleLogout: Logs out the user and closes the user menu dropdown.
 *
 * Child Components:
 * - HeaderButton: A reusable button component used for each icon.
 * - ThemeToggle: A component that displays the current theme toggle icon.
 * - UserMenu: A component that renders the user menu dropdown.
 */

const IconBox = ({ onClick }: IconBoxProps) => {
  const { toggleTheme } = useContext(DarkModeThemeContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { openCart, cartQuantity } = useShoppingCart();
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorMenuEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorMenuEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    Dialogs.success("Logged out successfully!");
  };

  return (
    <div className="flex flex-row w-36 justify-evenly items-center">
      <HeaderButton
        id="search-bar-button"
        ariaLabel="Open search bar button on mobile"
        onClick={onClick}
      >
        <FaSearch className="h-8 w-8 sm:hidden" />
      </HeaderButton>
      <HeaderButton
        id="dark-mode-button"
        ariaLabel="Dark mode button"
        onClick={toggleTheme}
      >
        <ThemeToggle />
      </HeaderButton>
      <HeaderButton id="cart-button" ariaLabel="Cart button" onClick={openCart}>
        <IoCartOutline className="h-8 w-8" />
        <div className="rounded-full bg-red-500 flex justify-center items-center text-white w-4 h-4 absolute top-0 right-0 translate-x-1 -translate-y-1">
          {cartQuantity}
        </div>
      </HeaderButton>
      <HeaderButton
        id="account-button"
        ariaLabel="Account button"
        onClick={handleClick}
      >
        <FaUser className="h-8 w-8" />
      </HeaderButton>
      <UserMenu
        isLoggedIn={isLoggedIn}
        anchorMenuEl={anchorMenuEl}
        open={open}
        handleClose={handleClose}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default IconBox;
