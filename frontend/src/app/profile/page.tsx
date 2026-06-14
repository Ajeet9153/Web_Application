"use client";

import { useState } from "react";
import "./profile.css";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Ajeet Kumar",
    email: "ajeet@example.com",
    phone: "8294935408",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // API Call Here
    console.log(user);
    setEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>My Profile</h1>

        <div className="profile-image">
          <img
            src="https://ui-avatars.com/api/?name=Ajeet+Kumar"
            alt="profile"
          />
        </div>

        <div className="profile-form">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            disabled={!editing}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            disabled={!editing}
            onChange={handleChange}
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            disabled={!editing}
            onChange={handleChange}
          />

          {!editing ? (
            <button
              className="edit-btn"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <button
              className="save-btn"
              onClick={handleSave}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}