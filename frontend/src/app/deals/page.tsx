"use client";

import "./deals.css";

export default function DealsPage() {
  const deals = [
    {
      title: "iPhone 15 Pro",
      discount: "25% OFF",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
    {
      title: "Gaming Laptop",
      discount: "40% OFF",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    },
    {
      title: "Smart Watch",
      discount: "35% OFF",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      title: "Headphones",
      discount: "50% OFF",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
  ];

  return (
    <div className="deals-page">

      <div className="deals-banner">
        <h1>🔥 Mega Deals Festival</h1>
        <p>
          Save big on electronics,
          gadgets and accessories.
        </p>
      </div>

      <div className="deals-grid">
        {deals.map((item, index) => (
          <div
            key={index}
            className="deal-card"
          >
            <img
              src={item.image}
              alt={item.title}
            />

            <div className="deal-info">
              <h3>
                {item.title}
              </h3>

              <span>
                {item.discount}
              </span>

              <button>
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}