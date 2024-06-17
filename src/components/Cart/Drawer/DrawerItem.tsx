import { useEffect, useState } from "react";
import { CartItem, Product } from "../../../@types/types";

import { ProductService } from "../../../services";
import { CiCircleRemove } from "react-icons/ci";
import Quantity from "../Quantity";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../../hooks";
import { baseURL } from "../../../utils/config";

/**
 * DrawerItem component displays a product in the shopping cart drawer.
 * It includes functionality to navigate to the product detail page,
 * and to increase, decrease, or remove a product from the cart.
 *
 * @param id The unique identifier for the product
 * @param quantity The quantity of the product in the cart
 */
const DrawerItem = ({ id, quantity }: CartItem) => {
  const { removeItem, decreaseItemQuantity, increaseItemQuantity } =
    useShoppingCart();
  const [item, setItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const handleNavigationToProduct = () => {
    nav(`${baseURL}products/${id}`);
  };

  const handleDecrease = () => {
    decreaseItemQuantity(id);
  };
  const handleIncrease = () => {
    increaseItemQuantity(id);
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const fetchedItem = await ProductService.fetchProduct(id);
        setItem(fetchedItem);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (item === null) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between items-center border relative border-black rounded-xl mx-4">
      <div className="flex flex-col items-center gap-2 ">
        <div
          className="flex flex-col  hover:scale-105 hover:mb-2"
          onClick={handleNavigationToProduct}
        >
          <img src={item.image} alt={item.name} className="h-48 w-48" />
          <div className="flex flex-col items-center self-center text-center w-48">
            <h2>{item.name}</h2>
            <p>{item.category}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p>Quantity:</p>
          <Quantity
            quantity={quantity}
            decrease={handleDecrease}
            increase={handleIncrease}
          />
        </div>
        <div className="flex gap-2 w-16 justify-center">
          <p>Price:</p>
          <p>{item.price}</p>
        </div>
        <div className="flex gap-2 w-16 justify-center">
          <p>Subtotal:</p>
          <p>{(item.price * quantity).toFixed(2)}</p>
        </div>
      </div>
      <button onClick={() => removeItem(id)}>
        <CiCircleRemove className="text-red-500 h-8 w-8 absolute right-1 top-1 hover:scale-125 transition-all duration-300 ease-in-out" />
      </button>
    </div>
  );
};

export default DrawerItem;
