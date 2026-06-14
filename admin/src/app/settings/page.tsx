"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] =
    useState({
      storeName:
        "TechKart Electronics",
      adminName:
        "Ajeet Kumar",
      adminEmail:
        "admin@gmail.com",
      supportEmail:
        "support@gmail.com",
      supportPhone:
        "8294935408",
      maintenanceMode: false,
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setSettings({
      ...settings,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    console.log(settings);

    alert(
      "Settings Saved Successfully"
    );
  };

  return (
    <div className="add">
      <h2>Store Settings</h2>

      <form
        className="flex-col"
        onSubmit={handleSubmit}
      >
        <div className="add-product-name flex-col">
          <p>Store Name</p>

          <input
            type="text"
            name="storeName"
            value={
              settings.storeName
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Store Logo</p>

          <input
            type="file"
            accept="image/*"
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Admin Name</p>

          <input
            type="text"
            name="adminName"
            value={
              settings.adminName
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Admin Email</p>

          <input
            type="email"
            name="adminEmail"
            value={
              settings.adminEmail
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="add-product-name flex-col">
          <p>
            Support Email
          </p>

          <input
            type="email"
            name="supportEmail"
            value={
              settings.supportEmail
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="add-product-name flex-col">
          <p>
            Support Phone
          </p>

          <input
            type="text"
            name="supportPhone"
            value={
              settings.supportPhone
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            gap: "10px",
          }}
        >
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={
              settings.maintenanceMode
            }
            onChange={
              handleChange
            }
          />

          <label>
            Maintenance Mode
          </label>
        </div>

        <button
          type="submit"
          className="add-btn"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}