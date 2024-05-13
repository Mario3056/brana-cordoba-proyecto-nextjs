import { getRandomProducts } from "../lib/queries_local"

export default async function RandomProducts(){
	const products = await getRandomProducts();

    return (
        <>
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
        </>
    )
}