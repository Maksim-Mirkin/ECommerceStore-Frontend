import { FC } from "../@types/types";

interface MenuButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  display: string;
  ariaLabel: string;
}

/**
 * MenuButton Component
 * Renders a button with customizable display properties, click handling, and accessibility label.
 *
 * Props:
 * - onClick (function): Handler for click events.
 * - display (string): CSS classes controlling the display properties of the button.
 * - ariaLabel (string): Accessibility label for the button.
 * - children (React.ReactNode): Elements to be rendered inside the button.
 */
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
