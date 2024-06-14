'use client';

// import { deleteProduct, restoreProduct, definitivelyDeleteProduct } from "@/app/lib/actions";
import { deleteProduct, restoreProduct, definitivelyDeleteProduct } from "@/app/lib/actions_local";

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
	
	return (
		<form action={fullRestore}>
			<button onClick={disableAfterOneClick}
				className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
				
				Restaurar producto				
			</button>
		</form>
	);
}

export function DeleteProductButton({ id }: { id: string }) {
	const deleteProductWithId = deleteProduct.bind(null, id);

	return (
		<form action={deleteProductWithId}>
			<button onClick={disableAfterOneClick}
				className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
				
				Eliminar
			</button>
		</form>
	);
}

export function CloseModalButton({modal_id}) {
	return <button onClick={(e) => document.getElementById(modal_id).close()}
				className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
				X
			</button>;
}

export function TriggerDeleteConfirmModal({modal_id}) {
	return <button onClick={(event) => { document.getElementById(modal_id).showModal(); }}
					className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
				Eliminar
			</button>;
}

export function DefinitivelyDeleteButton({ id }: { id: string }) {
	const definitivelyDeleteWithId = definitivelyDeleteProduct.bind(null, id);
	
	return (
		<form action={definitivelyDeleteWithId}>
			<button onClick={disableAfterOneClick}
				className="py-2 leading-none px-3 font-medium text-red-800 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">				
				Eliminar <br/> definitivamente
			</button>
		</form>
	);
	
}