import { useCallback, useEffect, useRef, useState } from "react";
import { FC } from "../../@types/types";
import { capitalizeFirstLetter } from "../../utils/formatUtils";

interface AccordionSectionProps {
  title: string;
}

const FilterSection: FC<AccordionSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const maxContentHeight =
    isOpen && contentRef.current ? `${contentRef.current.scrollHeight}px` : "0";

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const height = contentRef.current.scrollHeight;
      contentRef.current.style.maxHeight = `${height}px`;
    }
  }, [isOpen, children]);

  const toggleSection = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="mb-2 mx-3">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={toggleSection}
        className="w-full flex justify-between items-center px-4 py-2 bg-secondary-regular hover:bg-primary-regular text-white rounded-md"
      >
        {capitalizeFirstLetter(title)}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      <div
        ref={contentRef}
        className="transition-[max-height] duration-500 ease-in-out overflow-hidden"
        style={{ maxHeight: maxContentHeight }}
      >
        {children}
      </div>
    </div>
  );
};

export default FilterSection;
