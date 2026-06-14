"use client";

import "./dashboard.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [role, setRole] =
    useState("");

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const token =
      localStorage.getItem(
        "adminToken"
      );

    if (!token) {
      router.push(
        "/admin/login"
      );
      return;
    }

    const adminRole =
      localStorage.getItem(
        "adminRole"
      );

    const adminUser =
      localStorage.getItem(
        "adminUser"
      );

    setRole(
      adminRole || ""
    );

    if (adminUser) {
      setUser(
        JSON.parse(
          adminUser
        )
      );
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "adminRole"
    );

    localStorage.removeItem(
      "adminUser"
    );

    router.push(
      "/admin/login"
    );
  };

  return (
    <div className="dashboard">

      <div className="dashboard-top">

        <div>
          <h1>
            Welcome,
            {user?.name}
          </h1>

          <p>
            {role}
          </p>
        </div>

        <button
          onClick={
            logout
          }
        >
          Logout
        </button>

      </div>

      {role ===
      "MASTER_ADMIN" ? (

        <div className="dashboard-grid">

          <div
            className="dashboard-card"
            onClick={() =>
              router.push(
                "/shops"
              )
            }
          >
            <h3>🏪 Shops</h3>
            <p>
              Manage Shops
            </p>
          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              router.push(
                "/sub-admins"
              )
            }
          >
            <h3>
              👨‍💼 Sub Admins
            </h3>
            <p>
              Manage Admins
            </p>
          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              router.push(
                "/orders"
              )
            }
          >
            <h3>📦 Orders</h3>
            <p>
              View Orders
            </p>
          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              router.push(
                "/coupons"
              )
            }
          >
            <h3>🎟 Coupons</h3>
            <p>
              Manage Coupons
            </p>
          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              router.push(
                "/reports"
              )
            }
          >
            <h3>📈 Reports</h3>
            <p>
              Business Reports
            </p>
          </div>

        </div>

      ) : (

        <div className="dashboard-grid">

          <div
            className="dashboard-card"
            onClick={() =>
              router.push(
                "/add"
              )
            }
          >
            <h3>
              ➕ Products
            </h3>
            <p>
              Add Products
            </p>
          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              router.push(
                "/list"
              )
            }
          >
            <h3>
              📋 Product List
            </h3>
            <p>
              Manage Products
            </p>
          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              router.push(
                "/orders"
              )
            }
          >
            <h3>📦 Orders</h3>
            <p>
              Customer Orders
            </p>
          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              router.push(
                "/billing"
              )
            }
          >
            <h3>🧾 Billing</h3>
            <p>
              Generate Bills
            </p>
          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              router.push(
                "/settings"
              )
            }
          >
            <h3>
              ⚙ Settings
            </h3>
            <p>
              Shop Settings
            </p>
          </div>

        </div>

      )}
    </div>
  );
}