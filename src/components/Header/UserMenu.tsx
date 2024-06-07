import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

interface UserMenuProps {
  isLoggedIn: boolean;
  anchorMenuEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  handleLogout: () => void;
}

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
          to="/account/user"
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
          to="/login"
          className="block px-4 py-2 text-center hover:bg-slate-200 dark:hover:bg-slate-800 w-32"
          aria-label="Login"
        >
          <p>Login</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose} className="p-0">
        <Link
          to="/register"
          className="block px-4 py-2 text-center hover:bg-slate-200 dark:hover:bg-slate-800 w-32"
          aria-label="Register"
        >
          <p>Register</p>
        </Link>
      </MenuItem>
    </Menu>
  );

export default UserMenu;
