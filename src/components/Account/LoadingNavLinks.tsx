import  { useContext } from "react";
import { AuthContext } from "../../contexts";
const LoaderItem = () => (
  <div className="animate-pulse bg-gray-400 dark:bg-slate-200 border flex gap-2 items-center h-12 px-2 md:flex-1 md:border md:rounded-lg md:mx-2 md:my-2 md:py-2 md:justify-center" />
);

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
