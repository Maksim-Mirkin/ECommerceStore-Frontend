import { Product } from "../../@types/types";
import ProductItem from "../ProductItem";
import style from "./ProductList.module.scss";

interface ProductListProps {
  products: Product[] | undefined;
}

/**
 * ProductList Component
 * This component displays a list of products in a grid layout.
 *
 * Props:
 * - products (Product[] | undefined): An array of product objects to be displayed. Each product object contains details like id, name, price, etc.
 *
 * Components Used:
 * - ProductItem: Represents an individual product in the list.
 *
 * The grid layout styling is applied using the 'ProductList.module.scss' styles.
 */

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
