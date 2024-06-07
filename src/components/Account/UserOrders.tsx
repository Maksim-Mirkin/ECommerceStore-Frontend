import { useEffect, useState } from "react";
import { Order, OrderPage, OrderSortByType } from "../../@types/types";
import { OrderService } from "../../services";
import OrderGrid from "./OrderGrid";
import OrderRow from "./OrderRow";
import { useNavigate } from "react-router-dom";
import LoadingOrderGrid from "./LoadingOrderGrid";
import LoadingOrderRow from "./LoadingOrderRow";
import OrderHeader from "./OrderHeader";
import { SortDrawer } from "..";
import { sortInputs, SortButton, PaginationController } from ".";
import { splitSortingCriteria } from "../../utils/formatUtils";

const UserOrders = () => {
  const [orders, setOrders] = useState<OrderPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("");
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorMenuEl);

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

  useEffect(() => {
    const fetchOrders = async () => {
      const [sortKey, sortOrder] = splitSortingCriteria(sortCriteria);
      const sortByProperty = sortKey as OrderSortByType;
      const sortDirection = sortOrder as "asc" | "desc";
      try {
        setLoading(true);
        setError(null);
        const res = (await OrderService.fetchCustomerOrders({
          pageNumber: currentPage,
          sortBy: sortByProperty,
          sortDir: sortDirection,
        })) as OrderPage;
        setOrders(res);
        setTotalPages(res.totalPages);
      } catch (e) {
        if (
          e != null &&
          typeof e === "object" &&
          "message" in e &&
          typeof e["message"] === "string"
        ) {
          setError(e.message as string);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentPage, sortCriteria]);

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

  const navToOrder = (id: string, order: Order) => {
    nav(`/orders/${id}`, { state: { specificOrder: order } });
  };

  return (
    <div className="relative flex flex-col">
      <h2 className="text-center my-4">Recent Orders</h2>
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
      {orders ? (
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
        !loading &&
        !error && <h1 className="m-auto">There are no orders yet!</h1>
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

export default UserOrders;
