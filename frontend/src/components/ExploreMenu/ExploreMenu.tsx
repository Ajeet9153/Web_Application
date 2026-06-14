"use client";

import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

interface ExploreMenuProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ExploreMenu = ({
  category,
  setCategory,
}: ExploreMenuProps) => {
  return (
    <section
      className="explore-menu"
      id="explore-menu"
    >
      <h1>Shop By Category</h1>

      <p className="explore-menu-text">
        Browse our wide collection of electronics
        and gadgets. Find the latest smartphones,
        laptops, headphones, gaming accessories,
        smart devices and much more.
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className="explore-menu-list-item"
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name
                  ? "All"
                  : item.menu_name
              )
            }
          >
            <img
              className={
                category === item.menu_name
                  ? "active"
                  : ""
              }
              src={item.menu_image.src}
              alt={item.menu_name}
            />

            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreMenu;