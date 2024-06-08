import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import HeaderButton from "./HeaderButton";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  display: string;
  height: string;
  width: string;
  rounded?: string;
  onClick?: () => void;
}

/**
 * SearchBar Component
 * This component renders a search bar for searching products by name.
 *
 * Props:
 * - display: string - CSS class for controlling the display of the search bar.
 * - height: string - CSS class for setting the height of the search bar.
 * - width: string - CSS class for setting the width of the search bar.
 * - rounded: string (optional) - CSS class for setting the border radius of the search bar.
 * - onClick: function (optional) - Function to be called when the close button is clicked.
 *
 * State:
 * - search: string - The current value of the search input field.
 *
 * The component includes an input field for entering the search query and two buttons:
 * - A search button with a search icon, which submits the search query.
 * - A close button with a close icon, which triggers the onClick function passed as a prop.
 *
 * The handleSearch function handles form submission, navigates to the search results page,
 * and resets the search input field.
 */

const SearchBar = ({
  display,
  height,
  width,
  rounded = "",
  onClick,
}: SearchBarProps) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    if (search === "") return;
    navigate(`/category/search?name=${search}`);
    if (onClick) onClick();
    setSearch("");
  };

  return (
    <form
      id="search-form"
      className={`${display} font-body flex items-center justify-between py-4 px-2 gap-2.5 isolate bg-secondary-regular ${rounded} ${width} ${height}`}
      onSubmit={handleSearch}
    >
      <input
        id="search"
        name="search"
        type="search"
        placeholder="Search product by name..."
        className="bg-transparent w-full h-full text-white placeholder-white focus:outline-none border-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search product by name"
      />
      <HeaderButton id="search-button" ariaLabel="Search button">
        <FaSearch className="h-6 w-6" />
      </HeaderButton>
      <HeaderButton
        id="close-button"
        ariaLabel="Close search"
        isHidden={true}
        onClick={onClick}
      >
        <IoMdClose className="h-10 w-10" />
      </HeaderButton>
    </form>
  );
};

export default SearchBar;
