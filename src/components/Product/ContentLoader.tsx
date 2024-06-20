const ContentLoader = () => {
  return (
    <span className="animate-pulse flex flex-col items-center">
      <div className="flex flex-col lg:flex-row lg:w-full justify-center items-center w-screen my-4">
        <div className="bg-slate-300 rounded-3xl w-72 h-96 sm:w-96" />
        <div className="grid grid-cols-2 w-80 sm:w-96 gap-4 lg:gap-8 place-items-center my-4 lg:ml-16">
          <div className="h-12 lg:h-6 w-32 sm:w-48 lg:80 bg-slate-300 rounded-lg lg:my-20" />
          <div className="h-12 lg:h-6 w-32 sm:w-48 lg:80 bg-slate-300 rounded-lg lg:my-20" />
          <div className="h-12 lg:h-6 w-32 sm:w-48 lg:80 bg-slate-300 rounded-lg lg:my-20" />
          <div className="h-12 lg:h-6 w-32 sm:w-48 lg:80 bg-slate-300 rounded-lg lg:my-20" />
        </div>
      </div>
      <div className="h-8 lg:h-16 w-24 lg:w-56 bg-slate-300 rounded-2xl my-4" />
      <div className="h-20 w-72 sm:w-[30rem] md:w-[35rem] lg:w-[40rem] bg-slate-300 rounded-2xl my-4" />
      <div className="h-8 w-36 bg-slate-300 rounded-2xl my-4" />
      <div className="flex flex-wrap gap-4 lg:gap-8 items-center justify-center lg:flex-nowrap w-64 lg:w-1/2 mb-4">
        <div className="bg-slate-300 h-10 w-36 rounded-2xl" />
        <div className="bg-slate-300 h-10 w-28 lg:w-36 rounded-2xl" />
        <div className="bg-slate-300 h-10 w-28 lg:w-36 rounded-2xl" />
      </div>
    </span>
  );
};

export default ContentLoader;
