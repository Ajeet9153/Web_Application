"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import "./add.css";
import { assets } from "@/assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

interface AddProps {
  url?: string;
}

interface ProductData {
  name: string;
  description: string;
  price: string;
  category: string;
}

const Add = ({
  url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
}: AddProps) => {
  const [image, setImage] = useState<File | null>(null);

  const [data, setData] = useState<ProductData>({
    name: "",
    description: "",
    price: "",
    category: "Select",
  });

  const onChangeHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    if (data.category === "Select") {
      toast.error("Please select a valid category.");
      return;
    }

    if (Number(data.price) <= 0) {
      toast.error("Price must be greater than 0.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append(
        "description",
        data.description
      );
      formData.append(
        "price",
        String(Number(data.price))
      );
      formData.append(
        "category",
        data.category
      );
      formData.append("image", image);

      const response = await axios.post(
        `${url}/api/food/add`,
        formData
      );

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Select",
        });

        setImage(null);

        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Error adding product. Check server connection."
      );
    }
  };

  return (
    <div className="add">
      <form
        className="flex-col"
        onSubmit={onSubmitHandler}
      >
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>

          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : assets.upload_area.src      
              }
              alt="Upload"
            />
          </label>

          <input
            onChange={(
              e: ChangeEvent<HTMLInputElement>
            ) =>
              setImage(
                e.target.files?.[0] || null
              )
            }
            type="file"
            id="image"
            hidden
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>

          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>

          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={6}
            placeholder="Write content here"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>

            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              required
            >
              <option value="Select">
                Select
              </option>
              <option value="Smartphones">
                Smartphones
              </option>
              <option value="Refrigerators">
                Refrigerators
              </option>
              <option value="Laptops">
                Laptops
              </option>
              <option value="Washing Machine">
                Washing Machine
              </option>
              <option value="LED">
                LED
              </option>
              <option value="Almirah">
                Almirah
              </option>
              <option value="Inverter Battery">
                Inverter Battery
              </option>
              <option value="Electric Accessories">
                Electric Accessories
              </option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price (₹)</p>

            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="20"
              min="1"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="add-btn"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;