// import { getProductById } from '@/app/lib/queries';
import { getProductById } from '@/app/lib/queries_local';

import { Product } from '@/app/lib/types.d';

type Params = {
	id: string,
	props: string[],
}

const filterByProps = (obj: any, props: string[]) => {
	let newObj = Object.create(obj.__proto__); // Empty object created from the original object's prototype - if this is not needed, it's also valid to do Object.create(null);
	let propsToKeep = Object.keys(obj).filter((p) => props.includes(p));
	for (let prop of propsToKeep) {
		newObj[prop] = obj[prop]
	}

	return newObj;
}

export async function GET(request: Request, context: { params: Params }) {
	if (Number.isNaN(Number(context.params.id))) {
		/* error */
	} else {
		const product: Product = await getProductById(context.params.id.toString());
		return Response.json( filterByProps(product, context.params.props) );
	}
}