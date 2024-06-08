import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { SortInput } from "../@types/types";

interface SortMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  onSortChange: (sortCriteria: string) => void;
  sortInputs: SortInput[];
}

/**
 * SortMenu Component
 * Renders a menu for selecting sorting criteria, utilizing Material-UI's Menu and MenuItem components.
 *
 * Props:
 * - anchorEl (HTMLElement | null): The element to which the menu is anchored.
 * - open (boolean): Controls whether the menu is open or closed.
 * - onClose (function): Callback function to handle closing the menu.
 * - onSortChange (function): Callback function to handle changes in the sorting criteria.
 * - sortInputs (SortInput[]): An array of sorting options, each with an id and label.
 *
 * Features:
 * - Displays sorting options as buttons within a Material-UI Menu.
 * - Allows users to select a sorting option, updating the state and invoking the onSortChange callback.
 * - Handles form submission to apply the selected sorting criteria and close the menu.
 */
const SortMenu = ({
  anchorEl,
  open,
  onClose,
  onSortChange,
  sortInputs,
}: SortMenuProps) => {
  const [selectedSort, setSelectedSort] = useState("");
  const handleSortChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    setSelectedSort(value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSortChange(selectedSort);
    onClose();
  };
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{
        ".dark & .MuiMenu-list": { backgroundColor: "rgb(71 85 105)" },
        "& .MuiMenu-list": { backgroundColor: "rgb(241 245 249)" },
      }}
    >
      <form onSubmit={handleSubmit}>
        {sortInputs.map((option) => (
          <MenuItem
            key={option.label}
            className="flex justify-start items-center"
          >
            <button
              name="sortBy"
              value={option.id}
              className="w-fit mr-2"
              onClick={handleSortChange}
            >
              <p>{option.label}</p>
            </button>
          </MenuItem>
        ))}
      </form>
    </Menu>
  );
};

export default SortMenu;
