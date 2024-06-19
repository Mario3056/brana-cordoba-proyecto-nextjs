"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useCartStore } from "@/app/lib/cart/useCartStore";
import { useRouter } from "next/navigation";

/**
 * States:
 * - initial_button: requiere generar link de mercado pago
 * - loading_button: generando link de mercado pago
 */
export default function MercadoPagoButton() {
  const [buttonState, setButtonState] = useState("initial_button");
  const carrito = useCartStore((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    setButtonState("initial_button");
  }, [carrito]);

  const generateLink = async () => {
    if (carrito.length !== 0) {
      try {
        const { data: preference } = await axios.post("/api/checkout", {
          carrito,
        });
        router.push(preference.url);
      } catch (error) {
        setButtonState("initial_button");
        console.log(error);
      }
    } else {
      setButtonState("initial_button");
    }
  };

  const handleButtonClick = async () => {
    setButtonState("loading_button");
    await generateLink();
  };

  let buttonElement;
  if (buttonState === "initial_button") {
    buttonElement = (
      <button onClick={handleButtonClick}>
        <a
          className={`w-auto inline-block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100`}
        >
          Buy
        </a>
      </button>
    );
  } else if (buttonState === "loading_button") {
    buttonElement = (
      <button>
        <a
          className={`w-auto inline-block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100`}
        >
          <span className="loading loading-dots loading-sm" />
        </a>
      </button>
    );
  } 

  return (
    <div className="flex justify-end">
      {buttonElement}
    </div>
  );
}
