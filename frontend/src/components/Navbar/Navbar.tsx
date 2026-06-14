"use client";

import { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StoreContext } from "../../context/StoreContext";
import SearchBar from "../Searchbar/Searchbar";
import AdminLogin from "@/app/admin/login/page";

interface NavbarProps {
  setShowLogin: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const Navbar = ({
  setShowLogin,
}: NavbarProps) => {
  const [menu, setMenu] =
    useState("home");

  const {
    getTotalCartAmount,
    token,
    setToken,
  } = useContext(StoreContext);

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");

    setToken("");

    router.push("/");
  };

  const cartCount =
    typeof window !== "undefined"
      ? Object.keys(
          JSON.parse(
            localStorage.getItem(
              "cart"
            ) || "{}"
          )
        ).length
      : 0;

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link href="/">
        <img
          src={assets.logo.src}
          alt="TechKart"
          className="logo"
        />
      </Link>

      {/* Search */}
      <div className="navbar-search-wrapper">
        <SearchBar />
      </div>

      {/* Menu */}
      <ul className="navbar-menu">
        <Link
          href="/"
          className={
            menu === "home"
              ? "active"
              : ""
          }
          onClick={() =>
            setMenu("home")
          }
        >
          Home
        </Link>

        <Link
          href="/products"
          className={
            menu === "products"
              ? "active"
              : ""
          }
          onClick={() =>
            setMenu(
              "products"
            )
          }
        >
          Products
        </Link>

        <Link
          href="/deals"
          className={
            menu === "deals"
              ? "active"
              : ""
          }
          onClick={() =>
            setMenu("deals")
          }
        >
          Deals
        </Link>

        <Link
          href="/brands"
          className={
            menu === "brands"
              ? "active"
              : ""
          }
          onClick={() =>
            setMenu(
              "brands"
            )
          }
        >
          Brands
        </Link>
      </ul>

      {/* Right */}
      <div className="navbar-right">

        <Link href="/cart">
          <div className="navbar-cart">
            <img
              src={
                assets.basket_icon.src
              }
              alt="Cart"
            />

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </div>
        </Link>

        {!token ? (
          <div className="auth-buttons">

            <button
              className="admin-btn"
              onClick={() =>
                router.push(
                  "/admin/login"
                )
              }
            >
              Admin Login
            </button>

            <button
              className="signin-btn"
              onClick={() =>
                setShowLogin(
                  true
                )
              }
            >
              Sign In
            </button>

          </div>
        ) : (
          <div className="nav-profile">

            <img
              src={
                assets.profile_icon.src
              }
              alt="Profile"
            />

            <ul className="nav-profile-dropdown">

              <Link href="/profile">
                <li>
                  <img
                    src={
                      assets.profile_icon
                        .src
                    }
                    alt=""
                  />
                  <p>
                    My Profile
                  </p>
                </li>
              </Link>

              <hr />

              <Link href="/orders">
                <li>
                  <img
                    src={
                      assets.bag_icon
                        .src
                    }
                    alt=""
                  />
                  <p>
                    My Orders
                  </p>
                </li>
              </Link>

              <hr />

              <Link href="/wishlist">
                <li>
                  <img
                    src={
                      assets.bag_icon
                        .src
                    }
                    alt=""
                  />
                  <p>
                    Wishlist
                  </p>
                </li>
              </Link>

              <hr />

              <Link href="/addresses">
                <li>
                  <img
                    src={
                      assets.bag_icon
                        .src
                    }
                    alt=""
                  />
                  <p>
                    Addresses
                  </p>
                </li>
              </Link>

              <hr />

              <Link href="/settings">
                <li>
                  <img
                    src={
                      assets.profile_icon
                        .src
                    }
                    alt=""
                  />
                  <p>
                    Settings
                  </p>
                </li>
              </Link>

              <hr />

              <li
                onClick={
                  logout
                }
              >
                <img
                  src={
                    assets.logout_icon
                      .src
                  }
                  alt=""
                />
                <p>
                  Logout
                </p>
              </li>

            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;