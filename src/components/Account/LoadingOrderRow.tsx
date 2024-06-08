const LoaderItem = () => (
  <div className="animate-pulse border h-12 bg-gray-400"></div>
);
/**
 * `LoadingOrderRow` Component
 * Provides a visual representation of loading state for order rows, specifically for medium and larger screens.
 * It leverages the `LoaderItem` component to display individual loading bars.
 *
 * Features:
 * - Displays three `LoaderItem` components in a column format, each simulating the loading state of an order row.
 * - Intended for non-mobile views (`md:flex` and `hidden` classes control visibility based on screen size).
 * - Enhances user experience during data fetching by showing a predictable and smooth loading interface.
 */

const LoadingOrderRow = () => {
  return (
    <div className="md:flex flex-col mx-1 hidden">
      {Array.from({ length: 3 }).map((_, index) => (
        <LoaderItem key={index} />
      ))}
    </div>
  );
};

export default LoadingOrderRow;
