import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { baseURL } from "../../utils/config";

interface UserMenuProps {
  isLoggedIn: boolean;
  anchorMenuEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  handleLogout: () => void;
}

/**
 * UserMenu Component
 * This component renders a menu for user actions such as viewing the account or logging out if the user is logged in,
 * or for logging in and registering if the user is not logged in.
 *
 * Props:
 * - isLoggedIn: boolean - Indicates whether the user is logged in.
 * - anchorMenuEl: null | HTMLElement - The HTML element to anchor the menu to.
 * - open: boolean - Indicates whether the menu is open.
 * - handleClose: () => void - Function to handle closing the menu.
 * - handleLogout: () => void - Function to handle logging out the user.
 *
 * The component uses Material-UI's Menu and MenuItem components to display the menu.
 * It conditionally renders different menu items based on the isLoggedIn prop.
 * If the user is logged in, it displays menu items for viewing the account and logging out.
 * If the user is not logged in, it displays menu items for logging in and registering.
 *
 * The menu items use the Link component from react-router-dom for navigation.
 * The Menu component is styled to have different background colors in light and dark modes.
 */

const UserMenu = ({
  isLoggedIn,
  anchorMenuEl,
  open,
  handleClose,
  handleLogout,
}: UserMenuProps) =>
  isLoggedIn ? (
    <Menu
      open={open}
      anchorEl={anchorMenuEl}
      onClose={handleClose}
      sx={{
        ".dark & .MuiMenu-list": { backgroundColor: "rgb(71 85 105)" },
        "& .MuiMenu-list": { backgroundColor: "rgb(241 245 249)" },
      }}
    >
      <MenuItem onClick={handleClose} className="p-0">
        <Link
          to={`${baseURL}account/user`}
          className="block px-4 py-2 text-center hover:bg-slate-200 dark:hover:bg-slate-800 w-32"
          aria-label="Account"
        >
          <p>Account</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout} className="p-0">
        <p
          className="block px-4 py-2 w-32 hover:bg-slate-200 dark:hover:bg-slate-800 text-center"
          aria-label="Logout"
        >
          Logout
        </p>
      </MenuItem>
    </Menu>
  ) : (
    <Menu
      open={open}
      anchorEl={anchorMenuEl}
      onClose={handleClose}
      sx={{
        ".dark & .MuiMenu-list": { backgroundColor: "rgb(71 85 105)" },
        "& .MuiMenu-list": { backgroundColor: "rgb(241 245 249)" },
      }}
    >
      <MenuItem onClick={handleClose} className="p-0">
        <Link
          to={`${baseURL}login`}
          className="block px-4 py-2 text-center hover:bg-slate-200 dark:hover:bg-slate-800 w-32"
          aria-label="Login"
        >
          <p>Login</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose} className="p-0">
        <Link
          to={`${baseURL}register`}
          className="block px-4 py-2 text-center hover:bg-slate-200 dark:hover:bg-slate-800 w-32"
          aria-label="Register"
        >
          <p>Register</p>
        </Link>
      </MenuItem>
    </Menu>
  );

export default UserMenu;
