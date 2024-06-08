import { FC } from "../../@types/types";

/**
 * GridCell Component
 * A flexible grid cell container that centers its children.
 *
 * Props:
 * - children: The content to be displayed within the grid cell.
 *
 * Features:
 * - Centers the content both vertically and horizontally.
 */
const GridCell: FC = ({ children }) => {
  return (
    <div className="gap-2 p-2 lg:flex justify-center items-center ">
      {children}
    </div>
  );
};

export default GridCell;
