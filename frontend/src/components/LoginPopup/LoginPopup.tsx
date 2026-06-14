"use client";

import {
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

interface LoginPopupProps {
  setShowLogin: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

interface FormData {
  name: string;
  email: string;
  password: string;
}

const LoginPopup = ({
  setShowLogin,
}: LoginPopupProps) => {
  const { url, setToken } =
    useContext(StoreContext);

  const [currState, setCurrState] =
    useState<"Login" | "Sign Up">(
      "Login"
    );

  const [data, setData] =
    useState<FormData>({
      name: "",
      email: "",
      password: "",
    });

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } =
      event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    let newUrl = url;

    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response =
        await axios.post(
          newUrl,
          data
        );

      if (response.data.success) {
        setToken(
          response.data.token
        );

        localStorage.setItem(
          "token",
          response.data.token
        );

        alert(
          currState === "Login"
            ? "Login Successful"
            : "Account Created Successfully"
        );

        setShowLogin(false);
      }
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data
          ?.message ||
        error?.message ||
        "Something went wrong";

      alert(message);
    }
  };

  return (
    <div className="login-popup">
      <form
        onSubmit={onLogin}
        className="login-popup-container"
      >
        <div className="login-popup-title">
          <h2>{currState}</h2>

          <img
            onClick={() =>
              setShowLogin(false)
            }
            src={
              assets.cross_icon.src
            }
            alt="Close"
          />
        </div>

        <div className="login-popup-inputs">
          {currState ===
          "Login" ? null : (
            <input
              name="name"
              onChange={
                onChangeHandler
              }
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          <input
            name="email"
            onChange={
              onChangeHandler
            }
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />

          <input
            name="password"
            onChange={
              onChangeHandler
            }
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">
          {currState ===
          "Sign Up"
            ? "Create Account"
            : "Login"}
        </button>

        <div className="login-popup-condition">
          <input
            type="checkbox"
            required
          />
          <p>
            By continuing, I
            agree to the Terms
            of Service and
            Privacy Policy.
          </p>
        </div>

        {currState ===
        "Login" ? (
          <p>
            Create a new
            account?{" "}
            <span
              onClick={() =>
                setCurrState(
                  "Sign Up"
                )
              }
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Already have an
            account?{" "}
            <span
              onClick={() =>
                setCurrState(
                  "Login"
                )
              }
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;