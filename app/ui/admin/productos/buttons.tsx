'use client';

import { deleteProduct, restoreProduct } from "@/app/lib/actions";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function disableAfterOneClick(event: any) {
	if ( event.currentTarget.classList.contains("disabled")) {
		event.preventDefault();
	} else {
		event.currentTarget.classList.add("disabled");
	}
}

export function CreateProductButton() {
	return <Link href={`/admin/producto/crear`} tabindex={0}
			className={`inline-block px-4 py-2 text-white duration-150 font-medium
					   bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700
					   md:text-sm focus:border focus:border-4 focus:border-yellow-400`}>
				Agregar Producto
		</ Link>

}

export function EditProductButton({ id }: { id: string }) {
	return <Link href={`/admin/producto/editar/${id}`} onClick={disableAfterOneClick}
			className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
			Editar
		</ Link>
}

export function RestoreDeletedProductButton({ id }: { id: string }) {
	const pathname = usePathname();
	const fullRestore = restoreProduct.bind(null, pathname).bind(null, id);
	
	// TODO: confirm dialog
	// TODO: remove from the list once the product is restored?
	return (
		<form action={fullRestore}>
			<button
				className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
				onClick={(e) => e.currentTarget.setAttribute("disabled", "true")}>
				
				Restaurar producto				
			</button>
		</form>
	);
}

export function DeleteProductButton({ id }: { id: string }) {
	const deleteProductWithId = deleteProduct.bind(null, id);
	
	// TODO: confirm dialog
	// TODO: "undo delete" dialog (maybe with react-toastify)
	
	return (
		<form action={deleteProductWithId}>
			<button
				className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
				onClick={(e) => e.currentTarget.setAttribute("disabled", "true")}>
				
				Eliminar
			</button>
		</form>
	);
}
