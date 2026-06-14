"use client";

export default function WishlistPage() {
  const wishlist = [
    {
      id: 1,
      name: "iPhone 16 Pro",
      price: 129999,
      image:
        "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "MacBook Air M4",
      price: 99999,
      image:
        "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="container">
      <h1>My Wishlist</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {wishlist.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                borderRadius: "10px",
              }}
            />

            <h3>{item.name}</h3>

            <p>₹{item.price}</p>

            <button>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}