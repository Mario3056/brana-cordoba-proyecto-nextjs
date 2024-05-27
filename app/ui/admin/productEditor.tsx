'use client';

import StarPicker from '@/app/ui/starPicker';
import { Product, emptyProduct } from '@/app/lib/types';
import { useFormState } from 'react-dom';
import Image from 'next/image';

// TODO: definir formato de ProductEditForm -> definir skeleton
export default function ProductEditForm ( { product, serverAction } : { product?: Producto, serverAction: any } ) {
	const initialState = { message: '', errors: {} };
	const [state, dispatch] = useFormState(serverAction, initialState);
	console.log(product.rating);
	
	return (
		<form action={dispatch} id="productEditor" className="flex flex-col border border-black py-4 px-8 my-8 rounded">
			<h1 className="text-lg font-bold">Datos de producto:</h1>
			
			<input type="text" name="name" className="grow input input-bordered my-2" defaultValue={product.name} autoFocus />
			<textarea id="productDescription" name="description" className="my-2 textarea textarea-bordered"
					  defaultValue={product.description} />
			<input type="text" name="category" className="grow input input-bordered my-2" defaultValue={product.category} />
			<label className="input input-bordered flex items-center gap-2 my-2">
				<p className="font-bold">$</p>
				<input type="number" id="productPrice" name="price" step="0.01" defaultValue={product.price / 100}
					   className=""/>
			</label>
			
			<div className="border border-grey rounded p-4 flex flex-row my-2">
				<p className="font-bold">Puntuación: </p>
				<StarPicker rating={product.rating}/>
			</div>
			
			{ /* image selector */ }
			<div className="input input-bordered my-2 flex justify-center items-center">
				<p className="font-bold"> Seleccionar imagen</p>
				<Image src={product.image} width={64} height={64} />
				<input type="file" name="image" accept="image/png, image/jpeg, image/avif, image/webp" />
			</div>
			
			<button className="btn btn-info sm:btn-sm md:btn-md">Submit</button>
		</form>
	);
}