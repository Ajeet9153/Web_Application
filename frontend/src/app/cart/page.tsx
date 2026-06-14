"use client";

import { useContext } from "react";
import "./cart.css";
import { StoreContext } from "@/context/StoreContext";
import { useRouter } from "next/navigation";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
  } = useContext(StoreContext);

  const router = useRouter();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item) => {
          if (cartItems[item.id] > 0) {
            return (
              <div key={item.id}>
                <div className="cart-items-title cart-items-item">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                  />

                  <p>{item.name}</p>

                  <p>₹{item.price}</p>

                  <p>{cartItems[item.id]}</p>

                  <p>
                    ₹{item.price * cartItems[item.id]}
                  </p>

                  <p
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="cross"
                  >
                    x
                  </p>
                </div>

                <hr />
              </div>
            );
          }

          return null;
        })}
      </div>

      <div className="cart-botton">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
            <div className="card-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="card-total-details">
              <p>Delivery Fee</p>

              <p>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : 2}
              </p>
            </div>

            <hr />

            <div className="card-total-details">
              <b>Total</b>

              <b>
                  ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>

          <button
            onClick={() =>
              router.push("/place-order")
            }
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>
              If you have promo code, Enter it
              here
            </p>

            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="promo code"
              />

              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;