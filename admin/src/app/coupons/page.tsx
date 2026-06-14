"use client";

import { useState } from "react";
import axios from "axios";

export default function CouponsPage() {
  const [coupon, setCoupon] =
    useState({
      code: "",
      discount: "",
      minOrder: "",
      expiry: "",
    });

  const backendUrl =
    "http://localhost:4000";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCoupon({
      ...coupon,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response =
        await axios.post(
          `${backendUrl}/api/coupon/create`,
          {
            code: coupon.code,
            discount:
              Number(
                coupon.discount
              ),
            minOrder:
              Number(
                coupon.minOrder
              ),
            expiryDate:
              coupon.expiry,
          }
        );

      if (
        response.data.success
      ) {
        alert(
          "Coupon Created Successfully"
        );

        setCoupon({
          code: "",
          discount: "",
          minOrder: "",
          expiry: "",
        });
      }
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data
          ?.message ||
          "Failed To Create Coupon"
      );
    }
  };

  return (
    <div className="add">
      <h2>Coupon Manager</h2>

      <form
        className="flex-col"
        onSubmit={handleSubmit}
      >
        <div className="add-product-name flex-col">
          <p>Coupon Code</p>

          <input
            type="text"
            name="code"
            placeholder="SAVE20"
            value={coupon.code}
            onChange={
              handleChange
            }
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Discount (%)</p>

          <input
            type="number"
            name="discount"
            placeholder="20"
            value={
              coupon.discount
            }
            onChange={
              handleChange
            }
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>
            Minimum Order Amount
          </p>

          <input
            type="number"
            name="minOrder"
            placeholder="1000"
            value={
              coupon.minOrder
            }
            onChange={
              handleChange
            }
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Expiry Date</p>

          <input
            type="date"
            name="expiry"
            value={
              coupon.expiry
            }
            onChange={
              handleChange
            }
            required
          />
        </div>

        <button
          type="submit"
          className="add-btn"
        >
          Create Coupon
        </button>
      </form>
    </div>
  );
}