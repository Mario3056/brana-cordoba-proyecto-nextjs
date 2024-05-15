import  RandomProductsSkeleton  from "@/app/ui/randomProductsSkeleton";
import RandomProducts from "@/app/ui/randomProducts";
import { Suspense } from "react";

export default async function Home() {
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

					<Suspense fallback={<RandomProductsSkeleton />}>
						<RandomProducts />
					</Suspense>
				</div>
			</section>
		</main>
	);
}