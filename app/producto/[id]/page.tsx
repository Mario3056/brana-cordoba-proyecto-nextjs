import { getCommentsPages, getProductById } from '@/app/lib/queries_local'
import Card from '@/app/ui/product/card';
import { ProductComment } from '@/app/lib/types';
import AddNewCommentForm from '@/app/ui/product/comments/addNewForm';
import ShowComments from '@/app/ui/product/comments/showComments';
import Pagination from '@/app/ui/catalogo/pagination';
import { Suspense } from 'react';
import CommentsSkeleton from '@/app/ui/product/comments/commentsSkeleton';

export default async function Producto({
    params,
    searchParams
}: {
    params: { id: string },
    searchParams: { page?: number }
}) {
    const product = await getProductById(params.id);
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await getCommentsPages(params.id);

    return (
        <>
            <Card product={product} />

            <section className="text-gray-600 body-font">
                <div className="container pt-5 pb-15 py-5 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Comentarios</h1>

                    </div>
                    <Suspense fallback={<CommentsSkeleton/>}>
                        <ShowComments related_product_id={product.id} currentPage={currentPage} />
                        <div className="mb-5 mt-5 flex w-full justify-center">
                            <Pagination totalPages={totalPages} />
                        </div>
                    </Suspense>
                </div>
            </section>

            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Agregar comentario</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Nos encantaría conocer tu opinión. Por favor, comparte tus comentarios y opiniones sobre el producto.</p>
                    </div>
                    <AddNewCommentForm product_id={product.id} />
                </div>
            </section>
        </>
    )
}