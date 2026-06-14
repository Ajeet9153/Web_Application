"use client";

import "./Sidebar.css";
import { assets } from "../../assets/assets";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
        <p>TechKart Store</p>
      </div>

      <div className="sidebar-options">

        <div className="sidebar-section">
          MANAGEMENT
        </div>

        <Link
          href="/add"
          className={`sidebar-option ${
            pathname === "/add" ? "active" : ""
          }`}
        >
          <img src={assets.add_icon.src} alt="" />
          <p>Add Product</p>
        </Link>

        <Link
          href="/list"
          className={`sidebar-option ${
            pathname === "/list" ? "active" : ""
          }`}
        >
          <img src={assets.order_icon.src} alt="" />
          <p>Product List</p>
        </Link>

        <Link
          href="/orders"
          className={`sidebar-option ${
            pathname === "/orders" ? "active" : ""
          }`}
        >
          <img src={assets.order_icon.src} alt="" />
          <p>Orders</p>
        </Link>

        <Link
          href="/customers"
          className={`sidebar-option ${
            pathname === "/customers" ? "active" : ""
          }`}
        >
          <img src={assets.profile_image.src} alt="" />
          <p>Customers</p>
        </Link>

        <div className="sidebar-section">
          MARKETING
        </div>

        <Link
          href="/coupons"
          className={`sidebar-option ${
            pathname === "/coupons" ? "active" : ""
          }`}
        >
          <img src={assets.add_icon.src} alt="" />
          <p>Coupons</p>
        </Link>

        <Link
          href="/banners"
          className={`sidebar-option ${
            pathname === "/banners" ? "active" : ""
          }`}
        >
          <img src={assets.add_icon.src} alt="" />
          <p>Banners</p>
        </Link>

        <div className="sidebar-section">
          BUSINESS
        </div>

        <Link
          href="/shop-profile"
          className={`sidebar-option ${
            pathname === "/shop-profile"
              ? "active"
              : ""
          }`}
        >
          <img src={assets.profile_image.src} alt="" />
          <p>Shop Profile</p>
        </Link>

        <Link
          href="/billing"
          className={`sidebar-option ${
            pathname === "/billing"
              ? "active"
              : ""
          }`}
        >
          <img src={assets.add_icon.src} alt="" />
          <p>Billing</p>
        </Link>

        <Link
          href="/reports"
          className={`sidebar-option ${
            pathname === "/reports"
              ? "active"
              : ""
          }`}
        >
          <img src={assets.order_icon.src} alt="" />
          <p>Reports</p>
        </Link>

        <div className="sidebar-section">
          SYSTEM
        </div>

        <Link
          href="/settings"
          className={`sidebar-option ${
            pathname === "/settings"
              ? "active"
              : ""
          }`}
        >
          <img src={assets.profile_image.src} alt="" />
          <p>Settings</p>
        </Link>

      </div>
    </div>
  );
};

export default Sidebar;