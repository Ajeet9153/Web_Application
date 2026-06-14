"use client";

import { useContext } from "react";
import "./ProductItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

interface ProductItemProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductItem = ({
  id,
  name,
  price,
  description,
  image,
}: ProductItemProps) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    url,
    token,
  } = useContext(StoreContext);

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please login first to add products to cart");
      return;
    }

    await addToCart(id);
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={`${url}/images/${image}`}
          alt={name}
        />

        {!cartItems[id] ? (
          <img
            className="add"
            onClick={handleAddToCart}
            src={assets.add_icon_white.src}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red.src}
              alt="Remove"
            />

            <p>{cartItems[id]}</p>

            <img
              onClick={handleAddToCart}
              src={assets.add_icon_green.src}
              alt="Add"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>

          <img
            src={assets.rating_starts.src}
            alt="Rating"
          />
        </div>

        <p className="food-item-desc">
          {description}
        </p>

        <p className="food-item-price">
          ₹{price}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;