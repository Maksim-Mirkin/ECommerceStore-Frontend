import { Outlet, useLocation } from "react-router-dom";
import { CategoryLink } from "../components";
import { baseURL } from "../utils/config";

/**
 * Category Route
 * Displays category links as a navigation gateway to various product categories,
 * or renders nested routes depending on the path. This route acts as a central hub for 
 * accessing different categories of products like laptops, cellulars, TVs, and headphones.
 *
 * Features:
 * - Direct category links with images for a visually engaging navigation experience.
 * - Uses conditional rendering to display category links or delegate rendering to nested routes.
 * - Leverages React Router's `Outlet` to handle nested routes, facilitating detailed browsing within a selected category.
 */
const Category = () => {
  const location = useLocation();
  const isNestedRoute = location.pathname !== `${baseURL}category`;

  return (
    <>
      {!isNestedRoute ? (
        <div className="h-4/5 flex flex-col sm:grid grid-cols-2 place-items-center gap-y-12 md:mx-24 lg:mx-40 xl:mx-80 my-12">
          <CategoryLink
            to="laptop"
            src="../assets/laptop-image.png"
            alt="Laptop category image"
            label="Laptop"
            size="size-64"
          />
          <CategoryLink
            to="cellular"
            src="../assets/phone-image.png"
            alt="Cellulars category image"
            label="Cellulars"
            size="size-64"
          />
          <CategoryLink
            to="tv"
            src="../assets/tv-image.webp"
            alt="TV category image"
            label="TV"
            size="size-64"
          />
          <CategoryLink
            to="headphone"
            src="../assets/headphone-image.png"
            alt="Headphones category image"
            label="Headphones"
            size="size-64"
          />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Category;
