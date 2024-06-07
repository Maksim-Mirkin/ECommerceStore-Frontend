import { FaUser } from "react-icons/fa";
import { isImageURL } from "../utils/utils";

interface AvatarProps {
  image: string;
}

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
