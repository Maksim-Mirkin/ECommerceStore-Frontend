import { Product } from "../../@types/types";
import ProductItem from "../ProductItem";
import style from "./ProductList.module.scss";

interface ProductListProps {
  products: Product[] | undefined;
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className={`${style["products"]} hidden home:grid`}>
      {products?.map((product) => (
        <span key={product.id} className={`${style["product"]}`}>
          <ProductItem {...product} />
        </span>
      ))}
    </div>
  );
};

export default ProductList;
