/**
 * ContentLoader Component
 * Renders a set of placeholder items to indicate loading state.
 *
 * Features:
 * - Displays multiple animated placeholder items with specified dimensions and styles.
 * - Uses Tailwind CSS classes for styling and animation.
 */
const ContentLoader = () => {
  const LoaderItem = () => (
    <div className="w-64 h-96 sm:w-80 sm:h-[26.25rem] bg-gray-300 rounded-3xl animate-pulse" />
  );

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 py-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <LoaderItem key={index} />
      ))}
    </div>
  );
};

export default ContentLoader;
