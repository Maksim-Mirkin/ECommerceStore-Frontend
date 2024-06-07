import { SortInput } from "../../@types/types";
import ContentLoader from "./ContentLoader";
import FilterDrawer from "./FilterDrawer";
import FilterDrawerLoading from "./FilterDrawerLoading";
import FilterSection from "./FilterSection";
import PriceRangeInputs from "./PriceRangeInputs";

const sortInputs: SortInput[] = [
  { id: "price_asc", label: "Price: low to high" },
  { id: "price_desc", label: "Price: high to low" },
  { id: "name_asc", label: "Name: A to Z" },
  { id: "name_desc", label: "Name: Z to A" },
  { id: "ratings_desc", label: "Rating: high to low" },
];
export {
  FilterDrawer,
  FilterSection,
  PriceRangeInputs,
  FilterDrawerLoading,
  ContentLoader,
  sortInputs,
};
