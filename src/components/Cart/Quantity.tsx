import { useEffect, useState } from "react";
import { IoIosRemove, IoIosAdd } from "react-icons/io";

interface QuantityProps {
  quantity: number;
  decrease: () => void;
  increase: () => void;
}

/**
 * Quantity Component
 * This component renders a quantity control with buttons to increase or decrease the quantity.
 *
 * Props:
 * - `quantity`: The current quantity value.
 * - `decrease`: Function to decrease the quantity.
 * - `increase`: Function to increase the quantity.
 *
 * Features:
 * - The component tracks the quantity state and disables the decrease button when the quantity is 1 and the increase button when the quantity is 5.
 * - Uses React Icons `IoIosRemove` and `IoIosAdd` for the decrease and increase buttons respectively.
 * - Provides hover effects and transitions for a smooth user experience.
 *
 * Accessibility:
 * - Each button has an `aria-label` attribute describing its action.
 * - The decrease button is disabled when the quantity is 1 to prevent negative quantity values.
 * - The increase button is disabled when the quantity is 5 to limit the maximum quantity.
 */
const Quantity = ({
  quantity,
  decrease,
  increase,
}: QuantityProps) => {
  const [isDecreaseDisabled, setIsDecreaseDisabled] = useState(false);
  const [isIncreaseDisabled, setIsIncreaseDisabled] = useState(false);
  useEffect(() => {
    setIsDecreaseDisabled(quantity <= 1);
    setIsIncreaseDisabled(quantity >= 5);
  }, [quantity]);
  return (
    <div className="flex items-center border border-black rounded-md bg-transparent w-16">
      <button
        className={`h-full py-2 rounded-l-md hover:bg-transparent/10 transition-all duration-300 ease-in-out ${
          isDecreaseDisabled
            ? "bg-slate-300 dark:bg-gray-400 hover:bg-slate-300/100 dark:hover:bg-slate-400/100"
            : ""
        }`}
        onClick={decrease}
        disabled={isDecreaseDisabled}
      >
        <IoIosRemove className="text-secondary-regular dark:text-secondary-light h-full" />
      </button>
      <div className="w-8 text-center dark:text-white">{quantity}</div>
      <button
        className={`h-full py-2 rounded-r-md hover:bg-transparent/10 transition-all duration-300 ease-in-out ${
          isIncreaseDisabled
            ? "bg-slate-300 dark:bg-gray-400 hover:bg-slate-300/100 dark:hover:bg-slate-400/100"
            : ""
        }`}
        onClick={increase}
        disabled={isIncreaseDisabled}
      >
        <IoIosAdd className="text-secondary-regular dark:text-secondary-light h-full" />
      </button>
    </div>
  );
};

export default Quantity;
