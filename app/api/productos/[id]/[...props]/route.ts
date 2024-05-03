type Params = {
	properties: string[],
}

const filterByProps = (obj, props) => {
	let newObj = Object.create(obj.__proto__);
	let propsToKeep = Object.keys(obj).filter((p) => props.includes(p));
	for (let prop of propsToKeep) {
		newObj[prop] = obj[prop]
	}

	return newObj;
}

export async function GET(request: Request, context: { params: Params }) {
	/* fetch product by id |> filter by properties */
	const testProduct = { id: 1, name: "test", description: "description", price: 0.0, rating: 0.0, image: "/products/placeholder.png" };
	return Response.json( filterByProps(testProduct, context.params.props) );
}