import { renderPriceWithDiscount } from '@/app/lib/utils';
import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextRequest } from "next/server";
import { CartProduct } from "@/app/lib/types";

const { randomUUID } = await import('node:crypto');

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
	
	const productIDs = carrito.map(i => i.id);
	console.log("productIDs = ", productIDs);

    const itemsList = carrito.map(producto => {
      const {hasDiscount, priceAfterDiscount } = renderPriceWithDiscount(producto.price, producto.discount);

      return {
        id: producto.id,
        title: producto.name,
        quantity: producto.quantity,
        unit_price: (priceAfterDiscount/100),
      }
    })
	
	const sale_record_UUID = randomUUID();
	console.log("sale_record_UUID = ", sale_record_UUID);
	
	// store to DB

    const preference = await new Preference(client).create({
      body: {
        items: itemsList,
        auto_return: "approved",
		external_reference: sale_record_UUID,
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
