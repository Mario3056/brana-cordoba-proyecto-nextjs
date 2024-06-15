import { API_getAllCommentsForProduct } from '@/app/lib/queries'
// import { API_getAllCommentsForProduct } from '@/app/lib/queries_local'

export async function GET(request: Request, context: { params: Params }) {
	if (Number.isNaN(Number(context.params.id))) {
		/* error */
		return Response.json( { error: `Product ${context.params.id} does not exist` } );
	} else {
		const comments = await API_getAllCommentsForProduct(context.params.id);
		return Response.json( comments );
	}
}