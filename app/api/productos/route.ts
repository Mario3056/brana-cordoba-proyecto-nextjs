export async function GET(request: Request) {
	return Response.json( {
		url: request.url
	});
}