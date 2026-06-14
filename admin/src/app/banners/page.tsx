"use client";

import { useState } from "react";

export default function BannersPage() {
  const [banner, setBanner] =
    useState({
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
      active: true,
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setBanner({
      ...banner,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    console.log(banner);

    alert(
      "Banner Saved Successfully"
    );
  };

  return (
    <div className="add">
      <h2>Banner Manager</h2>

      <form
        className="flex-col"
        onSubmit={handleSubmit}
      >
        <div className="add-product-name flex-col">
          <p>Banner Image</p>

          <input
            type="file"
            accept="image/*"
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Banner Title</p>

          <input
            type="text"
            name="title"
            placeholder="Mega Electronics Sale"
            value={banner.title}
            onChange={
              handleChange
            }
          />
        </div>

        <div className="add-product-name flex-col">
          <p>
            Banner Subtitle
          </p>

          <input
            type="text"
            name="subtitle"
            placeholder="Up to 70% OFF"
            value={
              banner.subtitle
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Button Text</p>

          <input
            type="text"
            name="buttonText"
            placeholder="Shop Now"
            value={
              banner.buttonText
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Button Link</p>

          <input
            type="text"
            name="buttonLink"
            placeholder="/products"
            value={
              banner.buttonLink
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems:
              "center",
          }}
        >
          <input
            type="checkbox"
            name="active"
            checked={
              banner.active
            }
            onChange={
              handleChange
            }
          />

          <label>
            Active Banner
          </label>
        </div>

        <button
          type="submit"
          className="add-btn"
        >
          Save Banner
        </button>
      </form>
    </div>
  );
}