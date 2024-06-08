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

/**
 * `SortButton` Component
 * Provides an interface for users to open sort options for lists or grids of items. It supports both a drawer for smaller screens and a dropdown menu for larger screens.
 *
 * Features:
 * - Uses `MenuButton` for toggling the sort interface with an icon and text, enhancing the UI for both mobile and desktop views.
 * - On smaller screens, it toggles a drawer component to select sort criteria.
 * - On larger screens, it opens a dropdown menu (`SortMenu`) directly above the button to display available sorting options.
 * - Integrates with `FaSort` icon from Font Awesome to visually indicate sorting functionality.
 * - Handles opening and closing of sort interfaces through props, allowing for controlled component behavior.
 * - Supports dynamic sorting by accepting sort options from a parent component and executing a callback when a sort option is selected.
 * - Manages its own visibility and interaction state, making it versatile for various layout designs.
 */

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
