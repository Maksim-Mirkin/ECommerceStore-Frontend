import { Link } from "react-router-dom";
import IconBox from "./IconBox";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Header = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <header className="bg-primary-regular text-white flex flex-row justify-between items-center">
      {isVisible ? (
        <>
          <Link to="/" aria-label="Home">
            <Logo />
          </Link>
          <SearchBar
            display="hidden sm:flex"
            height="h-12"
            width="w-[32rem]"
            rounded="rounded-3xl"
          />
          <IconBox
            onClick={toggleVisibility}
          />
        </>
      ) : (
        <SearchBar
          display="flex"
          height="h-16"
          width="w-full"
          onClick={toggleVisibility}
        />
      )}
    </header>
  );
};

export default Header;
