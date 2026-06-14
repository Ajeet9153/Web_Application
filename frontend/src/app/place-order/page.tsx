"use client";

import { useContext, useState } from "react";
import "./place-order.css";
import { StoreContext } from "@/context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    token,
    url,
  } = useContext(StoreContext);

  const [couponCode, setCouponCode] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  const [finalAmount, setFinalAmount] =
    useState(0);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyCoupon = async () => {
    try {
      const response =
        await axios.post(
          `${url}/api/coupon/validate`,
          {
            code: couponCode,
            totalAmount:
              getTotalCartAmount() + 2,
          }
        );

      if (response.data.success) {
        setDiscount(
          response.data.discountAmount
        );

        setFinalAmount(
          response.data.finalAmount
        );

        toast.success(
          "Coupon Applied Successfully"
        );
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Invalid Coupon"
      );
    }
  };

  const placeOrder = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        {
          amount:
            finalAmount > 0
              ? finalAmount
              : getTotalCartAmount() === 0
              ? 0
              : getTotalCartAmount() + 2,

          couponCode,

          address: data,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success(
          "Order Placed Successfully"
        );

        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed To Place Order"
      );
    }
  };

  return (
    <form
      className="place-order"
      onSubmit={placeOrder}
    >
      <div className="place-order-left">
        <p className="title">
          🚚 Delivery Information
        </p>

        <div className="multi-fields">
          <input
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            type="text"
            placeholder="First Name"
            required
          />

          <input
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>

        <input
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          type="email"
          placeholder="Email Address"
          required
        />

        <input
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          type="text"
          placeholder="Street"
          required
        />

        <div className="multi-fields">
          <input
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            type="text"
            placeholder="City"
            required
          />

          <input
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            type="text"
            placeholder="State"
            required
          />
        </div>

        <div className="multi-fields">
          <input
            name="zipCode"
            value={data.zipCode}
            onChange={onChangeHandler}
            type="text"
            placeholder="Zip Code"
            required
          />

          <input
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            type="text"
            placeholder="Country"
            required
          />
        </div>

        <input
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          type="text"
          placeholder="Phone"
          required
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Order Summary</h2>

          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={couponCode}
              onChange={(e) =>
                setCouponCode(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "12px",
                border:
                  "1px solid #ddd",
                borderRadius: "8px",
                marginBottom:
                  "10px",
              }}
            />

            <button
              type="button"
              onClick={applyCoupon}
              style={{
                width: "100%",
                padding: "12px",
                background:
                  "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius:
                  "8px",
                cursor: "pointer",
              }}
            >
              Apply Coupon
            </button>
          </div>

          <div>
            <div className="card-total-details">
              <p>Subtotal</p>
              <p>
                ₹
                {getTotalCartAmount()}
              </p>
            </div>

            <hr />

            <div className="card-total-details">
              <p>Delivery Fee</p>
              <p>
                ₹
                {getTotalCartAmount() ===
                0
                  ? 0
                  : 2}
              </p>
            </div>

            {discount > 0 && (
              <>
                <hr />

                <div className="card-total-details">
                  <p>Discount</p>

                  <p
                    style={{
                      color:
                        "green",
                    }}
                  >
                    -₹{discount}
                  </p>
                </div>
              </>
            )}

            <hr />

            <div className="card-total-details">
              <b>Total</b>

              <b>
                ₹
                {finalAmount > 0
                  ? finalAmount
                  : getTotalCartAmount() ===
                    0
                  ? 0
                  : getTotalCartAmount() +
                    2}
              </b>
            </div>
          </div>

          <button type="submit">
            CASH ON DELIVERY
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;