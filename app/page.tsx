

export default function Home() {
	return (
		<main>

			<section>
				<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
					<header>
						<p className="mt-4 text-center text-gray-500">
							¡Bienvenido a nuestra tienda online de artículos de computación! 
						</p>
						<p className="mt-4 text-center text-gray-500">
							Estamos emocionados de tenerte aquí. Sumérgete en nuestro catálogo y descubre una amplia gama de productos diseñados para satisfacer todas tus necesidades tecnológicas. Desde potentes ordenadores hasta accesorios innovadores, estamos seguros de que encontrarás exactamente lo que buscas.
						</p>
						<p className="mt-4 text-center text-gray-500">
							¡Explora nuestra selección y lleva tu experiencia informática al siguiente nivel!
						</p>
					</header>

					<ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						<li>
							<a href="#" className="group block overflow-hidden">
								<img
									src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg"
									alt=""
									className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
								/>

								<div className="relative bg-white pt-3">
									<h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
										Producto
									</h3>

									<p className="mt-2">
										<span className="tracking-wider text-gray-900"> $100.00 </span>
									</p>
								</div>
							</a>
						</li>

						<li>
							<a href="#" className="group block overflow-hidden">
								<img
									src="https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
									alt=""
									className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
								/>

								<div className="relative bg-white pt-3">
									<h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
										Producto
									</h3>

									<p className="mt-2">
										<span className="tracking-wider text-gray-900"> $100.00 </span>
									</p>
								</div>
							</a>
						</li>

						<li>
							<a href="#" className="group block overflow-hidden">
								<img
									src="https://images.pexels.com/photos/1619654/pexels-photo-1619654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
									alt=""
									className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
								/>

								<div className="relative bg-white pt-3">
									<h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
										Producto
									</h3>

									<p className="mt-2">
										<span className="tracking-wider text-gray-900"> $100.00 </span>
									</p>
								</div>
							</a>
						</li>

						<li>
							<a href="#" className="group block overflow-hidden">
								<img
									src="https://images.pexels.com/photos/51011/pexels-photo-51011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
									alt=""
									className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
								/>

								<div className="relative bg-white pt-3">
									<h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
										Producto
									</h3>

									<p className="mt-2">
										<span className="tracking-wider text-gray-900"> $100.00 </span>
									</p>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</section>
		</main>
	);
}
