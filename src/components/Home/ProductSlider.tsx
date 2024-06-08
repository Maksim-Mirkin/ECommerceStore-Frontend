import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Product } from "../../@types/types";
import ProductItem from "../ProductItem";

interface ProductSliderProps {
  products: Product[] | undefined;
}

/**
 * ProductSlider Component
 * This component displays a slider of products using the Swiper library.
 *
 * Props:
 * - products (Product[] | undefined): An array of products to be displayed in the slider.
 *
 * Swiper Configuration:
 * - slidesPerView: 1 (initially displays 1 slide per view)
 * - spaceBetween: 10 (space between slides)
 * - centeredSlides: true (centers the active slide)
 * - loop: true (enables continuous loop mode)
 * - pagination: { clickable: true } (enables clickable pagination)
 * - modules: [Navigation, Pagination] (enables navigation and pagination modules)
 * - className: "mySwiper w-[96vw] home:hidden" (custom class name for styling)
 *
 * Breakpoints:
 * - 640px:
 *   - slidesPerView: 2 (displays 2 slides per view)
 *   - centeredSlides: false (disables centered slides)
 * - 950px:
 *   - slidesPerView: 3 (displays 3 slides per view)
 *   - centeredSlides: false (disables centered slides)
 *
 * SwiperSlide Configuration:
 * - key: product.id (unique key for each slide)
 * - className: "hover:bg-slate-300 hover:rounded-3xl flex justify-center" (custom class name for styling)
 */

const ProductSlider = ({ products }: ProductSliderProps) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      centeredSlides
      loop
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className="mySwiper w-[96vw] home:hidden"
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
          centeredSlides: false,
        },
        950: {
          slidesPerView: 3,
          spaceBetween: 10,
          centeredSlides: false,
        },
      }}
    >
      {products?.map((product) => (
        <SwiperSlide
          key={product.id}
          className="hover:bg-slate-300 hover:rounded-3xl flex justify-center"
        >
          <ProductItem {...product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
