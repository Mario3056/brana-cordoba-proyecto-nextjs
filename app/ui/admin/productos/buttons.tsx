'use client';

import { deleteProduct, restoreProduct, definitivelyDeleteProduct } from "@/app/lib/actions";
// import { deleteProduct, restoreProduct, definitivelyDeleteProduct } from "@/app/lib/actions_local";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

function disableAfterOneClick(event: any) {
	console.log("disableAfterOneClick:", event.target);
	if ( event.currentTarget.classList.contains("disabled")) {
		event.preventDefault();
	} else {
	/*
		event.currentTarget.classList.add("disabled");
		event.currentTarget.classList.add("text-blue-400");
	*/
	}
}

export function CreateProductButton() {
	return <Link href={`/admin/producto/crear`} tabIndex={0}
			className={`inline-block px-4 py-2 text-white duration-150 font-medium
					   bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700
					   md:text-sm focus:border focus:border-yellow-400`}>
				Agregar Producto
		</ Link>

}

export function EditProductButton({ id }: { id: string }) {
	return <Link href={`/admin/producto/editar/${id}`} onClick={disableAfterOneClick}
			className="py-2 px-3 font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 duration-150 hover:bg-gray-50 dark:hover:bg-gray-200 rounded-lg">
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

function disableModalAndDelete(id: string, event: any) {
	disableAfterOneClick(event);

	// console.log(event.target);
	// const product_id = event.target.getAttribute("modalid");
	const modal: HTMLDialogElement | null = document.getElementById("delete_modal" + id) as HTMLDialogElement;
	if (modal != null) modal.close();
}

export function DeleteProductButton({ id }: { id: string }) {
	const deleteProductWithId = deleteProduct.bind(null, id);
	const deleteButtonClickHandler = disableModalAndDelete.bind(null, id);
	return (
		<form action={deleteProductWithId}>
			<button onClick={deleteButtonClickHandler}
				className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
				
				Eliminar
			</button>
		</form>
	);
}

export function CloseModalButton({modal_id}: {modal_id: string}) {
	return <button onClick={(event) => {
					const modal: HTMLDialogElement | null = document.getElementById(modal_id) as HTMLDialogElement;
					if (modal != null) modal.close();
				}}
					className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
				X
			</button>;
}

export function TriggerDeleteConfirmModal({modal_id}: {modal_id: string}) {
	return <button onClick={(event) => {
					// console.log(event.target, "------>", modal_id);
					const modal: HTMLDialogElement | null = document.getElementById(modal_id) as HTMLDialogElement;
					if (modal != null) modal.showModal();
				}}
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