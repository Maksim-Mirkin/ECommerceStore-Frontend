import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../@types/types";
import { ProductService } from "../services";
import { IoCartOutline } from "react-icons/io5";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Rating } from "@mui/material";
import { GridCell, AdminPanel, ContentLoader } from "../components/Product";
import { AuthContext } from "../contexts";
import { Dialogs } from "../ui/dialogs";
import { AccentText } from "../components";
import { useShoppingCart } from "../hooks";
import { baseURL } from "../utils/config";
/**
 * Product Route
 * Displays detailed information about a specific product, allowing users to view product details,
 * add items to the cart, and directly purchase products. Includes features like rating display,
 * dynamic quantity adjustments, and admin-specific functionalities.
 *
 * Utilizes React Router's useParams to retrieve the product ID from the URL and fetch product data
 * accordingly. Provides error handling and loading states to enhance user experience. Includes
 * quantity controls with maximum and minimum limits and integrates with the shopping cart system.
 *
 * Admin users have additional capabilities to manage product details directly from this page.
 */
const Product = () => {
  const { id } = useParams();
  const { isAdmin } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [isDecreaseDisabled, setIsDecreaseDisabled] = useState(false);
  const [isIncreaseDisabled, setIsIncreaseDisabled] = useState(false);

  const idNum = parseInt(id ?? "", 10);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const { increaseItemQuantity, getItemQuantity } = useShoppingCart();
  const [gridColumnsClass, setGridColumnsClass] =
    useState<string>("grid-cols-2");
  const nav = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const res = (await ProductService.fetchProduct(idNum)) as Product;

        setProduct(res);
        if (res?.category.toLowerCase() === "headphone") {
          setGridColumnsClass("grid-cols-1");
        }
      } catch (e) {
        if (
          e != null &&
          typeof e == "object" &&
          "message" in e &&
          typeof e["message"] == "string"
        )
          setError(e.message as string);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [idNum]);

  if (isNaN(idNum)) {
    throw new Error("Invalid product id");
  }

  useEffect(() => {
    setIsDecreaseDisabled(quantity <= 1);
    setIsIncreaseDisabled(quantity >= 5);
  }, [quantity]);

  const handleBuyNow = () => {
    if (getItemQuantity(idNum) < 5) {
      increaseItemQuantity(idNum);
    }
    nav(`${baseURL}cart`);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      if (getItemQuantity(idNum) < 5) {
        increaseItemQuantity(idNum);
      } else {
        Dialogs.warning("You can only add up to 5 items of the same product.");
      }
    }
    Dialogs.success(`${product?.name} added to cart!`);
  };

  return (
    <div className="flex flex-col items-center px-4">
      {loading ? (
        <ContentLoader/>
      ) : error ? (
        <p className="text-red-500 my-48 text-center text-lg sm:text-3xl">
          {error}
        </p>
      ) : (
        <>
          <h1 className="my-4">{product?.name}</h1>
          <div className="my-4 flex flex-col lg:flex-row lg:w-full justify-center gap-4">
            <div>
              <img
                src={product?.image}
                alt={product?.name}
                className="max-h-96 max-w-96 object-fit"
              />
            </div>
            <div className={`grid ${gridColumnsClass} gap-2 text-center`}>
              {product?.brand ? (
                <GridCell>
                  <AccentText>
                    Brand<span className="hidden lg:inline">:</span>
                  </AccentText>
                  <p>{product?.brand}</p>
                </GridCell>
              ) : null}
              {product?.color ? (
                <GridCell>
                  <AccentText>
                    Color<span className="hidden lg:inline">:</span>
                  </AccentText>
                  <p>{product?.color}</p>
                </GridCell>
              ) : null}
              {product?.memory ? (
                <GridCell>
                  <AccentText>
                    Memory<span className="hidden lg:inline">:</span>
                  </AccentText>
                  <p>{product?.memory}</p>
                </GridCell>
              ) : null}
              {product?.batteryCapacity ? (
                <GridCell>
                  <AccentText>
                    Battery capacity<span className="hidden lg:inline">:</span>
                  </AccentText>
                  <p>{product?.batteryCapacity}</p>
                </GridCell>
              ) : null}
              {product?.screenSize ? (
                <GridCell>
                  <AccentText>
                    Screen Size<span className="hidden lg:inline">:</span>
                  </AccentText>
                  <p>{product?.screenSize}</p>
                </GridCell>
              ) : null}
              {product?.operatingSystem ? (
                <GridCell>
                  <AccentText>
                    Operating System<span className="hidden lg:inline">:</span>
                  </AccentText>
                  <p>{product?.operatingSystem}</p>
                </GridCell>
              ) : null}
            </div>
          </div>
          <h2 className="my-4 lg:text-6xl">{product?.price}$</h2>
          <p className="my-4 text-center max-w-[40rem]">
            {product?.description}
          </p>
          <Rating
            value={parseFloat(product?.averageRating ?? "2.5")}
            precision={0.1}
            readOnly
            size="large"
          />
          <div className="flex flex-wrap gap-4 lg:gap-8 items-center justify-center lg:flex-nowrap lg:w-1/2 mb-4">
            <div className="flex items-center gap-2 h-8 my-4">
              <p>Quantity:</p>
              <div className="flex items-center border border-black rounded-md h-full bg-transparent">
                <button
                  className={`h-full rounded-l-md ${
                    isDecreaseDisabled ? "bg-slate-300 dark:bg-gray-400" : ""
                  }`}
                  onClick={() => {
                    setQuantity((prev) => Math.max(prev - 1, 1));
                  }}
                  disabled={isDecreaseDisabled}
                >
                  <IoIosRemove className="text-secondary-regular dark:text-secondary-light h-full rounded-l-md" />
                </button>
                <div className="w-8 text-center dark:text-white">
                  {quantity}
                </div>
                <button
                  className={`h-full rounded-r-md ${
                    isIncreaseDisabled ? "bg-slate-300 dark:bg-gray-400" : ""
                  }`}
                  onClick={() => {
                    setQuantity((prev) => Math.min(prev + 1, 5));
                  }}
                  disabled={isIncreaseDisabled}
                >
                  <IoIosAdd className="text-secondary-regular dark:text-secondary-light h-full rounded-r-md" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center w-full lg:w-[55%] gap-4">
              <button
                className="flex flex-1 text-center justify-around items-center border bg-amber-300 text-white size-10 rounded-xl max-w-40 hover-button"
                aria-label={`Add ${product?.name} to cart`}
                onClick={handleAddToCart}
              >
                <IoCartOutline className="size-8" />
                Add to cart
              </button>
              <button
                className="bg-green-600 text-white rounded-xl flex-1 h-10 max-w-40 hover-button"
                aria-label={`Buy ${product?.name} now`}
                onClick={handleBuyNow}
              >
                Buy now
              </button>
            </div>
          </div>
          {isAdmin && product && <AdminPanel product={product} />}
        </>
      )}
    </div>
  );
};

export default Product;
