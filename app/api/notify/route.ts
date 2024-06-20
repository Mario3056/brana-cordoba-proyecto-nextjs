import { NextRequest } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import type { PaymentInformation } from '@/app/lib/types.d';

// import { storePayment } from '@/app/lib/actions';
import { storePayment } from '@/app/lib/actions_local';

// Credencial de produccion del usuario de prueba (Vendedor)
const client = new MercadoPagoConfig({
	accessToken: process.env.NEXT_PUBLIC_MERCADO_PAGO_TOKEN!,
});

export async function POST(req: NextRequest) {
	try {
		const body = await req
			.json()
			.then((data) => data)
		;

		// console.log("Request data:");
		// console.log(body);
		// console.log("\n");
		
		if (body.type && body.type === 'payment') {
			const payment = await new Payment(client).get({ id: body.data.id });
			console.log("Response data:");
			console.log(payment);
			console.log("\n");
			
			if (!payment.id || !payment.transaction_amount || !payment.status) {
				throw new Error('Invalid payment data');
			}

			const pagoRealizado: PaymentInformation = {
				id: String(payment.id),
				amount: payment.transaction_amount,
				status: payment.status,
				timestamp: Date.now()
			};

			console.log( "pagoRealizado: ", pagoRealizado, "\n" );
			
			/**
			 * https://www.mercadopago.com.ar/developers/en/reference/payments/_payments_id/get
			 * campo status:
			 *  pending: The user has not concluded the payment process (for example, by generating a payment by boleto, it will be concluded at the moment in which the user makes the payment in the selected place).
			 *  approved: The payment has been approved and credited.
			 *  authorized: The payment has been authorized but not captured yet.
			 *  in_process: The payment is in analysis.
			 *  in_mediation: The user started a dispute.
			 *  rejected: The payment was rejected (the user can try to pay again).
			 *  cancelled: Either the payment was canceled by one of the parties or expired.
			 *  refunded: The payment was returned to the user.
			 *  charged_back: A chargeback was placed on the buyer's credit card.
			 */
			 
			await storePayment(pagoRealizado);
			 
			return new Response(JSON.stringify({ payment }), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			});
		} else {
			// Other types: [ "Planes y suscripciones", "Split de pagos", "Vinculación de aplicaciones", "Integraciones Point", "Integraciones presenciales", "Envíos", "Delivery (proximity marketplace)", "Wallet Connect", "Alertas de fraude", "Reclamos", "Card Updater" ]
			// not all types have an attribute that say what type it is e.g. "Delivery (proximity marketplace)"	
			
			return new Response(JSON.stringify({}), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}
	
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
