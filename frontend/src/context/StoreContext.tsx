"use client";

import axios from "axios";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface FoodItem {
  id: string;
 
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItems {
  [key: string]: number;
}

interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
  image?: string;
}

interface StoreContextType {
  food_list: FoodItem[];
  cartItems: CartItems;
  setCartItems: React.Dispatch<
    React.SetStateAction<CartItems>
  >;

  addToCart: (itemId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  getTotalCartAmount: () => number;

  url: string;

  token: string;
  setToken: React.Dispatch<
    React.SetStateAction<string>
  >;

  user: User | null;
  setUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;
}

export const StoreContext = createContext(
  {} as StoreContextType
);

export default function StoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] =
    useState<CartItems>({});

  const [food_list, setFoodList] =
  useState<FoodItem[]>([]);

const [token, setToken] = useState("");

const [user, setUser] =
  useState<User | null>(null);

  const url =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000";

  const addToCart = async (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }

    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        {
          headers: { token },
        }
      );
    }
  };

  const removeFromCart = async (
    itemId: string
  ) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(
        (prev[itemId] || 0) - 1,
        0
      ),
    }));

    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        {
          headers: { token },
        }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      const quantity = cartItems[item];

      if (quantity > 0) {
        const itemInfo = food_list.find(
          (product) => product.id === item
        );

        if (itemInfo) {
          totalAmount +=
            itemInfo.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(
        `${url}/api/food/list`
      );

      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.error(
        "Error fetching foods:",
        error
      );
    }
  };

  const loadCartData = async (
  userToken: string
) => {
  try {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      {
        headers: {
          token: userToken,
        },
      }
    );

    console.log(
      "Cart Response:",
      response.data
    );

    setCartItems(
      response.data.cartData || {}
    );
  } catch (error: any) {
    console.error(
      "Cart Error:",
      error?.response?.data || error
    );
  }
};

useEffect(() => {
  async function loadData() {
    await fetchFoodList();

    const storedToken =
      localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      await loadCartData(storedToken);

      try {
        const response =
          await axios.get(
            `${url}/api/user/profile`,
            {
              headers: {
                token: storedToken,
              },
            }
          );

        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.log(
          "Profile Error:",
          error
        );
      }
    }
  }

  loadData();
}, []);

 const contextValue: StoreContextType = {
  food_list,
  cartItems,
  setCartItems,
  addToCart,
  removeFromCart,
  getTotalCartAmount,
  url,

  token,
  setToken,

  user,
  setUser,
};

  return (
    <StoreContext.Provider
      value={contextValue}
    >
      {children}
    </StoreContext.Provider>
  );
}