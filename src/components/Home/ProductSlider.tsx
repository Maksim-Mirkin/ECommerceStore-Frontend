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
