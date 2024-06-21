import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextRequest } from "next/server";
import { CartProduct } from "@/app/lib/types";

// Credencial de produccion del usuario de prueba (Vendedor) 
const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MERCADO_PAGO_TOKEN!,
});

let URL: string;
if (process.env.VERCEL_ENV == "production") {
	URL = "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL;
} else if (process.env.VERCEL_ENV == "preview" || process.env.VERCEL_ENV == "development") {
	URL = "https://" + process.env.VERCEL_URL;
} else {
	URL = "http://localhost:3000";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const carrito: CartProduct[] = body.carrito;

    const itemsList = carrito.map(producto => {
      const hasDiscount = (producto.discount != undefined) && (producto.discount != null) && (producto.discount != 0.0);
	    const resultedPrice = (!hasDiscount) ? producto.price : Math.trunc(producto.price - (producto.price * producto.discount));

      return {
        id: producto.id,
        title: producto.name,
        quantity: producto.quantity,
        unit_price: (resultedPrice/100),
      }
    })

    const preference = await new Preference(client).create({
      body: {
        items: itemsList,
        auto_return: "approved",
        back_urls: {
          success: URL + "/api/postcompra",
          failure: URL + "/api/postcompra",
          pending: URL + "/api/postcompra",
        },
      },
    });

    return new Response(
      JSON.stringify({ url: preference.init_point }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
