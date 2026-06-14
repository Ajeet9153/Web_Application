"use client";

import { useContext } from "react";
import { useSearchParams } from "next/navigation";
import { StoreContext } from "@/context/StoreContext";

export default function Products() {
  const searchParams =
    useSearchParams();

  const search =
    searchParams.get("search") || "";

  const { food_list, url } =
    useContext(StoreContext);

  const filteredProducts =
    food_list.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Search Results for:
        "{search}"
      </h2>

      {filteredProducts.length ===
      0 ? (
        <h3>
          No products found
        </h3>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.map(
            (item) => (
              <div
                key={item.id}
                style={{
                  border:
                    "1px solid #eee",
                  borderRadius:
                    "12px",
                  padding: "15px",
                  background:
                    "#fff",
                  boxShadow:
                    "0 2px 10px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={`${url}/images/${item.image}`}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit:
                      "cover",
                    borderRadius:
                      "10px",
                  }}
                  onError={(e) => {
                    console.log(
                      "Image Error:",
                      item.image
                    );
                  }}
                />

                <h3
                  style={{
                    marginTop:
                      "12px",
                  }}
                >
                  {item.name}
                </h3>

                <p
                  style={{
                    color:
                      "#2563eb",
                    fontWeight:
                      "bold",
                  }}
                >
                  ₹{item.price}
                </p>

                <p
                  style={{
                    color:
                      "#666",
                  }}
                >
                  {
                    item.category
                  }
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}