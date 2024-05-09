import AddToCart from  '@/app/ui/carrito/addToCart';
export default function CartTest() {

	return (
		<section className="flex content-center justify-center">
			<form className="grid grid-cols-2 grid-rows-2">
				<div className="border border-black rounded p-2 m-4">
					<h1>ID = 8192</h1>
					<AddToCart productId="8192" />
				</div>

				<div className="border border-black rounded p-2 m-4">
					<h1>ID = 8193</h1>
					<AddToCart productId="8193" />
				</div>

				<div className="border border-black rounded p-2 m-4">
					<h1>ID = 8194</h1>
					<AddToCart productId="8194" />
				</div>

				<div className="border border-black rounded p-2 m-4">
					<h1>ID = 8195</h1>
					<AddToCart productId="8195" />
				</div>

				<div className="border border-black rounded p-2 m-4">
					<h1>ID = 8196</h1>
					<AddToCart productId="8196" />
				</div>

				<div className="border border-black rounded p-2 m-4">
					<h1>ID = 8197</h1>
					<AddToCart productId="8197" />
				</div>

			</form>

		</section>
	);

}