import { getCommentsByPage } from "@/app/lib/queries_local"
import CommentCard from "@/app/ui/product/comments/commentCard";
import { useState } from "react";
import Pagination from "@/app/ui/catalogo/pagination";

export default async function ShowComments({
    related_product_id,
    currentPage,
    totalPages
}: {
    related_product_id: string,
    currentPage: number,
    totalPages: number
}) {
    const comments = await getCommentsByPage(related_product_id, currentPage);

    return (
        <>
            {
                (comments.length == 0) ? (
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 mx-auto">
                            <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
                                <p className="leading-relaxed text-lg">Por el momento no hay comentarios.</p>
                                <p className="leading-relaxed text-lg">Sé el primero en comentar.</p>
                                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
                            </div>
                        </div>
                    </section>
                ) : (
                    <>
                        <div className="flex flex-wrap -m-4">
                            {comments.map((comment, index) => (
                                <CommentCard key={'comment-' + index} comment={comment} />
                            ))}
                        </div>
                        <div className="mb-5 mt-5 flex w-full justify-center">
                            <Pagination totalPages={totalPages} />
                        </div>
                    </>
                )
            }
        </>
    )
}