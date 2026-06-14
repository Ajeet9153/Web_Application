"use client";

export default function OrdersPage() {
  const orders = [
    {
      id: "#ORD1001",
      date: "08 Jun 2026",
      amount: 79999,
      status: "Delivered",
    },
    {
      id: "#ORD1002",
      date: "01 Jun 2026",
      amount: 24999,
      status: "Shipped",
    },
  ];

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "50px auto",
      }}
    >
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            marginTop: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>{order.id}</h3>

          <p>Date: {order.date}</p>

          <p>Amount: ₹{order.amount}</p>

          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}