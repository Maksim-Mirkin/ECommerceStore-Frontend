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
