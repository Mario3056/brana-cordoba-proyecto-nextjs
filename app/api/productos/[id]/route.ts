type Params = {
	id: number,
};

export async function GET(request: Request, context: { params: Params }) {
	return Response.json( {
		url: request.url,
		givenP: context.params.id,
	});
}