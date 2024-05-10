// import { getProductById } from '@/app/lib/queries';
import { getProductById } from '@/app/lib/queries_local';

import type { Product } from '@/app/lib/types.d';

type Params = {
	id: number,
};

export async function GET(request: Request, context: { params: Params }) {
	if (Number.isNaN(Number(context.params.id))) {
		/* error */
	} else {
		const product: Product = await getProductById(context.params.id.toString());
		return Response.json( product );
	}
}