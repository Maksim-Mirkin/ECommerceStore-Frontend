import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { Order, OrderPage, OrderSortByType } from "../../@types/types";
import { OrderService } from "../../services";
import LoadingOrderGrid from "./LoadingOrderGrid";
import LoadingOrderRow from "./LoadingOrderRow";
import OrderHeader from "./OrderHeader";
import OrderGrid from "./OrderGrid";
import OrderRow from "./OrderRow";
import SortButton from "./SortButton";
import PaginationController from "./PaginationController";
import { splitSortingCriteria } from "../../utils/formatUtils";
import { sortInputs } from ".";
import { SortDrawer } from "..";
import { baseURL } from "../../utils/config";

/**
 * `AllOrders` Component
 * Serves as an admin interface for viewing and managing all customer orders within the system.
 * This component provides functionality to navigate through orders, sort them, and access detailed views for each order.
 * It leverages the AuthContext to ensure that only users with admin privileges can access this administrative view.
 * Additionally, it includes pagination controls, a sorting mechanism through a sort drawer, and error handling.
 * The component also dynamically loads order data and displays them in both grid and row formats depending on the viewing preference.
 *
 * Features:
 * - Conditional rendering based on user permissions, allowing only admins to view the content.
 * - Dynamic order fetching based on current page and sorting criteria, which updates via effects when these parameters change.
 * - Integration of pagination to navigate through pages of orders and sorting options to customize the order display.
 * - Utilization of a sort drawer for a more interactive and user-friendly sorting experience.
 * - Responsive design that adjusts to different screen sizes and orientations, enhancing the user experience across devices.
 * - Error handling to manage and display errors effectively when fetching data fails.
 */

const AllOrders = () => {
  const { isAdmin } = useContext(AuthContext);
  const [orders, setOrders] = useState<OrderPage>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("");
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorMenuEl);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorMenuEl(event.currentTarget);
  };

  useEffect(() => {
    const handleClickAway = (event: globalThis.MouseEvent) => {
      if (anchorMenuEl && !anchorMenuEl.contains(event.target as Node)) {
        setAnchorMenuEl(null);
      }
    };

    document.addEventListener("click", handleClickAway);
    return () => {
      document.removeEventListener("click", handleClickAway);
    };
  }, [anchorMenuEl, open]);

  const handleMenuClose = () => {
    setAnchorMenuEl(null);
  };
  const toggleSortDrawer = () => {
    setIsSortDrawerOpen((prev) => !prev);
  };
  const handleSortChange = (criteria: string) => {
    setSortCriteria(criteria);
  };
  const nav = useNavigate();

  const navToOrder = (id: string, order: Order) => {
    nav(`${baseURL}orders/${id}`, { state: { specificOrder: order } });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const [sortKey, sortOrder] = splitSortingCriteria(sortCriteria);
      const sortByProperty = sortKey as OrderSortByType;
      const sortDirection = sortOrder as "asc" | "desc";
      try {
        setLoading(true);
        setError(undefined);
        const res = (await OrderService.fetchAllOrders({
          pageNumber: currentPage,
          sortBy: sortByProperty,
          sortDir: sortDirection,
        })) as OrderPage;
        setOrders(res);
        setTotalPages(res.totalPages);
      } catch (e) {
        if (
          e != null &&
          typeof e == "object" &&
          "message" in e &&
          typeof e["message"] == "string"
        ) {
          setError(e.message as string);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentPage, sortCriteria]);

  return (
    <div className="relative flex flex-col">
      <h2 className="text-center my-4">All Orders</h2>
      <SortButton
        toggleSortDrawer={toggleSortDrawer}
        handleMenuOpen={handleMenuOpen}
        anchorMenuEl={anchorMenuEl}
        open={open}
        handleMenuClose={handleMenuClose}
        handleSortChange={handleSortChange}
      />
      {loading && (
        <>
          <LoadingOrderGrid />
          <LoadingOrderRow />
        </>
      )}
      {error && <h2 className="error">{error}</h2>}
      {isAdmin ? (
        orders ? (
          <div>
            <OrderHeader />
            <OrderGrid orders={orders} navigateToOrder={navToOrder} />
            <OrderRow orders={orders} navigateToOrder={navToOrder} />
            <PaginationController
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        ) : (
          <h1 className="m-auto">There are no orders yet!</h1>
        )
      ) : (
        !error && !loading && <h1 className="error">Access Denied</h1>
      )}
      <SortDrawer
        isOpen={isSortDrawerOpen}
        toggleDrawer={toggleSortDrawer}
        onSortChange={handleSortChange}
        sortInputs={sortInputs}
      />
    </div>
  );
};

export default AllOrders;
