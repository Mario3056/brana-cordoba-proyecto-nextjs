// import { getProductsByPage, getFilteredProductsByPage } from "@/app/lib/queries_local";
import { getProductsByPage, getFilteredProductsByPage } from "@/app/lib/queries";

import {
    CreateProductButton,
    EditProductButton,
    DeleteProductButton,
    TriggerDeleteConfirmModal,
    CloseModalButton
} from "@/app/ui/admin/productos/buttons";
import Link from 'next/link';
import Image from 'next/image';
import { renderPriceWithDiscount } from "@/app/lib/utils";

export default async function Table({
    query,
    currentPage
}: {
    query: string;
    currentPage: number
}) {
    const products = (query == '')
        ? await getProductsByPage(currentPage)
        : await getFilteredProductsByPage(currentPage, query)
    ;

    return (
        <>
            <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
                <div className="flex justify-end mt-7 mb-3">
                    <CreateProductButton />
                </div>
                <ul className="mt-12 space-y-6">
                    {
                        products.map((product, idx) => (
                            <li key={idx} className="p-5 bg-white rounded-md shadow-sm">
                                <div>
                                    <div className="justify-between sm:flex">
                                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                                            <Image className="w-full rounded-md h-32 lg:w-32 md:w-32 sm:w-32 object-cover" src={product.image} alt={product.description} width={600} height={450} />
                                        </div>
                                        <div className="flex-1">
                                            <Link aria-label={"Ver datos del producto " + product.name} className="text-xl font-medium text-indigo-600 hover:underline" href={`/admin/producto/${product.id}`}> {product.name} </Link>
                                            <p className="text-gray-600 mt-2 pr-2">
                                                {product.category}
                                            </p>
                                            <div className="mt-4 items-center space-y-4 text-sm sm:flex sm:space-x-4 sm:space-y-0">
                                                <span className="flex items-center text-gray-500">
                                                    <svg className="w-[20px] h-[20px] text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                                    </svg>
                                                    {"$" + product.price / 100}
                                                </span>
                                                <span className="flex items-center text-gray-500">
                                                    <svg className="w-[20px] h-[20px] text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeWidth="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                                                    </svg>
                                                    {product.rating}
                                                </span>
                                                {(renderPriceWithDiscount(product.price, product.discount).hasDiscount) ? (
                                                    <span className="flex items-center text-gray-500">
                                                        <svg className="w-[20px] h-[20px] text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z" />
                                                        </svg>
                                                        {renderPriceWithDiscount(product.price, product.discount).renderedDiscountText}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="mt-5 space-y-4 text-sm sm:mt-0 sm:space-y-2">
                                            <div className="text-right px-6 whitespace-nowrap">
                                                <EditProductButton id={product.id} />
                                                <TriggerDeleteConfirmModal modal_id={"delete_modal" + product.id} />
                                            </div>

                                            <div>
                                                <dialog id={"delete_modal" + product.id} className="modal">
                                                    <div className="modal-box flex flex-col content-center">
                                                        <p className="mb-4">Seguro que desea eliminar el producto <span className="font-bold underline"> {product.name} </span>? </p>
                                                        <DeleteProductButton id={product.id} />
                                                        <CloseModalButton modal_id={"delete_modal" + product.id} />
                                                    </div>
                                                </dialog>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </li>
                        ))
                    }
                </ul>
            </section>
        </>
    )
}