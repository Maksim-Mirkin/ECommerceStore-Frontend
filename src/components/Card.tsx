import { FC } from "../@types/types";

interface CardProps {
  onClick: () => void;
}

/**
 * Card Component
 * Renders a clickable card container with styling and hover effects.
 *
 * Props:
 * - onClick (function): Function to handle click events on the card.
 * - children (React.ReactNode): The content to be displayed inside the card.
 *
 * Features:
 * - Applies background, border, shadow, and text styles for light and dark modes.
 * - Adds hover effects to enhance user interaction.
 * - Makes the card a clickable element, triggering the onClick function when clicked.
 */

const Card: FC<CardProps> = (props) => {
  return (
    <div onClick={props.onClick} className="bg-slate-100 hover:bg-slate-300 hover:dark:bg-slate-500 dark:bg-slate-700 w-fit border-primary-regular dark:border-white border text-slate-600 text-xl shadow-lg shadow-primary-regular rounded-3xl dark:shadow-secondary-light cursor-pointer flex flex-col items-center">
      {props.children}
    </div>
  );
};

export default Card;
