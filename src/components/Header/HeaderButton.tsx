import { FC } from "../../@types/types";

interface IHeaderButtonProps {
  id: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
  isHidden?: boolean;
  ref?: React.RefObject<HTMLButtonElement>;
}

/**
 * HeaderButton Component
 * This component renders a button used in the header of the application. The button can be customized with various props.
 *
 * Props:
 * - id: A unique identifier for the button.
 * - onClick: An optional function that handles the button's click event.
 * - ariaLabel: A string that provides an accessible label for the button.
 * - isHidden: An optional boolean that determines if the button should be hidden on small screens.
 * - ref: An optional reference to the button element.
 * - children: The content or elements to be displayed inside the button.
 *
 * Styling:
 * - The button has a cursor pointer style and a transition effect for scaling when hovered.
 * - The button can be hidden on small screens if the isHidden prop is true.
 *
 * Accessibility:
 * - aria-label: Provides an accessible label for the button.
 */

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
