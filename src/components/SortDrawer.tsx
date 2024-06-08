import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { SortInput } from "../@types/types";

interface SortDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  onSortChange: (sortCriteria: string) => void;
  sortInputs: SortInput[];
}

const SortDrawer = ({
  isOpen,
  toggleDrawer,
  onSortChange,
  sortInputs,
}: SortDrawerProps) => {
  const [selectedSort, setSelectedSort] = useState("");

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedSort(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSortChange(selectedSort);
    toggleDrawer();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="bottom"
      className="bg-slate-100 dark:bg-slate-600 h-fit"
      lockBackgroundScroll
    >
      <form className="mx-1 flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="w-full flex justify-between items-center mt-2">
          <h2>Sort By</h2>
          <button onClick={toggleDrawer} type="button">
            <IoMdClose className="text-primary-regular dark:text-primary-light size-8 hover:scale-125 transition-scale duration-300 ease-in-out" />
          </button>
        </div>
        <hr className="w-full my-2 border-t border-black dark:border-white" />
        <div className="grid grid-cols-[repeat(2,1fr)] w-full gap-4">
          {sortInputs.map((option) => (
            <div key={option.id} className="flex justify-start items-center">
              <input
                type="radio"
                name="sortBy"
                id={option.id}
                value={option.id}
                className="w-fit mr-2 cursor-pointer"
                checked={selectedSort === option.id}
                onChange={handleSortChange}
                aria-pressed={selectedSort === option.id}
              />
              <label htmlFor={option.id} className="cursor-pointer">{option.label}</label>
            </div>
          ))}
        </div>
        <button className="action-button mt-4" type="submit">
          Show the results
        </button>
      </form>
    </Drawer>
  );
};

export default SortDrawer;
