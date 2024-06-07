import { useEffect, useState } from "react";
import { CartItem, Product } from "../../@types/types";
import { ProductService } from "../../services";
import { useNavigate } from "react-router-dom";

const OrderItem = ({ id, quantity }: CartItem) => {
  const [item, setItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const nav = useNavigate();
  const handleNavigationToProduct = () => {
    nav(`/products/${id}`);
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
    return <div>Loading...</div>;
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
      <div className="w-40">
        <h2>{item.name}</h2>
        <p>Quantity: {quantity}</p>
      </div>
    </div>
  );
};

export default OrderItem;
