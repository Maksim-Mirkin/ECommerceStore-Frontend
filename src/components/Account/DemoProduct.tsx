import { IoCartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import Card from "../Card";


type DemoProductProps = {
  name: string;
  price: number | string;
  image: string;
  averageRating: number;
};

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
