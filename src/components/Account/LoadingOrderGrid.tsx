const LoaderItem = () => (
  <div className="animate-pulse border bg-gray-400 h-[19rem] flex flex-col justify-between">
    {Array.from({ length: 10 }).map((_, index) => (
        <hr key={index} />
      ))}
  </div>
);

/**
 * `LoadingOrderGrid` Component
 * Displays a grid of loading placeholder elements specifically designed for representing order data in a loading state.
 * This component is intended for mobile views as indicated by the `md:hidden` class, which hides it on wider screens.
 *
 * Features:
 * - The component uses `LoaderItem` to display individual loading placeholders.
 * - Each `LoaderItem` simulates the layout of an order item with horizontal lines (using `<hr>`) to represent different parts of an order.
 * - This component enhances the user experience by providing a consistent and recognizable loading state, making the interface feel more responsive and engaging.
 */
const LoadingOrderGrid = () => {
  return (
    <div className="md:hidden flex flex-col justify-center gap-4 my-4 mx-1">
      {Array.from({ length: 3 }).map((_, index) => (
        <LoaderItem key={index} />
      ))}
    </div>
  );
};

export default LoadingOrderGrid;
