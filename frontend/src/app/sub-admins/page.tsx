"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function SubAdminsPage() {
  const [admins, setAdmins] =
    useState<any[]>([]);

  const [shops, setShops] =
    useState<any[]>([]);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      shopId: "",
    });

  const API =
    "http://localhost:4000";

  const fetchData = async () => {
    try {
      const adminsRes =
        await axios.get(
          `${API}/api/sub-admin/list`
        );

      const shopsRes =
        await axios.get(
          `${API}/api/shop-profile/list`
        );

      setAdmins(
        adminsRes.data.data
      );

      setShops(
        shopsRes.data.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/api/sub-admin/create`,
        formData
      );

      alert(
        "Sub Admin Created Successfully"
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        shopId: "",
      });

      fetchData();
    } catch (error: any) {
      alert(
        error?.response?.data
          ?.message ||
          "Error"
      );
    }
  };

  const disableAdmin =
    async (id: string) => {
      try {
        await axios.patch(
          `${API}/api/sub-admin/disable/${id}`
        );

        fetchData();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>
        Sub Admin Management
      </h1>

      <br />

      <form
        onSubmit={
          handleSubmit
        }
        style={{
          display: "grid",
          gap: "15px",
          maxWidth: "500px",
        }}
      >
        <input
          placeholder="Name"
          value={
            formData.name
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              name:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          value={
            formData.email
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              email:
                e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              password:
                e.target.value,
            })
          }
        />

        <select
          value={
            formData.shopId
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              shopId:
                e.target.value,
            })
          }
        >
          <option value="">
            Select Shop
          </option>

          {shops.map(
            (shop) => (
              <option
                key={
                  shop.id
                }
                value={
                  shop.id
                }
              >
                {
                  shop.shopName
                }
              </option>
            )
          )}
        </select>

        <button
          type="submit"
        >
          Create Admin
        </button>
      </form>

      <br />
      <br />

      <h2>
        Existing Sub Admins
      </h2>

      <table
        style={{
          width: "100%",
          marginTop:
            "20px",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Shop</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {admins.map(
            (admin) => (
              <tr
                key={
                  admin.id
                }
              >
                <td>
                  {admin.name}
                </td>

                <td>
                  {
                    admin.email
                  }
                </td>

                <td>
                  {admin
                    .shop
                    ?.shopName ||
                    "Not Assigned"}
                </td>

                <td>
                  <button
                    onClick={() =>
                      disableAdmin(
                        admin.id
                      )
                    }
                  >
                    Disable
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}