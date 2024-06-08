import { ChangeEvent, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { ProductFilterOption, ProductParams } from "../../@types/types";
import { FilterService } from "../../services/filter-service";
import { FilterDrawerLoading, FilterSection, PriceRangeInputs } from ".";
import { decapitalizeFirstLetter } from "../../utils/formatUtils";

interface FilterDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  lastPath: string;
  filterCriteria: ProductParams;
  updateFilterCriteria: (filterCriteria: ProductParams) => void;
}

/**
 * FilterDrawer Component
 * Renders a drawer containing various product filters, including price range and other attributes.
 * Utilizes react-modern-drawer for drawer functionality and integrates with a filter service to fetch filter options.
 *
 * Props:
 * - isOpen (boolean): Indicates whether the drawer is open.
 * - toggleDrawer (function): Function to toggle the drawer's open state.
 * - lastPath (string): The last path in the URL, used to determine the category for filtering.
 * - filterCriteria (ProductParams): The current filter criteria.
 * - updateFilterCriteria (function): Function to update the filter criteria.
 *
 * Features:
 * - Fetches filter options from the FilterService based on the current category and filter criteria.
 * - Renders filter sections for various product attributes (e.g., brand, color, memory, etc.).
 * - Provides a price range slider for filtering products by price.
 * - Handles changes to filter criteria and updates the state accordingly.
 * - Displays loading and error states while fetching filter options.
 */

const FilterDrawer = ({
  isOpen,
  toggleDrawer,
  lastPath,
  filterCriteria,
  updateFilterCriteria,
}: FilterDrawerProps) => {
  const [productFilterOption, setProductFilterOption] =
    useState<ProductFilterOption>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState<number[]>([0, 100]);

  const stringToPropName = (str: string) => {
    str = decapitalizeFirstLetter(str).replace(" ", "");
    return `${str}` as keyof ProductParams;
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value, name } = event.target;
    const propName = stringToPropName(name);
    const currentValues = filterCriteria[propName] as string[];

    const updatedValues = checked
      ? [...currentValues, value]
      : currentValues.filter((item) => item !== value);

    updateFilterCriteria({ ...filterCriteria, [propName]: updatedValues });
  };

  useEffect(() => {
    if (!isOpen) return;

    const fetchFilterOptions = async () => {
      const filterOptions = {
        name: filterCriteria.name,
        brand: filterCriteria.brand,
        color: filterCriteria.color,
        memory: filterCriteria.memory,
        screenSize: filterCriteria.screenSize,
        batteryCapacity: filterCriteria.batteryCapacity,
        operatingSystem: filterCriteria.operatingSystem,
      };
      try {
        setLoading(true);
        setError(undefined);
        const res = await FilterService.fetchProductFilterOption({
          category: [lastPath === "search" ? "" : lastPath],
          ...filterOptions,
        });
        setProductFilterOption(res);
        if (res.prices && res.prices.length) {
          setSliderValue([res.prices[0], res.prices[1]]);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, [isOpen, lastPath, filterCriteria]);

  const handleSliderChange = (newValue: number[]) => {
    setSliderValue(newValue);
  };

  const handlePriceRangeSubmit = () => {
    updateFilterCriteria({
      ...filterCriteria,
      minPrice: sliderValue[0],
      maxPrice: sliderValue[1],
    });
  };

  const renderFilterSection = (title: string, options?: string[]) => {
    if (!options || options.length === 0 || options[0] === null) return null;

    const filterValue = stringToPropName(title);
    const filterCriteriaArray = filterCriteria[filterValue] as string[];

    return (
      <FilterSection key={title} title={title}>
        {options.map(
          (option) =>
            option && (
              <div className="flex cursor-pointer" key={option}>
                <input
                  type="checkbox"
                  className="w-auto ml-2"
                  value={option}
                  name={title}
                  id={option}
                  onChange={handleCheckboxChange}
                  checked={filterCriteriaArray.includes(option)}
                />
                <label htmlFor={option} className="pl-2 py-2">
                  {option}
                </label>
              </div>
            )
        )}
      </FilterSection>
    );
  };

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="right"
      lockBackgroundScroll
      className="bg-slate-100 dark:bg-slate-600 min-w-[30vw] overflow-auto"
    >
      <form className="px-2">
        <div className="w-full flex justify-between items-center mt-2">
          <h2>Filter by</h2>
          <button onClick={toggleDrawer} type="button">
            <IoMdClose className="text-primary-regular dark:text-primary-light size-8 hover:bg-slate-400/50 hover:rounded-full" />
          </button>
        </div>
        <hr className="w-full my-2 border-t border-black dark:border-white" />
        {productFilterOption && (
          <>
            <FilterSection title="Price">
              <PriceRangeInputs
                prices={productFilterOption.prices || []}
                sliderValue={sliderValue}
                onSliderChange={handleSliderChange}
                onSubmit={handlePriceRangeSubmit}
              />
            </FilterSection>
            {loading && <FilterDrawerLoading />}
            {error && <p className="error">Error: {error}</p>}
            <div className="mt-2">
              {!loading && !error && (
                <>
                  {renderFilterSection("Brand", productFilterOption.brands)}
                  {renderFilterSection("Color", productFilterOption.colors)}
                  {renderFilterSection("Memory", productFilterOption.memories)}
                  {renderFilterSection(
                    "Screen Size",
                    productFilterOption.screenSizes
                  )}
                  {renderFilterSection(
                    "Battery Capacity",
                    productFilterOption.batteryCapacities
                  )}
                  {renderFilterSection(
                    "Operating System",
                    productFilterOption.operatingSystems
                  )}
                  {lastPath === "search" &&
                    renderFilterSection(
                      "Category",
                      productFilterOption.categories
                    )}
                </>
              )}
            </div>
          </>
        )}
      </form>
    </Drawer>
  );
};

export default FilterDrawer;