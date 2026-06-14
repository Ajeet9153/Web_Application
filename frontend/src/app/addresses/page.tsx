"use client";

export default function AddressesPage() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
      }}
    >
      <h1>Saved Addresses</h1>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        <h3>Home</h3>

        <p>
          Mithapur, Patna,
          Bihar - 800001
        </p>

        <p>Phone: 8294935408</p>

        <button>Edit</button>
      </div>

      <button
        style={{
          marginTop: "20px",
        }}
      >
        Add New Address
      </button>
    </div>
  );
}