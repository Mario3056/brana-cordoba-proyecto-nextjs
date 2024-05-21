
import { getProductsByPage, getFilteredProductsByPage } from "@/app/lib/queries_local";

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
                <a
                        href="#"
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add product
                    </a>
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
                                            <img src={product.image} className="rounded-lg h-16 w-16" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product.name}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.rating}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{"$" + product.price / 100}</td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <a href="#" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Edit
                                        </a>
                                        <button className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Delete
                                        </button>
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