import { FC } from "../../@types/types";

const GridCell: FC = ({ children }) => {
  return (
    <div className="gap-2 p-2 lg:flex justify-center items-center ">
      {children}
    </div>
  );
};

export default GridCell;
