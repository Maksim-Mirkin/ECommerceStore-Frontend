import { FC } from "../@types/types"

/**
 * AccentText Component
 * Renders its children with accent text color styling for both light and dark modes.
 *
 * Props:
 * - children (React.ReactNode): The content to be displayed with accent text color.
 *
 * Features:
 * - Applies accent color styling using Tailwind CSS classes for light and dark modes.
 */
const AccentText:FC = ({children}) => {
  return (
    <span className="text-accent-regular dark:text-accent-light">
        {children}
    </span>
  )
}

export default AccentText