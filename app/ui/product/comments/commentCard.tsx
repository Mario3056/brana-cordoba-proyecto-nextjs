import StarRating from '@/app/ui/starRating';
import { ProductComment } from "@/app/lib/types.d";

export default function CommentCard({comment}: {comment: ProductComment}) {
    return (
        <>
            <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                    <div className="flex items-center mb-3">
                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <h2 className="text-gray-900 text-lg title-font font-medium">{comment.name}</h2>
                    </div>
                    <StarRating rating={comment.rating} />
                    <div className="flex-grow mt-2">
                        <p className="leading-relaxed text-base">{comment.content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}