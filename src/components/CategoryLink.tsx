import { Link } from "react-router-dom";
import CategoryImage from "./CategoryImage";


interface CategoryLinkProps {
  to: string;
  src: string;
  alt: string;
  label?: string;
  size?: string;
}

const CategoryLink: React.FC<CategoryLinkProps> = ({
  to,
  src,
  alt,
  label,
  size,
}) => (
  <Link
    to={to}
    className="flex flex-col items-center gap-10"
    aria-label={`Category: ${to}`}
  >
    <CategoryImage size={size} src={src} alt={alt} />
    <h1>{label}</h1>
  </Link>
);

export default CategoryLink;
