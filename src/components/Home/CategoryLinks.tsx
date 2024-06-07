import CategoryLink from "../CategoryLink";

const CategoryLinks = () => {
  return (
    <div className="grid grid-cols-2 gap-12 my-8 xl:w-full xl:flex xl:gap-0 xl:justify-around">
      <CategoryLink
        to="/category/laptop"
        src="../assets/laptop-image.png"
        alt="Laptop category image"
        size="size-28 sm:size-64"
      />
      <CategoryLink
        to="/category/cellular"
        src="../assets/phone-image.png"
        alt="Cellulars category image"
        size="size-28 sm:size-64"
      />
      <CategoryLink
        to="/category/tv"
        src="../assets/tv-image.webp"
        alt="TV category image"
        size="size-28 sm:size-64"
      />
      <CategoryLink
        to="/category/headphone"
        src="../assets/headphone-image.png"
        alt="Headphones category image"
        size="size-28 sm:size-64"
      />
    </div>
  );
};

export default CategoryLinks;
