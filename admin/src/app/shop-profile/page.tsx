"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ShopProfilePage() {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
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
      qrCode: "",
      logo: "",
    });

  const backendUrl =
    "http://localhost:4000";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const loadProfile =
    async () => {
      try {
        const response =
          await axios.get(
            `${backendUrl}/api/shop-profile`
          );

        if (
          response.data.success
        ) {
          setFormData(
            response.data.data
          );
        }
      } catch (error) {
        console.log(
          "No profile found"
        );
      }
    };

  const saveProfile =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await axios.post(
            `${backendUrl}/api/shop-profile/save`,
            formData
          );

        if (
          response.data.success
        ) {
          alert(
            "Profile Saved Successfully"
          );
        }
      } catch (error) {
        console.log(error);

        alert(
          "Failed To Save Profile"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">
        Shop Profile
      </h1>

      <div className="admin-card">
        <form
          className="admin-form"
          onSubmit={saveProfile}
        >
          <input
            name="shopName"
            placeholder="Shop Name"
            value={
              formData.shopName
            }
            onChange={
              handleChange
            }
          />

          <input
            name="ownerName"
            placeholder="Owner Name"
            value={
              formData.ownerName
            }
            onChange={
              handleChange
            }
          />

          <input
            name="gstNumber"
            placeholder="GST Number"
            value={
              formData.gstNumber
            }
            onChange={
              handleChange
            }
          />

          <input
            name="mobileNumber"
            placeholder="Mobile Number"
            value={
              formData.mobileNumber
            }
            onChange={
              handleChange
            }
          />

          <input
            name="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
          />

          <input
            name="upiId"
            placeholder="UPI ID"
            value={
              formData.upiId
            }
            onChange={
              handleChange
            }
          />

          <input
            name="bankName"
            placeholder="Bank Name"
            value={
              formData.bankName
            }
            onChange={
              handleChange
            }
          />

          <input
            name="accountNumber"
            placeholder="Account Number"
            value={
              formData.accountNumber
            }
            onChange={
              handleChange
            }
          />

          <input
            name="ifscCode"
            placeholder="IFSC Code"
            value={
              formData.ifscCode
            }
            onChange={
              handleChange
            }
          />

          <input
            name="qrCode"
            placeholder="QR Code Image URL"
            value={
              formData.qrCode
            }
            onChange={
              handleChange
            }
          />

          <input
            name="logo"
            placeholder="Logo Image URL"
            value={
              formData.logo
            }
            onChange={
              handleChange
            }
          />

          <textarea
            className="admin-form-full"
            name="address"
            placeholder="Shop Address"
            rows={4}
            value={
              formData.address
            }
            onChange={
              handleChange
            }
          />

          <button
            type="submit"
            className="primary-btn admin-form-full"
          >
            {loading
              ? "Saving..."
              : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}