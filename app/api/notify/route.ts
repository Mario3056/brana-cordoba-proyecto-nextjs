import { NextRequest } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

// Credencial de produccion del usuario de prueba (Vendedor)
const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MERCADO_PAGO_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req
      .json()
      .then((data) => data as { data: { id: string } });
    const payment = await new Payment(client).get({ id: body.data.id });

    const pagoRealizado = {
      id: payment.id,
      amount: payment.transaction_amount,
      status: payment.status,
    };

    console.log( "pagoRealizado: ", pagoRealizado );

    /** Ahora tendriamos que agregar el pagoRealizado a la base de datos,
     * hay que analizar el campo status:
     * - "approved" - el pago fue acreditado, por lo que habría que guardarlo.
     * - "charged_back" - se le retorno el dinero al cliente, por lo que habría que borrarlo de la base de datos.
     */

    //return Response.json({ success: true });
    return new Response(JSON.stringify({ payment }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
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
