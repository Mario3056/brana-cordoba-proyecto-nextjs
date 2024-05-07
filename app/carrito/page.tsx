import Producto from "../ui/carrito/producto";


export default function Carrito() {
	return (
		<section>
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
				<div className="mx-auto max-w-3xl">
					<header className="text-center">
						<h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Carrito</h1>
					</header>

					<div className="mt-8">
						<ul className="space-y-4">
							<li className="flex items-center gap-4">
								<Producto />
							</li>

							<li className="flex items-center gap-4">
								<Producto />
							</li>

							<li className="flex items-center gap-4">
								<Producto />
							</li>
						</ul>

						<div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
							<div className="w-screen max-w-lg space-y-4">
								<dl className="space-y-0.5 text-sm text-gray-700">
									<div className="flex justify-between !text-base font-medium">
										<dt>Total</dt>
										<dd>$300.00</dd>
									</div>
								</dl>

								<div className="flex justify-end">
									<a
										href="#"
										className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
									>
										Checkout
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}