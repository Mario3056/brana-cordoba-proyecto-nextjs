'use client';

import Link from 'next/link';
import { deleteProduct } from "@/app/lib/actions";

function disableAfterOneClick(event) {
	if (event.target.classList.contains("disabled")) {
		event.preventDefault();
	} else {
		event.target.classList.add("disabled");
	}
}

export function CreateProductButton() {
	return <Link href={`/admin/producto/crear`}
			className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm">
			Agregar producto
		</ Link>

}

export function EditProductButton({id}) {
	return <Link href={`/admin/producto/editar/${id}`} onClick={disableAfterOneClick}
			className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
			Editar
		</ Link>
}

export function DeleteProductButton({ id }: { id: string }) {
	const deleteProductWithId = deleteProduct.bind(null, id);
	return (
	<form action={deleteProductWithId}>
		<button className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg" onClick={(e) => e.currentTarget.setAttribute("disabled", true)}>
			Eliminar
		</button>
	</form>
	);
	}
