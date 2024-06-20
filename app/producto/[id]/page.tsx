import Card from '@/app/ui/product/card';
import AddNewCommentForm from '@/app/ui/product/comments/addNewForm';
import ShowComments from '@/app/ui/product/comments/showComments';
import { Suspense } from 'react';
import CommentsSkeleton from '@/app/ui/product/comments/commentsSkeleton';
import ProductSkeleton from '@/app/ui/product/productSeketon';

export default async function Producto({
    params,
    searchParams
}: {
    params: { id: string },
    searchParams: { page?: number }
}) {
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <>
            <Suspense fallback={<ProductSkeleton />}>
                <Card product_id={params.id} />
            </Suspense>

            <section className="text-gray-600 body-font">
                <div className="container pt-5 pb-15 py-5 mx-auto">
                    <Suspense fallback={<CommentsSkeleton />}>
                        <div className="flex flex-col text-center w-full mb-20">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 dark:text-gray-300">Comentarios</h1>

                        </div>
                        <ShowComments related_product_id={params.id} currentPage={currentPage} />
                    </Suspense>
                </div>
            </section>

            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-gray-300">Agregar comentario</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base dark:text-gray-500">Nos encantaría conocer tu opinión. Por favor, comparte tus comentarios y opiniones sobre el producto.</p>
                    </div>
                    <AddNewCommentForm product_id={params.id} />
                </div>
            </section>
        </>
    )
}