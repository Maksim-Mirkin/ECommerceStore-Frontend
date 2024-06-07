import { Product } from "../@types/types";
import Card from "./Card";
import { IoCartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../contexts";

const ProductItem = ({ id, name, price, image, averageRating }: Product) => {
  const nav = useNavigate();
  const { increaseItemQuantity } = useShoppingCart();
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    increaseItemQuantity(id);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    handleAddToCart(e);
    nav("/cart");
  };
  return (
    <Card onClick={() => nav(`/products/${id}`)}>
      <img src={image} alt={name} className="h-80 max-w-48 object-contain" />
      <h3 className="mb-4 text-center">{name}</h3>
      <div className="flex justify-between gap-4 items-center mx-2 mb-4 w-72">
        <h3>{price}$</h3>
        <div className="flex items-center gap-2 ">
          <FaStar className="text-orange-200" />
          <p>{parseFloat(averageRating).toFixed(2)}</p>
        </div>
        <div className="flex justify-between w-36">
          <button
            className="flex justify-between items-center border bg-amber-300 text-white size-10 rounded-xl hover-button active:bg-amber-400"
            aria-label={`Add ${name} to cart`}
            onClick={handleAddToCart}
          >
            <IoCartOutline className="size-11/12" />
          </button>
          <button
            className="bg-green-600 text-white rounded-2xl w-20 hover-button active:bg-green-700"
            aria-label={`Buy ${name} now`}
            onClick={handleBuyNow}
          >
            Buy now
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
