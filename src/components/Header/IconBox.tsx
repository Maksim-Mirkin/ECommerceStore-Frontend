import { FaSearch, FaUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import ThemeToggle from "./ThemeToggle";
import HeaderButton from "./HeaderButton";
import { useContext, useState, MouseEvent } from "react";
import {
  AuthContext,
  DarkModeThemeContext,
  useShoppingCart,
} from "../../contexts";
import { Dialogs } from "../../ui/dialogs";
import UserMenu from "./UserMenu";

interface IconBoxProps {
  onClick?: () => void;
}

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
