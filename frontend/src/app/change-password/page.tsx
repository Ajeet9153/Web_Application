"use client";

import { useState } from "react";
import "./change-password.css";

export default function ChangePasswordPage() {
  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    if (newPassword.length < 6) {
      alert(
        "Password must be at least 6 characters"
      );
      return;
    }

    try {
      setLoading(true);

      // API Call Here

      alert(
        "Password changed successfully"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-page">
      <div className="change-password-card">
        <div className="card-header">
          <h1>
            Change Password
          </h1>

          <p>
            Keep your account
            secure by updating
            your password
            regularly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="password-form"
        >
          <div className="form-group">
            <label>
              Current Password
            </label>

            <input
              type="password"
              value={
                currentPassword
              }
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              placeholder="Enter current password"
            />
          </div>

          <div className="form-group">
            <label>
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              placeholder="Enter new password"
            />
          </div>

          <div className="form-group">
            <label>
              Confirm Password
            </label>

            <input
              type="password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="update-btn"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>
        </form>

        <div className="security-tips">
          <h3>
            Security Tips
          </h3>

          <ul>
            <li>
              Use at least 8
              characters
            </li>
            <li>
              Include uppercase
              and lowercase letters
            </li>
            <li>
              Use numbers and
              special characters
            </li>
            <li>
              Do not reuse old
              passwords
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}