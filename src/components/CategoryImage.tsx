import { baseURL } from "../utils/config";

interface CategoryLinkProps {
  src: string;
  size? : string;
  alt: string;
}

/**
 * CategoryImage Component
 * Renders an image for a category with specified styling, including border, shadow, and hover effects.
 *
 * Props:
 * - src (string): The source URL of the category image.
 * - size (string, optional): TailwindCSS size property(size-x).
 * - alt (string): The alt text for the category image.
 *
 * Features:
 * - Applies styles for borders, shadows, and hover effects to enhance visual appearance.
 * - Uses a div container to apply size and styling, and an img element to display the image.
 */

const CategoryImage = ({ src, size,alt }: CategoryLinkProps) => {
  return (
    <div className={`${size} border border-primary-regular dark:border-white rounded-3xl sm:rounded-[4rem] shadow-2xl shadow-primary-regular dark:shadow-secondary-light hover:scale-110 sm:hover:scale-125 hover:bg-slate-300 hover:dark:bg-slate-500 transition-all duration-300 ease-in-out`}>
      <img src={`${baseURL}/${src}`} alt={alt} />
    </div>
  );
};

export default CategoryImage;
