'use client';

import StarPicker from '@/app/ui/starPicker';
import { Product, emptyProduct } from '@/app/lib/types';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import Image from 'next/image';

import { usePathname } from 'next/navigation';
import { placeholderProduct } from '@/app/lib/types.d';
import type { ProductFormState } from '@/app/lib/types.d';

// TODO: definir formato de ProductEditForm -> definir skeleton
export default function ProductEditForm ( { product, serverAction } : { product?: Product, serverAction: any } ) {
	const [showZoom, setShowZoom] = useState(false);
	const [showPreview, setShowPreview] = useState(false);

	if (product == undefined) {
		// ...
		product = placeholderProduct;
	}

	const initialState: ProductFormState = { message: '', errors: undefined };
	const [state, dispatch] = useFormState(serverAction, initialState);
	
	return (
		<form action={dispatch} id="productEditor" className="flex flex-col border border-black py-4 px-8 my-8 rounded">
			<h1 className="text-lg font-bold">Datos de producto:</h1>
			
			<input type="hidden" name="id" value={product.id} />
			<input type="hidden" name="created_at" value={product.created_at} />
			<input type="hidden" name="modified_at" value={product.modified_at} />
			
			<input type="text" name="name" aria-describedby="name-error"
					className="grow input input-bordered my-2" placeholder="Nombre del producto"
					defaultValue={product.name} autoFocus />
			<div id="name-error" aria-live="polite" aria-atomic="true">
				{state.errors?.name &&
					state.errors.name.map((error: string) => (
						<p className="mt-2 text-sm text-red-500 border-b-2 border-black mb-2 mt-1" key={error}>
							{error}
						</p>
					))
				}
			</div>
			
			<textarea id="productDescription" name="description" aria-describedby="description-error"
					  placeholder="Descripción del producto" defaultValue={product.description}
						className="my-2 textarea textarea-bordered" />
			<div id="description-error" aria-live="polite" aria-atomic="true">
				{state.errors?.description &&
					state.errors.description.map((error: string) => (
						<p className="mt-2 text-sm text-red-500 border-b-2 border-black mb-2 mt-1" key={error}>
							{error}
						</p>
					))
				}
			</div>
					  
			<input type="text" name="category" aria-describedby="category-error"
					  placeholder="Categoria del producto" defaultValue={product.category}
					  className="grow input input-bordered my-2" />
			<div id="category-error" aria-live="polite" aria-atomic="true">
				{state.errors?.category &&
					state.errors.category.map((error: string) => (
						<p className="mt-2 text-sm text-red-500 border-b-2 border-black mb-2 mt-1" key={error}>
							{error}
						</p>
					))
				}
			</div>
					  
			<label className="input input-bordered flex items-center gap-2 my-2">
				<p className="font-bold">$</p>
				<input type="number" id="productPrice" name="price" aria-describedby="price-error"
						step="0.01" defaultValue={product.price / 100} placeholder="Precio" />
			</label>
			<div id="price-error" aria-live="polite" aria-atomic="true">
				{state.errors?.price &&
					state.errors.price.map((error: string) => (
						<p className="mt-2 text-sm text-red-500 border-b-2 border-black mb-2 mt-1" key={error}>
							{error}
						</p>
					))
				}
			</div>
			
			<div className="border border-grey rounded p-4 flex flex-row my-2">
				<p className="font-bold">Puntuación: </p>
				<StarPicker rating={product.rating}/>
			</div>
			
			{ /* image selector */ }
			<div className="input input-bordered my-2 flex  flex-col justify-center items-center">
				<p className="font-bold"> Seleccionar imagen</p>
				
				{/* <Image src={product.image} width={64} height={64} alt={product.description} id="zoom-preview"
						onMouseOver={() => setShowZoom(true)} onMouseOut={() => setShowZoom(false)} /> */ }
						
				<input type="file" name="image" aria-describedby="image-error"
					   accept="image/png, image/jpeg, image/avif, image/webp"
					   onChange={(e) => {
								{/* when a new image is uploaded, show a preview below */}
								setShowPreview(true);
								document.querySelector("#new-image-preview").src = URL.createObjectURL(e.target.files[0])
							}
						}
					   />
			</div>
			<div id="image-error" className="" aria-live="polite" aria-atomic="true">
				{state.errors?.image &&
					state.errors.image.map((error: string) => (
						<p className="mt-2 text-sm text-red-500 border-b-2 border-black mb-2 mt-1" key={error}>
							{error}
						</p>
					))
				}
			</div>
			
			{ /* --------------------- */ }
			
			<div id="image-preview-card" className="card border-b-2 p-4 bg-red-400 border-black mt-2">
				<Image src={product.image} width={256} height={256} alt="Vista previa de la imagen para el producto" hidden={showPreview}/>
				<Image id="new-image-preview" src={""} width={256} height={256} alt="Vista previa de la imagen para el producto" hidden={!showPreview}/>
			</div>
			
			{/* first attempt: showZoom + onMouseOver event on the image with #zoom-preview id */}
			{ showZoom && 
				<div id="image-zoom" className="card border-b-2 p-4 bg-red-400 border-black" style={{
					position: 'absolute',					
				}}>
					<Image src={product.image} width={256} height={256} alt="Vista previa de la imagen para el producto" />
				</div>
			}
			
			{ /* --------------------- */ }
			
			<button className="btn btn-info sm:btn-sm md:btn-md">Submit</button>
		</form>
	);
}