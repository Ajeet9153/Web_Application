"use client";

import "./brands.css";

export default function BrandsPage() {
  const brands = [
    "Apple",
    "Samsung",
    "Sony",
    "HP",
    "Dell",
    "Lenovo",
    "Asus",
    "Boat",
  ];

  return (
    <div className="brands-page">

      <div className="brands-header">
        <h1>
          Top Electronics Brands
        </h1>

        <p>
          Trusted by millions
          worldwide
        </p>
      </div>

      <div className="brands-grid">
        {brands.map((brand) => (
          <div
            key={brand}
            className="brand-card"
          >
            <h2>{brand}</h2>

            <button>
              View Products
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}