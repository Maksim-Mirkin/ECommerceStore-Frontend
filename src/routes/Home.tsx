import { useEffect, useState } from "react";
import { ProductPage } from "../@types/types";
import { ProductService } from "../services/product-service";
import { useNavigate } from "react-router-dom";
import {
  CategoryLinks,
  ProductLoader,
  ProductList,
  ProductSlider,
} from "../components/Home";

/**
 * Home Route
 * Displays the homepage of the E-commerce website, featuring a welcome message, category links,
 * and a showcase of best-selling products. It also provides a dynamic exploration button that
 * directs authenticated users to the category page and others to the registration page.
 *
 * Key Features:
 * - Fetches and displays best-selling products based on ratings.
 * - Utilizes ProductLoader during data fetching and handles errors with visual feedback.
 * - Offers both a list and a slider view for showcasing products.
 * - Encourages navigation and exploration of product categories with a conditional routing button.
 */
const Home = () => {
  const [productList, setProductList] = useState<ProductPage>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const explore = () => {
    const token = localStorage.getItem("token");
    nav(token ? "/category" : "/register");
  };

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const res =
          (await ProductService.fetchProductsByRating()) as ProductPage;
        setProductList(res);
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

    asyncFunction();
  }, []);

  return (
    <div className="flex flex-col items-center justify-around mx-8 text-center">
      <h1 className="my-4">
        Welcome to the <br className="sm:hidden" />
        E-commerce website!
      </h1>
      <CategoryLinks />
      <div>
        <div className="flex flex-col items-center">
          <h1 className="my-8 text-3xl">Best sellers</h1>
          {error && <h2 className="error">{error}</h2>}
          {loading && <ProductLoader />}
          {!error && !loading && (
            <>
              <ProductList products={productList?.products ?? []} />
              <ProductSlider products={productList?.products ?? []} />
            </>
          )}
        </div>
      </div>
      <h2 className="mt-24 text-xl sm:text-2xl">
        Step into E-commerce's world of new discoveries! Explore our latest
        products and find your next favorite.
      </h2>
      <button className="action-button w-36 h-12 my-8" onClick={explore}>
        Explore
      </button>
    </div>
  );
};

export default Home;
