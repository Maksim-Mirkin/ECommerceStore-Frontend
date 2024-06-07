const LoaderItem = () => (
  <div className="animate-pulse border bg-gray-400 h-[19rem] flex flex-col justify-between">
    {Array.from({ length: 10 }).map((_, index) => (
        <hr key={index} />
      ))}
  </div>
);

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
