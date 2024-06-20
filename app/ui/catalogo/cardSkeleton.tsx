import { Product } from '@/app/lib/types';

export default function CardSkeleton() {
    return (
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
			<div className="group block overflow-hidden">

                <div className="skeleton h-[350px] w-full object-cover sm:h-[450px]"></div>

                <div className="relative bg-white dark:bg-base-100 pt-3"> 
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-40 mt-3"></div>
                </div>
            </div>
        </div>
    );
}