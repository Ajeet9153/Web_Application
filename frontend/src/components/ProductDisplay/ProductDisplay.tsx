"use client";

import { useContext } from "react";
import "./ProductDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import ProductItem from "../ProductItem/ProductItem";

interface ProductDisplayProps {
  category: string;
}

const ProductDisplay = ({ category }: ProductDisplayProps) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>

      <div className="food-display-list">
        {food_list
          .filter(
            (item) =>
              category === "All" || category === item.category
          )
          .map((item, index) => (
            <ProductItem
              key={item.id || index}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductDisplay;