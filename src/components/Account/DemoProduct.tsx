import { IoCartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import Card from "../Card";


type DemoProductProps = {
  name: string;
  price: number | string;
  image: string;
  averageRating: number;
};

/**
 * `DemoProduct` Component
 * A component for displaying a product in a card format with interactive elements.
 * This component is typically used to show a product preview in various parts of an application,
 * especially in scenarios where products need to be showcased or highlighted.
 *
 * Features:
 * - Displays the product image, name, and price prominently.
 * - Shows the average rating of the product using star icons.
 * - Includes buttons for adding the product to the shopping cart and for immediate purchase.
 * - Utilizes the `Card` component to standardize the appearance across different parts of the application.
 * - The component is designed to be static and does not handle any interactive functionality directly,
 *   making it suitable for demonstration purposes or static displays in user interfaces.
 */

const DemoProduct = ({
  name,
  price,
  image,
  averageRating,
}: DemoProductProps) => {
  return (
    <Card onClick={() => {}}>
      <img src={image} alt={name} className="h-80 max-w-48 object-scale-down" />
      <h3 className="mb-4 text-center">{name}</h3>
      <div className="flex justify-between gap-4 items-center mx-2 mb-4">
        <h3>{price}$</h3>
        <div className="flex items-center gap-2 ">
          <FaStar className="text-orange-200" />
          <p>{averageRating}</p>
        </div>
        <div className="flex justify-between w-36">
          <button
            className="flex justify-between items-center border bg-amber-300 text-white size-10 rounded-xl"
            aria-label={`Add ${name} to cart`}
          >
            <IoCartOutline className="size-11/12" />
          </button>
          <button
            className="bg-green-600 text-white rounded-2xl w-24"
            aria-label={`Buy ${name} now`}
          >
            Buy now
          </button>
        </div>
      </div>
    </Card>
  );
};

export default DemoProduct;
