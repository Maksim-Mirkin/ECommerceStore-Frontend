const ProductLoader = () => {
  const LoaderItem = ({ className }: { className: string }) => (
    <div className={`w-64 h-96 sm:w-80 sm:h-[26.25rem] rounded-3xl animate-pulse ${className}`} />
  );

  return (
    <>
      <div className="hidden home:grid grid-cols-[repeat(9,_88.67px)] gap-2 md:gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <LoaderItem key={index} className={index % 2 === 0 ? "bg-gray-300" : "bg-gray-400"} />
        ))}
      </div>
      <div className="home:hidden flex justify-center items-center gap-2 md:gap-16">
        <LoaderItem className="bg-gray-300" />
        <LoaderItem className="bg-gray-300 hidden sm:block" />
      </div>
    </>
  );
};

export default ProductLoader;
