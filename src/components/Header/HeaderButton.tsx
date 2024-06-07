import { FC } from "../../@types/types";

interface IHeaderButtonProps {
  id: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
  isHidden?: boolean;
  ref?: React.RefObject<HTMLButtonElement>;
}

const HeaderButton: FC<IHeaderButtonProps> = ({
  id,
  onClick,
  ariaLabel,
  isHidden,
  ref,
  children,
}) => {
  const buttonIsHidden = isHidden ? "sm:hidden" : "";
  return (
    <button
      id={id}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`${buttonIsHidden} cursor-pointer transition-all duration-300 ease-in-out hover:scale-125 relative`}
      ref={ref}
    >
      {children}
    </button>
  );
};

export default HeaderButton;
