import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Palisten HOODI",
    price: 2000,
    image: "hoodi.png",
  },
  {
    id: 2,
    name: "Palisten T-Shirt",
    price: 1500,
    image: "tshirt.png",
  },
];

export default function CStore() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-100 p-4">
      <header className="text-center text-3xl font-bold mb-6">ClothZone</header>

      <p className="text-center mb-10 text-gray-700">
        Step Into Style – Trendy clothing for every season. Feel confident, look amazing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow p-4 text-center">
            <img src={product.image} alt={product.name} className="mx-auto h-40 mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-lg text-green-600">{product.price} DA</p>
            <Button onClick={() => addToCart(product)} className="mt-4 w-full">
              Add to Cart
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white p-6 rounded-xl shadow text-center">
        <h3 className="text-2xl font-bold mb-2">Cart Summary</h3>
        <p className="text-xl">Total: {total} DA</p>
        <Button className="mt-4">Proceed to Checkout</Button>
      </div>
    </div>
  );
}
