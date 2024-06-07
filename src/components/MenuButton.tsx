import { FC } from "../@types/types";

interface MenuButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  display: string;
  ariaLabel: string;
}
const MenuButton: FC<MenuButtonProps> = ({
  children,
  onClick,
  display,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-primary-regular dark:border-primary-light rounded-md  items-center gap-1 p-2 transition-colors duration-300 ease-in-out hover:bg-primary-regular/10 dark:hover:bg-primary-regular/80 ${display}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default MenuButton;
