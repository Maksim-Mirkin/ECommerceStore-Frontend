import { Slider } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { preventSymbols } from "../../utils/inputUtils";

interface PriceRangeInputsProps {
  prices: number[];
  sliderValue: number[];
  onSliderChange: (newValue: number[]) => void;
  onSubmit: () => void;
}

/**
 * PriceRangeInputs Component
 * Renders a set of input fields and a slider for selecting a price range.
 *
 * Props:
 * - prices (number[]): An array containing the minimum and maximum prices.
 * - sliderValue (number[]): The current values of the slider.
 * - onSliderChange (function): Function to handle changes to the slider values.
 * - onSubmit (function): Function to handle the submission of the selected price range.
 *
 * Features:
 * - Displays input fields for setting minimum and maximum prices with validation.
 * - Provides a slider to visually select the price range.
 * - Prevents invalid characters in the input fields.
 * - Applies the selected price range through a filter button.
 */
const PriceRangeInputs = ({
  prices,
  sliderValue,
  onSliderChange,
  onSubmit,
}: PriceRangeInputsProps) => {
  const [minPrice, maxPrice] = useMemo(() => {
    if (prices.length === 0) return [0, 1000];
    return [prices[0], prices[1]];
  }, [prices]);

  const [minInputValue, setMinInputValue] = useState<string>(
    minPrice.toString()
  );
  const [maxInputValue, setMaxInputValue] = useState<string>(
    maxPrice.toString()
  );

  useEffect(() => {
    setMinInputValue(minPrice.toString());
    setMaxInputValue(maxPrice.toString());
  }, [minPrice, maxPrice]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isMin: boolean
  ) => {
    const value = event.target.value;
    if (isMin) {
      setMinInputValue(value);
    } else {
      setMaxInputValue(value);
    }
  };

  const handleInputBlur = (isMin: boolean) => {
    let minValue = parseInt(minInputValue, 10);
    let maxValue = parseInt(maxInputValue, 10);

    if (isNaN(minValue) || isNaN(maxValue)) return;

    if (minValue < minPrice) minValue = minPrice;
    if (maxValue > maxPrice) maxValue = maxPrice;

    if (minValue > maxValue) {
      if (isMin) {
        minValue = maxValue;
        setMinInputValue(minValue.toString());
      } else {
        maxValue = minValue;
        setMaxInputValue(maxValue.toString());
      }
    }

    if (isMin) {
      setMinInputValue(minValue.toString());
      onSliderChange([minValue, Math.max(sliderValue[1], minValue)]);
    } else {
      setMaxInputValue(maxValue.toString());
      onSliderChange([Math.min(sliderValue[0], maxValue), maxValue]);
    }
  };

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const [newMin, newMax] = newValue as number[];
    setMinInputValue(newMin.toString());
    setMaxInputValue(newMax.toString());
    onSliderChange([newMin, newMax]);
  };

  const sliderValueText = (value: number) => `${value}$`;

  const onSubmitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="mx-6 flex flex-col items-center">
      <div className="flex justify-between items-center my-4 w-full">
        <div className="flex flex-col items-center gap-2 flex-1">
          <label htmlFor="minPrice">From</label>
          <input
            type="number"
            min={minPrice}
            max={maxPrice}
            value={minInputValue}
            onChange={(e) => handleInputChange(e, true)}
            onBlur={() => handleInputBlur(true)}
            onKeyDown={preventSymbols}
            className="w-3/4 rounded-md shadow-md shadow-primary-regular dark:shadow-secondary-light"
            id="minPrice"
          />
        </div>
        <p className="mx-2 mt-8">-</p>
        <div className="flex flex-col items-center gap-2 flex-1">
          <label htmlFor="maxPrice">To</label>
          <input
            type="number"
            min={minPrice}
            max={maxPrice}
            value={maxInputValue}
            onChange={(e) => handleInputChange(e, false)}
            onBlur={() => handleInputBlur(false)}
            onKeyDown={preventSymbols}
            className="w-3/4 rounded-md shadow-md shadow-primary-regular dark:shadow-secondary-light"
            id="maxPrice"
          />
        </div>
      </div>
      <Slider
        getAriaLabel={() => "Price range"}
        value={sliderValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        getAriaValueText={sliderValueText}
        min={minPrice}
        max={maxPrice}
      />
      <button
        className="action-button mt-2"
        onClick={onSubmitClick}
        aria-label="Apply filtering by price"
      >
        Filter By Price
      </button>
    </div>
  );
};

export default PriceRangeInputs;
