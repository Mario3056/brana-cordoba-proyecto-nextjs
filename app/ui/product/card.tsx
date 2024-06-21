import StarRating from '@/app/ui/starRating';
import Image from 'next/image';
import { AddToCartButton } from '@/app/ui/product/buttons';
import TitleEffect from '@/app/ui/setTitle';

// import { getProductById, getAvgRating } from '@/app/lib/queries_local';
import { getProductById, getAvgRating } from '@/app/lib/queries';

export default async function Card({ product_id }: { product_id: string }) {
    const product = await getProductById(product_id);
    const avgRating = await getAvgRating(product_id);
	
	const hasDiscount = (product.discount == 0.0);
	const renderDiscountText = Math.floor(product.discount*100) + "% OFF!";
	const discountedPrice = ((product.price / 100) - ((product.price / 100)*product.discount)).toFixed(2);
	const renderedPrice = (product.price / 100);
	
    return (
        <section className="text-gray-600 body-font overflow-hidden">
			<TitleEffect title={product.name} />
            <div className="container px-5 pt-20 pb-12 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">

                    <Image alt={product.description} width={600} height={300}
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                        src={product.image} />

                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 dark:text-gray-400 tracking-widest">{product.category}</h2>
                        <h1 className="text-gray-900 dark:text-gray-300 text-3xl title-font font-medium mb-1">{product.name}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <StarRating rating={avgRating} />
                                <span className="text-gray-600 dark:text-gray-500 ml-3">Puntuación promedio</span>
                            </span>
                        </div>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <p className="leading-relaxed dark:text-gray-400">{product.description}</p>
                        </div>
						
                        <div className="flex">
							{ (product.discount == 0.0) ?
									<span className="title-font font-medium text-2xl text-gray-900 dark:text-gray-300">{"$" + (product.price / 100)}</span>
								:
									<div>
										<span className="title-font font-medium text-2xl text-gray-300 dark:text-gray-900 pr-2 line-through">{"$" + renderedPrice}</span>
										<span className="title-font font-medium text-2xl text-gray-900 dark:text-gray-300 pr-2">{"$" + discountedPrice}</span>
									</div>
							}
							
                            <AddToCartButton product={product} />
                        </div>
						
						{ !hasDiscount && <p className="text-lg text-gray-900 dark:text-gray-300">{renderDiscountText}</p> }
                    </div>
                </div>
            </div>
        </section>
    )
}