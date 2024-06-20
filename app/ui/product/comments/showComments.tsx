import CommentCard from "@/app/ui/product/comments/commentCard";
import { useState } from "react";
import Pagination from "@/app/ui/catalogo/pagination";

// import { getCommentsPages, getCommentsByPage } from "@/app/lib/queries"
import { getCommentsPages, getCommentsByPage } from "@/app/lib/queries_local"

export default async function ShowComments({
    related_product_id,
    currentPage,
}: {
    related_product_id: string,
    currentPage: number,
}) {
    const comments = await getCommentsByPage(related_product_id, currentPage);
    const totalPages = await getCommentsPages(related_product_id);
	// console.log(comments);

    return (
        <>
            {
                (comments.length == 0) ? (
                    <section className="text-gray-600 dark:text-gray-500 body-font">
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