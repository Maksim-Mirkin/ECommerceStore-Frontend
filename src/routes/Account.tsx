import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaCartArrowDown, FaCartPlus, FaUser } from "react-icons/fa";
import { AuthContext } from "../contexts";
import { IoBagAdd } from "react-icons/io5";
import { LoadingNavLinks } from "../components/Account";

const Account = () => {
  const { user, isAdmin } = useContext(AuthContext);

  const basicClassName =
    "border flex gap-2 items-center h-12 px-2 md:flex-1 md:border md:rounded-lg md:mx-2 md:my-2 md:py-2 md:justify-center hover:bg-primary-regular dark:hover:text-white hover:text-white transition-colors duration-300 ease-in-out";
  const activeClassName = `${basicClassName} bg-primary-regular text-white`;
  const inactiveClassName = `${basicClassName} text-primary-regular dark:text-primary-light`;

  return (
    <div>
      {user ? (
        <div>
          <div className="flex flex-col md:flex-row">
            <NavLink
              to="/account/user"
              className={({ isActive }) =>
                isActive ? activeClassName : inactiveClassName
              }
            >
              <FaUser />
              Personal Data
            </NavLink>
            <NavLink
              to="/account/orders"
              className={({ isActive }) =>
                isActive ? activeClassName : inactiveClassName
              }
            >
              <FaCartArrowDown />
              Recent Orders
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/account/all-orders"
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
              >
                <FaCartPlus />
                All Orders
              </NavLink>
            )}
            {isAdmin && (
              <NavLink
                to="/account/add-product"
                className={({ isActive }) =>
                  isActive ? activeClassName : inactiveClassName
                }
              >
                <IoBagAdd />
                Add Product
              </NavLink>
            )}
          </div>

          <Outlet />
        </div>
      ) : (
        <LoadingNavLinks />
      )}
    </div>
  );
};

export default Account;
