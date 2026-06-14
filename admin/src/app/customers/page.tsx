"use client";

import { useState } from "react";

export default function CustomersPage() {
  const [search, setSearch] =
    useState("");

  const customers = [
    {
      id: 1,
      name: "Ajeet Kumar",
      email:
        "ajeet@gmail.com",
      orders: 12,
      spent: 45999,
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email:
        "rahul@gmail.com",
      orders: 5,
      spent: 15999,
      status: "Blocked",
    },
  ];

  const filteredCustomers =
    customers.filter(
      (customer) =>
        customer.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        customer.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="add">
      <h2>
        Customer Management
      </h2>

      <div
        style={{
          margin: "20px 0",
        }}
      >
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            padding: "12px",
            width: "350px",
            border:
              "1px solid #ddd",
            borderRadius:
              "8px",
          }}
        />
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Orders</th>
            <th>Total Spent</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.map(
            (customer) => (
              <tr
                key={
                  customer.id
                }
              >
                <td>
                  {
                    customer.id
                  }
                </td>

                <td>
                  {
                    customer.name
                  }
                </td>

                <td>
                  {
                    customer.email
                  }
                </td>

                <td>
                  {
                    customer.orders
                  }
                </td>

                <td>
                  ₹
                  {
                    customer.spent
                  }
                </td>

                <td>
                  {
                    customer.status
                  }
                </td>

                <td>
                  <button
                    className="add-btn"
                  >
                    {customer.status ===
                    "Active"
                      ? "Block"
                      : "Unblock"}
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}