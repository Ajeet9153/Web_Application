"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterShopPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    gstNumber: "",
    mobileNumber: "",
    email: "",
    address: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    qrCode: "INITIAL_BACKUP_STRING", // Fallback placeholder metric
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Point this directly to your NestJS shop profile creation endpoint
      const response = await fetch("http://localhost:5000/api/shop-profile/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Pass your user authentication token here once auth guards are activated
          "Authorization": `Bearer ${localStorage.getItem("token")}`, 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Application submitted successfully! Awaiting Master Admin verification.");
        router.push("/profile"); // Send them back to their dashboard profile overview
      } else {
        const errData = await response.json();
        alert(`Registration Error: ${errData.message}`);
      }
    } catch (err) {
      console.error("Network communication fault:", err);
      alert("Failed to reach processing registry servers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "32px", textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a" }}>Launch Your Digital Storefront</h1>
        <p style={{ color: "#64748b", marginTop: "6px" }}>Submit your corporate documentation to unlock multi-vendor Sub-Admin privileges.</p>
      </header>

      <form onSubmit={handleSubmit} style={{ background: "#ffffff", padding: "32px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
        
        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0f172a", marginBottom: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>
          1. Corporate Branding & Identity
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>Shop / Company Name</label>
            <input required name="shopName" value={formData.shopName} onChange={handleChange} style={inputStyle} placeholder="e.g., TechKart Electronics" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>Legal Owner Name</label>
            <input required name="ownerName" value={formData.ownerName} onChange={handleChange} style={inputStyle} placeholder="e.g., Alex Stark" />
          </div>
        </div>

        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0f172a", marginBottom: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>
          2. Government KYC Verification
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>GSTIN Number (15-Digit Format)</label>
            <input required name="gstNumber" value={formData.gstNumber} onChange={handleChange} style={inputStyle} placeholder="e.g., 10ABCDE1234F1Z5" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>Business Email</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="vendor@techkart.com" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>Business Mobile Phone</label>
              <input required type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} style={inputStyle} placeholder="e.g., 9876543210" />
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>Physical Store Registered Address</label>
            <textarea required name="address" value={formData.address} onChange={handleChange} style={{ ...inputStyle, height: "80px", resize: "none" }} placeholder="Complete formal street office location details..." />
          </div>
        </div>

        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#0f172a", marginBottom: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px" }}>
          3. Financial Matrix (Used for POS Billing QR)
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>Bank Clearing Entity Name</label>
            <input required name="bankName" value={formData.bankName} onChange={handleChange} style={inputStyle} placeholder="e.g., HDFC Bank" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>Account Processing Number</label>
            <input required name="accountNumber" value={formData.accountNumber} onChange={handleChange} style={inputStyle} placeholder="e.g., 50100234567890" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>IFSC Code String</label>
            <input required name="ifscCode" value={formData.ifscCode} onChange={handleChange} style={inputStyle} placeholder="e.g., HDFC0001234" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>Store Virtual Payment Address (UPI ID)</label>
            <input required name="upiId" value={formData.upiId} onChange={handleChange} style={inputStyle} placeholder="techkart@paytm" />
          </div>
        </div>

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", background: "#0f172a", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: "700", cursor: "pointer", fontSize: "15px" }}>
          {loading ? "Transmitting Application Profile..." : "Submit Store Verification Dossier"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  fontSize: "14px",
  boxSizing: "border-box" as const,
  outline: "none"
};