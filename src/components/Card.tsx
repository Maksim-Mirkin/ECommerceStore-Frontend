import { FC } from "../@types/types";

interface CardProps {
  onClick: () => void;
}

const Card: FC<CardProps> = (props) => {
  return (
    <div onClick={props.onClick} className="bg-slate-100 hover:bg-slate-300 hover:dark:bg-slate-500 dark:bg-slate-700 w-fit border-primary-regular dark:border-white border text-slate-600 text-xl shadow-lg shadow-primary-regular rounded-3xl dark:shadow-secondary-light cursor-pointer flex flex-col items-center">
      {props.children}
    </div>
  );
};

export default Card;
