import { FaUser } from "react-icons/fa";
import { isImageURL } from "../utils/utils";

interface AvatarProps {
  image: string;
}

/**
 * Avatar Component
 * Renders a user avatar image if a valid image URL is provided, otherwise displays a default user icon.
 *
 * Props:
 * - image (string): The URL of the user avatar image.
 *
 * Features:
 * - Uses the isImageURL utility function to check if the provided image URL is valid.
 * - Displays the avatar image if the URL is valid.
 * - Displays a default user icon if the URL is not valid.
 * - Applies styling classes for size and appearance.
 */

const Avatar = ({ image }: AvatarProps) => {
  return isImageURL(image) ? (
    <img
      src={image}
      alt="User Avatar"
      className="size-48 sm:size-80 rounded-full mx-auto my-4"
    />
  ) : (
    <FaUser className="size-48 sm:size-80 rounded-full mx-auto my-4 text-primary-regular dark:text-primary-light" />
  );
};

export default Avatar;
