import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginationControllerProps {
  handlePrevPage: () => void;
  handleNextPage: () => void;
  currentPage: number;
  totalPages: number;
}

/**
 * `PaginationController` Component
 * Provides a simple UI for navigating through paginated data, offering "Previous" and "Next" navigation options.
 *
 * Features:
 * - Displays current page number and total pages, offering a clear indication of the pagination status.
 * - Provides previous and next buttons to navigate between pages.
 * - The previous button is disabled on the first page, and the next button is disabled on the last page, preventing out-of-bound navigation.
 * - Utilizes Font Awesome icons for visually intuitive navigation controls.
 * - Includes hover effects and transitions for better UI interaction feedback.
 * - Applies conditional styling for disabled states to enhance user experience by indicating unavailable navigation options.
 */

const PaginationController = ({
  handlePrevPage,
  handleNextPage,
  currentPage,
  totalPages,
}: PaginationControllerProps) => {
  const arrowCss =
    "size-10 text-primary-regular dark:text-primary-light hover:text-primary-light dark:hover:text-primary-regular transition-colors duration-300 ease-in-out";
  return (
    <div className="flex items-center justify-between w-64 mx-auto my-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 0}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaAngleLeft className={arrowCss} />
      </button>
      <h2 className="text-primary-regular dark:text-primary-light">
        {currentPage + 1} / {totalPages}
      </h2>
      <button
        onClick={handleNextPage}
        disabled={currentPage >= totalPages - 1}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaAngleRight className={arrowCss} />
      </button>
    </div>
  );
};

export default PaginationController;
