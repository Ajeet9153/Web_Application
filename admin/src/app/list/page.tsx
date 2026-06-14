"use client";

import { useEffect, useState } from "react";
import "./list.css";
import axios from "axios";
import { toast } from "react-toastify";

interface FoodItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

const List = () => {
  const url =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000";

  const [list, setList] = useState<FoodItem[]>([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${url}/api/food/list`
      );

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (error) {
      toast.error("Failed to fetch data");
      console.error(error);
    }
  };

  const removeFood = async (
    foodId: string
  ) => {
    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        {
          id: foodId,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      toast.error("Failed to remove item");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.length > 0 ? (
          list.map((item) => (
            <div
              key={item.id}
              className="list-table-format"
            >
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
              />

              <p>{item.name}</p>

              <p>{item.category}</p>

              <p>₹{item.price}</p>

              <p
                onClick={() =>
                  removeFood(item.id)
                }
                className="cursor"
              >
                X
              </p>
            </div>
          ))
        ) : (
          <p>No food items found.</p>
        )}
      </div>
    </div>
  );
};

export default List;