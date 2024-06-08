import { useEffect, useState, useCallback } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Product, ProductParams, SortByType } from "../@types/types";
import { ProductService } from "../services";
import {
  capitalizeFirstLetter,
  splitSortingCriteria,
} from "../utils/formatUtils";
import { FaFilter, FaSort } from "react-icons/fa";
import {
  FilterDrawer,
  ContentLoader,
  sortInputs,
} from "../components/Products";
import { ProductItem, SortDrawer, SortMenu, MenuButton } from "../components";

const getDefaultFilterCriteria = (
  lastPath: string,
  name: string | null
): ProductParams => ({
  name: name || "",
  brand: [],
  minPrice: 0,
  maxPrice: 10000,
  color: [],
  memory: [],
  screenSize: [],
  batteryCapacity: [],
  operatingSystem: [],
  category: lastPath === "search" ? [""] : [lastPath],
});

/**
 * Products Route
 * Displays a list of products with infinite scrolling, sorting, and filtering functionalities.
 *
 * Implements an infinite scroll mechanism to load products as the user scrolls, enhancing performance
 * and user experience on large datasets. Users can sort and filter products based on various criteria,
 * including price, category, and more.
 *
 * Uses React Router's `useLocation` to determine the current path for category-based filtering and
 * `useSearchParams` for URL-based state management. Error handling and state updates are managed within
 * the component to maintain a responsive and interactive user interface.
 */
const Products = () => {
  const location = useLocation();
  const path = location.pathname;
  const lastPath = path.substring(path.lastIndexOf("/") + 1);
  const [searchParam] = useSearchParams();
  const name = searchParam.get("name");

  const [productList, setProductList] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState<ProductParams>(
    getDefaultFilterCriteria(lastPath, name)
  );

  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorMenuEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorMenuEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorMenuEl(null);
  };

  const toggleFilterDrawer = () => {
    setIsFilterDrawerOpen((prev) => !prev);
  };

  const handleSortChange = (criteria: string) => {
    setSortCriteria(criteria);
  };

  const toggleSortDrawer = () => {
    setIsSortDrawerOpen((prev) => !prev);
  };

  const handleUpdateFilterCriteria = (updatedFilterCriteria: ProductParams) => {
    setFilterCriteria(updatedFilterCriteria);
  };

  const handleError = (e: unknown) => {
    if (e instanceof Error) {
      setError(e.message);
    }
    setHasMore(false);
  };

  const fetchProducts = useCallback(
    async (
      page: number,
      filterCriteria: ProductParams,
      sortCriteria: string,
      isInitialLoad = false
    ) => {
      const [sortKey, sortOrder] = splitSortingCriteria(sortCriteria);
      const sortByProperty = sortKey as SortByType;
      const sortDirection = sortOrder as "asc" | "desc";
      try {
        const res = await ProductService.fetchProducts({
          ...(lastPath === "search"
            ? { name: name || "" }
            : { category: [lastPath] }),
          pageNumber: page,
          brand: filterCriteria.brand,
          minPrice: filterCriteria.minPrice,
          maxPrice: filterCriteria.maxPrice,
          color: filterCriteria.color,
          memory: filterCriteria.memory,
          screenSize: filterCriteria.screenSize,
          batteryCapacity: filterCriteria.batteryCapacity,
          operatingSystem: filterCriteria.operatingSystem,
          sortBy: sortByProperty,
          sortDir: sortDirection,
        });

        setProductList((prevProducts) =>
          isInitialLoad ? res.products : [...prevProducts, ...res.products]
        );
        setTotalPages(res.totalPages);
        setHasMore(!res.isLast);
      } catch (e) {
        handleError(e);
      }
    },
    [lastPath, name]
  );

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (anchorMenuEl && !anchorMenuEl.contains(event.target as Node)) {
        setAnchorMenuEl(null);
      }
    };
    document.addEventListener("click", handleClickAway);
    return () => {
      document.removeEventListener("click", handleClickAway);
    };
  }, [anchorMenuEl, open]);

  useEffect(() => {
    fetchProducts(0, filterCriteria, sortCriteria, true);
  }, [fetchProducts, filterCriteria, sortCriteria, lastPath, name]);

  useEffect(() => {
    setFilterCriteria(getDefaultFilterCriteria(lastPath, name));
    setPageNumber(0);
    setProductList([]);
    setTotalPages(1);
    setHasMore(true);
  }, [lastPath, name]);

  const fetchMoreData = () => {
    if (pageNumber < totalPages - 1) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      fetchProducts(pageNumber + 1, filterCriteria, sortCriteria);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="my-8 mx-4 flex flex-col items-center">
      <div className="mt-4 mb-1 w-full flex justify-between">
        <h1>
          {lastPath === "tv"
            ? lastPath.toUpperCase()
            : capitalizeFirstLetter(lastPath)}
        </h1>
        <div className="flex gap-1">
          <MenuButton
            onClick={toggleSortDrawer}
            display="md:hidden flex"
            ariaLabel="Sort by"
          >
            <p>Sort by</p>
            <FaSort className="text-primary-regular dark:text-primary-light" />
          </MenuButton>
          <MenuButton
            onClick={handleMenuOpen}
            display="hidden md:flex"
            ariaLabel="Sort by"
          >
            <p>Sort by</p>
            <FaSort className="text-primary-regular dark:text-primary-light" />
            <SortMenu
              anchorEl={anchorMenuEl}
              open={open}
              onClose={handleMenuClose}
              onSortChange={handleSortChange}
              sortInputs={sortInputs}
            />
          </MenuButton>
          <MenuButton
            onClick={toggleFilterDrawer}
            ariaLabel="Filter by"
            display="flex"
          >
            <FaFilter className="text-primary-regular dark:text-primary-light" />
          </MenuButton>
        </div>
      </div>
      <hr className="w-full mt-2 mb-4 border-t border-black dark:border-white" />
      <InfiniteScroll
        dataLength={productList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<ContentLoader />}
      >
        <div className="flex justify-center mb-8">
          <div className="flex flex-[3] flex-wrap justify-center items-center gap-8">
            {productList.length === 0 ? (
              <p className="text-center mt-8">There are no products</p>
            ) : (
              productList.map((product) => (
                <ProductItem key={product.id} {...product} />
              ))
            )}
          </div>
        </div>
      </InfiniteScroll>
      {error && <p className="text-red-500">{error}</p>}
      <SortDrawer
        isOpen={isSortDrawerOpen}
        toggleDrawer={toggleSortDrawer}
        onSortChange={handleSortChange}
        sortInputs={sortInputs}
      />
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        toggleDrawer={toggleFilterDrawer}
        filterCriteria={filterCriteria}
        updateFilterCriteria={handleUpdateFilterCriteria}
        lastPath={lastPath}
      />
    </div>
  );
};

export default Products;
