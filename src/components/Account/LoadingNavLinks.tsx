import  { useContext } from "react";
import { AuthContext } from "../../contexts";
const LoaderItem = () => (
  <div className="animate-pulse bg-gray-400 dark:bg-slate-200 border flex gap-2 items-center h-12 px-2 md:flex-1 md:border md:rounded-lg md:mx-2 md:my-2 md:py-2 md:justify-center" />
);

/**
 * `LoadingNavLinks` Component
 * This component is used as a placeholder during data fetching processes to indicate that navigation links are being loaded.
 * It dynamically adjusts the number of loaders displayed based on the user's authorization level, 
 * showing more loaders for administrative users.
 *
 * Features:
 * - Utilizes the `LoaderItem` component to display individual animated loaders.
 * - Adjusts the number of loaders based on whether the user is an administrator or a regular user.
 * - Uses context (`AuthContext`) to determine the user's role and adjusts UI accordingly.
 * - This component helps improve the user experience by providing visual feedback during asynchronous operations.
 */

const LoadingNavLinks = () => {
  const { isAdmin } = useContext(AuthContext);
  const length = isAdmin ? 4 : 2;
  return (
    <div className="flex flex-col md:flex-row">
      {Array.from({ length: length }).map((_, index) => (
        <LoaderItem key={index} />
      ))}
    </div>
  );
};

export default LoadingNavLinks;
