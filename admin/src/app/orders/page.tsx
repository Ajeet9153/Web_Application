"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./orders.css";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const url =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000";

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${url}/api/order/list`
      );

      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error(
        "Error fetching orders",
        error
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleInvoice = (
    orderId: string
  ) => {
    window.open(
      `/invoice/${orderId}`,
      "_blank"
    );
  };

  const handleWhatsapp = (
    order: any
  ) => {
    const message = `
🧾 Invoice Details

Invoice ID: ${order.id}
Customer: ${order.customerName}
Amount: ₹${order.amount}

Thank you for shopping with TechKart Electronics.
`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  return (
    <div className="orders">
      <div className="orders-header">
        <h2>📦 Customer Orders</h2>
        <span>
          {orders.length} Orders
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h3>No Orders Found</h3>

          <p>
            New customer orders will
            appear here.
          </p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div
              key={order.id}
              className="order-card"
            >
              <div className="order-top">
                <div>
                  <h3>
                    Order #
                    {order.id.slice(
                      0,
                      8
                    )}
                  </h3>

                  <p className="date">
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="status">
                  {order.status}
                </div>
              </div>

              <div className="customer-info">
                <h4>
                  👤 Customer Details
                </h4>

                <p>
                  <strong>Name:</strong>{" "}
                  {
                    order.customerName
                  }
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {
                    order.customerEmail
                  }
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {
                    order.address
                      ?.phone
                  }
                </p>

                <p>
                  <strong>
                    Address:
                  </strong>{" "}
                  {
                    order.address
                      ?.street
                  }
                  ,{" "}
                  {
                    order.address
                      ?.city
                  }
                  ,{" "}
                  {
                    order.address
                      ?.state
                  }
                  ,{" "}
                  {
                    order.address
                      ?.country
                  }
                </p>
              </div>

              <div className="order-summary">
                <div className="summary-box">
                  <span>
                    Order Amount
                  </span>

                  <h3>
                    ₹{order.amount}
                  </h3>
                </div>

                <div className="summary-box">
                  <span>
                    Total Products
                  </span>

                  <h3>
                    {order.products
                      ?.length || 0}
                  </h3>
                </div>
              </div>

              <div className="products-section">
                <h4>
                  🛒 Ordered Products
                </h4>

                <div className="products-list">
                  {order.products?.map(
                    (
                      product: any,
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="product-row"
                      >
                        <div>
                          <strong>
                            {
                              product.productName
                            }
                          </strong>

                          <p>
                            {
                              product.category
                            }
                          </p>
                        </div>

                        <div>
                          Qty:
                          <strong>
                            {" "}
                            {
                              product.quantity
                            }
                          </strong>
                        </div>

                        <div>
                          ₹
                          {
                            product.price
                          }
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="order-actions">
                <button
                  className="invoice-btn"
                  onClick={() =>
                    handleInvoice(
                      order.id
                    )
                  }
                >
                  🧾 Generate Invoice
                </button>

                <button
                  className="whatsapp-btn"
                  onClick={() =>
                    handleWhatsapp(
                      order
                    )
                  }
                >
                  🟢 WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;