import CommentSkeleton from "./commentSkeleton";

export default function CommentsSkeleton(){
    return (
        <div className="flex flex-wrap -m-4">
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
        </div>
    );
}