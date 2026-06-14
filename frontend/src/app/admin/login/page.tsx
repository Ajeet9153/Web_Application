"use client";

import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await axios.post(
          "http://localhost:4000/api/sub-admin/login",
          {
            email,
            password,
          }
        );

      if (
        response.data.success
      ) {
        localStorage.setItem(
          "adminToken",
          response.data.token
        );

        localStorage.setItem(
          "adminRole",
          response.data.role
        );

        localStorage.setItem(
          "adminUser",
          JSON.stringify(
            response.data.user
          )
        );

        if (
          response.data.role ===
          "MASTER_ADMIN"
        ) {
          router.push(
            "/admin/dashboard"
          );
        } else {
          router.push(
            "/admin/dashboard"
          );
        }
      }
    } catch (error: any) {
      alert(
        error?.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-card">

        <div className="login-header">
          <h1>
            Admin Panel
          </h1>

          <p>
            Login to manage
            your store
          </p>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
            disabled={
              loading
            }
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
}