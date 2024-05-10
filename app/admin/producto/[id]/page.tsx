import StarPicker from '@/app/ui/starPicker';

// TODO: fetch del id del producto |> render de skeletons de cada campo del form |> cuando llegan los datos reales, escribirlos en cada campo para ser editados
// TODO: el mismo formulario se puede usar para un producto nuevo - como diferenciarlo? con dos endpoints distintos, pasando el formulario a que sea un componente e.g. app/ui/admin/productEditForm.tsx?

export default function ProductEditor() {
	return (
		<main id="loginContainer" className="flex justify-center">
			<form id="productEditor" className="flex flex-col border border-black py-4 px-8 my-8 rounded">
				<h1 className="text-lg font-bold">Editar producto: {/* product.name */ }</h1>
				
				<input type="text" name="name" className="grow input input-bordered my-2" placeholder="Nombre del producto" autoFocus />
				<textarea id="productDescription" name="description" className="my-2 textarea textarea-bordered"
						  placeholder="Descripción elocuente y util para el usuario"></textarea>
				<input type="text" name="category" className="grow input input-bordered my-2" placeholder="Categoria" />
				<label className="input input-bordered flex items-center gap-2 my-2">
					<p className="font-bold">$</p>
					<input type="number" id="productPrice" name="price" step="0.01" placeholder="Precio del producto"
						   className=""/> {/* multiply by 100 in the server action that receives this (or, ideally here, with onsubmit and some clientside JS) */}
				</label>
				
				<div className="border border-grey rounded p-4 flex flex-row my-2">
					<p className="font-bold">Puntuación: </p>
					<StarPicker />
				</div>
				
				{ /* image selector */ }
				<div className="input input-bordered my-2 flex justify-center items-center">
					<p className="font-bold"> Seleccionar imagen </p>
				</div>
				
				<button className="btn btn-info sm:btn-sm md:btn-md">Submit</button>
			</form>
		</main>
	);
 }