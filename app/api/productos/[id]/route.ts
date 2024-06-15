import { getProductById } from '@/app/lib/queries';
// import { getProductById } from '@/app/lib/queries_local';

import type { Product } from '@/app/lib/types.d';

type Params = {
	id: number,
};

export async function GET(request: Request, context: { params: Params }) {
	if (Number.isNaN(Number(context.params.id))) {
		/* error */
		return Response.json( { error: `Product ${context.params.id} does not exist` } );
	} else {
		const product: Product = await getProductById(context.params.id.toString());
		return Response.json( product );
	}
}