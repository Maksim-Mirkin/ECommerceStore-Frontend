interface CategoryLinkProps {
  src: string;
  size? : string;
  alt: string;
}

const CategoryImage = ({ src, size,alt }: CategoryLinkProps) => {
  return (
    <div className={`${size} border border-primary-regular dark:border-white rounded-3xl sm:rounded-[4rem] shadow-2xl shadow-primary-regular dark:shadow-secondary-light hover:scale-110 sm:hover:scale-125 hover:bg-slate-300 hover:dark:bg-slate-500 transition-all duration-300 ease-in-out`}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default CategoryImage;
