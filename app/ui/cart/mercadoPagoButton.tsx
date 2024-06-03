"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useCartStore } from "@/app/lib/cart/useCartStore";

/**
 * States:
 * - needs_link: requiere generar link de mercado pago
 * - loading_link: generando link de mercado pago
 * - link_ready: link de mercado pago listo
 */
export default function MercadoPagoButton() {
  const [url, setUrl] = useState<undefined | string>(undefined);
  const [buttonState, setButtonState] = useState("needs_link");
  const carrito = useCartStore((state) => state.cart);

  useEffect(() => {
    setButtonState("needs_link");
  }, [carrito]);

  const generateLink = async () => {
    if (carrito.length !== 0) {
      try {
        const { data: preference } = await axios.post("/api/checkout", {
          carrito,
        });
        setUrl(preference.url);
        setButtonState("link_ready");
      } catch (error) {
        setButtonState("needs_link");
        console.log(error);
      }
    } else{
      setButtonState("needs_link");
    }
  };

  const handleButtonClick = async () => {
    setButtonState("loading_link");
    await generateLink(); 
  };

  let buttonElement;
  if (buttonState === "needs_link") {
    buttonElement = (
      <button onClick={handleButtonClick}>
        <a
          className={`w-auto inline-block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100`}
        >
          Buy
        </a>
      </button>
    );
  } else if (buttonState === "loading_link") {
    buttonElement = (
      <button>
        <a
          className={`w-auto inline-block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100`}
        >
          <span className="loading loading-dots loading-sm" />
        </a>
      </button>
    );
  } else if (buttonState === "link_ready") {
    buttonElement = (
      <>
        <Link
          className={`w-auto inline-block rounded bg-gray-700 px-5 py-3
                                                  text-sm text-gray-100 transition hover:bg-gray-600`}
          href={url!}
        >
          Checkout
        </Link>
      </>
    );
  }

  return (
    <div className="flex justify-end">
      {buttonElement}
    </div>
  );
}
