"use client";

import Link from "next/link";
import "./settings.css";

export default function ProfilePage() {
  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-grid">

          <div className="account-sidebar">
            <div className="account-user">
              <img
                src="https://ui-avatars.com/api/?name=Ajeet+Kumar"
                alt=""
              />
              <h3>Ajeet Kumar</h3>
              <p>ajeet@gmail.com</p>
            </div>

            <div className="account-menu">
              <Link href="/profile">Profile</Link>
              <Link href="/orders">Orders</Link>
              <Link href="/wishlist">Wishlist</Link>
              <Link href="/addresses">Addresses</Link>
              <Link href="/change-password">Change Password</Link>
              <Link href="/settings">Settings</Link>
            </div>
          </div>

          <div className="account-content">
            <h1 className="account-title">
              My Account
            </h1>

            <div className="stats-grid">
              <div className="stat-card orders">
                <h2>12</h2>
                <p>Orders</p>
              </div>

              <div className="stat-card wishlist">
                <h2>8</h2>
                <p>Wishlist</p>
              </div>

              <div className="stat-card addresses">
                <h2>3</h2>
                <p>Addresses</p>
              </div>

              <div className="stat-card settings">
                <h2>100%</h2>
                <p>Profile</p>
              </div>
            </div>

            <div className="quick-actions">
              <h2>Quick Actions</h2>

              <div className="action-grid">
                <div className="action-card">
                  📦 Track Orders
                </div>

                <div className="action-card">
                  ❤️ Manage Wishlist
                </div>

                <div className="action-card">
                  📍 Manage Addresses
                </div>

                <div className="action-card">
                  🔒 Change Password
                </div>

                <div className="action-card">
                  ⚙️ Account Settings
                </div>

                <div className="action-card">
                  💳 Payment Methods
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}