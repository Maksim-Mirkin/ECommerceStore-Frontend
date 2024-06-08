const LoadingItem = () => (
  <div className="w-[13.125rem] lg:w-[16.75rem] xl:w-96 h-10 animate-pulse rounded-md bg-gray-300 flex justify-end items-center text-white pr-4">
    ▼
  </div>
);

/**
 * FilterDrawerLoading Component
 * Renders a loading state for the FilterDrawer by displaying multiple animated placeholder items.
 *
 * Features:
 * - Displays a set of placeholder items with animation to indicate loading.
 * - Utilizes Tailwind CSS for styling and animation.
 */
const FilterDrawerLoading = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <LoadingItem key={index} />
      ))}
    </div>
  );
};

export default FilterDrawerLoading;
