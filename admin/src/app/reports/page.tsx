"use client";

export default function ReportsPage() {
  return (
    <div className="add">

      <h2>Sales Reports</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div className="report-card">
          <h3>Total Revenue</h3>
          <h1>₹2,45,000</h1>
        </div>

        <div className="report-card">
          <h3>Total Orders</h3>
          <h1>325</h1>
        </div>

        <div className="report-card">
          <h3>Customers</h3>
          <h1>128</h1>
        </div>

        <div className="report-card">
          <h3>Products Sold</h3>
          <h1>542</h1>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
        }}
      >
        <h3>Best Selling Products</h3>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse:
              "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Product</th>
              <th>Sold</th>
              <th>Revenue</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>iPhone 15</td>
              <td>42</td>
              <td>₹33,60,000</td>
            </tr>

            <tr>
              <td>MacBook Air</td>
              <td>18</td>
              <td>₹18,00,000</td>
            </tr>

            <tr>
              <td>Boat Headphones</td>
              <td>96</td>
              <td>₹1,92,000</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}