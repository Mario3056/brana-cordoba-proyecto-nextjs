import { getCommentsByPage } from "@/app/lib/queries_local"
import CommentCard from "@/app/ui/product/comments/commentCard";

export default async function ShowComments({
    related_product_id,
    currentPage,
}: {
    related_product_id: string,
    currentPage: number
}) {
    const comments = await getCommentsByPage(related_product_id, currentPage);

    return (
        <div className="flex flex-wrap -m-4">
            {comments.map((comment, index) => (
                <CommentCard key={'comment-' + index} comment={comment}/>
            ))}
        </div>
    )
}