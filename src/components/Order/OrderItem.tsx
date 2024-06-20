import { useEffect, useState } from "react";
import { CartItem, Product } from "../../@types/types";
import { ProductService } from "../../services";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/config";
import LoadingItem from "./LoadingItem";

/**
 * OrderItem Component
 * This component displays a cart item in an order. It fetches the product details using the provided product ID
 * and displays the product's image, name, and quantity. Clicking on the component navigates the user to the product's page.
 *
 * Props:
 * - id: The ID of the product in the cart.
 * - quantity: The quantity of the product in the cart.
 *
 * State:
 * - item: The fetched product details, including id, name, price, image, etc.
 * - loading: A boolean indicating whether the product details are being fetched.
 * - error: An optional string containing any error message encountered during fetching.
 *
 * Effects:
 * - Fetches the product details when the component mounts or when the product ID changes.
 *
 * Functions:
 * - handleNavigationToProduct: Navigates the user to the product's page using the product ID.
 * 
 * @component
 * @example
 * const cartItem = {
 *   id: 1,
 *   quantity: 2
 * };
 * return <OrderItem id={cartItem.id} quantity={cartItem.quantity} />;
 */

const OrderItem = ({ id, quantity }: CartItem) => {
  const [item, setItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const nav = useNavigate();
  const handleNavigationToProduct = () => {
    nav(`${baseURL}products/${id}`);
  };
  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const fetchedItem = await ProductService.fetchProduct(id);
        setItem(fetchedItem);
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

    fetchItem();
  }, [id]);
  if (loading) {
    return <LoadingItem/>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (item === null) {
    return null;
  }

  return (
    <div
      className="flex items-center w-fit hover:scale-105"
      onClick={handleNavigationToProduct}
    >
      <img
        src={item.image}
        alt={item.name}
        className="h-40 w-40 object-scale-down"
      />
      <div className="w-40 sm:w-fit">
        <h2>{item.name}</h2>
        <p>Quantity: {quantity}</p>
      </div>
    </div>
  );
};

export default OrderItem;
