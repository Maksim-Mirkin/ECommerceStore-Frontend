import { FaSort } from "react-icons/fa";
import MenuButton from "../MenuButton";
import SortMenu from "../SortMenu";
import { sortInputs } from ".";

interface SortButtonProps {
  toggleSortDrawer: () => void;
  handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  anchorMenuEl: null | HTMLElement;
  open: boolean;
  handleMenuClose: () => void;
  handleSortChange: (sortOption: string) => void;
}

const SortButton = ({
  toggleSortDrawer,
  handleMenuOpen,
  anchorMenuEl,
  open,
  handleMenuClose,
  handleSortChange,
}: SortButtonProps) => {
  return (
    <div className="sm:absolute top-2 right-4 self-center">
      <MenuButton
        onClick={toggleSortDrawer}
        display="md:hidden flex"
        ariaLabel="Sort by"
      >
        <p>Sort by</p>
        <FaSort className="text-primary-regular dark:text-primary-light" />
      </MenuButton>
      <MenuButton
        onClick={handleMenuOpen}
        display="hidden md:flex"
        ariaLabel="Sort by"
      >
        <p>Sort by</p>
        <FaSort className="text-primary-regular dark:text-primary-light" />
        <SortMenu
          anchorEl={anchorMenuEl}
          open={open}
          onClose={handleMenuClose}
          onSortChange={handleSortChange}
          sortInputs={sortInputs}
        />
      </MenuButton>
    </div>
  );
};

export default SortButton;
