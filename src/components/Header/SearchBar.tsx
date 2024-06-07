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
