const LoaderItem = () => (
  <div className="animate-pulse border h-12 bg-gray-400"></div>
);
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
