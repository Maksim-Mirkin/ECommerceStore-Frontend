import { useEffect, useState } from "react";
import { CartItem as CartItemProps, Product } from "../../@types/types";
import { useShoppingCart } from "../../contexts";
import { ProductService } from "../../services";
import { CiCircleRemove } from "react-icons/ci";
import Quantity from "./Quantity";
import { useNavigate } from "react-router-dom";

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeItem, decreaseItemQuantity, increaseItemQuantity } =
    useShoppingCart();
  const [item, setItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const handleNavigationToProduct = () => {
    nav(`/products/${id}`);
  }

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
    <div className="flex flex-col justify-between items-center border border-black relative rounded-xl mx-4 lg:mr-4">
      <div className="flex flex-col lg:flex-row lg:justify-around lg:w-full items-center gap-2">
        <div className="flex flex-col lg:flex-row  hover:scale-105" onClick={handleNavigationToProduct}>
          <img src={item.image} alt={item.name} className="h-48 w-48" />
          <div className="flex flex-col items-center self-center text-center w-48">
            <h2>{item.name}</h2>
            <p>{item.category}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="lg:hidden">Quantity:</p>
          <Quantity
            quantity={quantity}
            decrease={handleDecrease}
            increase={handleIncrease}
          />
        </div>
        <div className="flex gap-2 w-16 justify-center">
          <p className="lg:hidden">Price:</p>
          <p>{item.price}</p>
        </div>
        <div className="flex gap-2 w-16 justify-center">
          <p className="lg:hidden">Subtotal:</p>
          <p>{(item.price * quantity).toFixed(2)}</p>
        </div>
      </div>
      <button onClick={() => removeItem(id)}>
        <CiCircleRemove className="text-red-500 h-8 w-8 absolute right-1 top-1 hover:scale-125 transition-all duration-300 ease-in-out" />
      </button>
    </div>
  );
};

export default CartItem;
