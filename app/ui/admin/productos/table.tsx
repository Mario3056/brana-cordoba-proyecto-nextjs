import { CreateProductButton, EditProductButton, DeleteProductButton } from "@/app/ui/admin/productos/buttons";
import { getProductsByPage, getFilteredProductsByPage } from "@/app/lib/queries_local";

import DeleteModal from './deleteModal';
import CloseModal from './closeModal';

import Link from 'next/link';
import Image from 'next/image';

export default async function Table({
    query,
    currentPage
}: {
    query: string;
    currentPage: number
}) {
    const products = (query == '')
		? await getProductsByPage(currentPage)
		: await getFilteredProductsByPage(currentPage, query);

    return (
        <div className="max-w-fit mx-auto px-4 md:px-8">		
            <div className="flex justify-end mt-7 mb-0">
                <div className="mb:mx-auto">
					<CreateProductButton />
                </div>
            </div>
            <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6"></th>
                            <th className="py-3 px-6">Nombre</th>
                            <th className="py-3 px-6">Categoria</th>
                            <th className="py-3 px-6">Rating</th>
                            <th className="py-3 px-6">Precio</th>
                            <th className="py-3 px-6"></th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            products.map((product) => (
								<tr key={product.id}>
                                    <td className="px-6 py-4">
                                        <div className="container w-16">
                                            <Image src={product.image} height={64} width={64} alt={product.description} className="rounded-lg h-16 w-16" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link className="text-blue-400 font-bold underline" href={`/admin/producto/${product.id}`}> {product.name} </Link>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.rating}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{"$" + product.price / 100}</td>
                                    <td className="text-right px-6 whitespace-nowrap">
										<EditProductButton id={product.id} />
										<DeleteModal product={product} />
                                    </td>
									<td> <dialog id={"delete_modal"+product.id} className="modal">
										<div className="modal-box flex flex-col content-center">
											<p className="mb-4">Seguro que desea eliminar el producto <span className="font-bold underline"> {product.name} </span>? </p>
											<DeleteProductButton modal_id={"delete_modal"+product.id} />
											<CloseModal modal_id={"delete_modal"+product.id} />
										</div>
									</dialog> </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

