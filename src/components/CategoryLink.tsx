import { Link } from "react-router-dom";
import CategoryImage from "./CategoryImage";
import { baseURL } from "../utils/config";


interface CategoryLinkProps {
  to: string;
  src: string;
  alt: string;
  label?: string;
  size?: string;
}

/**
 * CategoryLink Component
 * Renders a link to a category page, displaying an image and an optional label.
 *
 * Props:
 * - to (string): The path to navigate to when the link is clicked.
 * - src (string): The source URL of the category image.
 * - alt (string): The alt text for the category image.
 * - label (string, optional): The label to display below the category image.
 * - size (string, optional): TailwindCSS size property(size-x).
 *
 * Features:
 * - Uses React Router's Link component for navigation.
 * - Displays a CategoryImage component with the provided source, alt text, and size.
 * - Displays a label below the image if provided.
 * - Adds ARIA labels for accessibility.
 */

const CategoryLink: React.FC<CategoryLinkProps> = ({
  to,
  src,
  alt,
  label,
  size,
}) => (
  <Link
    to={`${baseURL}category/${to}`}
    className="flex flex-col items-center gap-10"
    aria-label={`Category: ${to}`}
  >
    <CategoryImage size={size} src={src} alt={alt} />
    <h1>{label}</h1>
  </Link>
);

export default CategoryLink;
