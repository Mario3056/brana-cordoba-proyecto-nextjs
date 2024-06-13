import Link from 'next/link';
import Image from 'next/image';
import { RestoreDeletedProductButton, DefinitivelyDeleteButton } from '@/app/ui/admin/productos/buttons';

export default async function Table({products}) {
    return (
        <div className="max-w-fit mx-auto">
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
                                        <RestoreDeletedProductButton id={product.id} />
										<DefinitivelyDeleteButton id={product.id} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

