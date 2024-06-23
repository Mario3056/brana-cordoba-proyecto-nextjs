import { AddToCartButton } from '@/app/ui/product/buttons';
import { renderPriceWithDiscount } from '@/app/lib/utils';
import StarRating from '@/app/ui/starRating';
import TitleEffect from '@/app/ui/setTitle';
import Image from 'next/image';

function renderDescription(description: string) {
		console.log("~~~~~~<>~~~~~~");
		console.log(description);
		console.log("~~~~~~<>~~~~~~");
		console.log(description.replaceAll("\t", "").replaceAll("\\r", "\n").replaceAll("\r\n", "\n").replaceAll("\\n", "\n").split("\n"));
		console.log("~~~~~~**~~~~~~");
	return description.replaceAll("\t", "").replaceAll("\\r", "\n").replaceAll("\r\n", "\n").replaceAll("\\n", "\n").split("\n")
					  .map( (line, i) => <p key={i} className="leading-relaxed dark:text-gray-400"> {line} </p>
	);
}

// import { getProductById, getAvgRating } from '@/app/lib/queries_local';
import { getProductById, getAvgRating } from '@/app/lib/queries';

export default async function Card({ product_id }: { product_id: string }) {
    const product = await getProductById(product_id);
    const avgRating = await getAvgRating(product_id);
	
	const {
		renderedPrice,
		hasDiscount,
		renderedPriceAfterDiscount,
		renderedDiscountText
	} = renderPriceWithDiscount(product.price, product.discount);
	
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
                        <div className="mb-5 mt-6 pb-5"> {renderDescription(product.description)} </div>						
                        <div className="flex">
							{ !hasDiscount ?
									<span className="title-font font-medium text-2xl text-gray-900 dark:text-gray-300">{"$" + renderedPrice}</span>
								:
									<div>
										<span className="title-font font-medium text-2xl text-gray-400 dark:text-gray-600 pr-2 line-through">{"$" + renderedPrice}</span>
										<span className="title-font font-medium text-2xl text-gray-900 dark:text-gray-200 pl-2">{"$" + renderedPriceAfterDiscount}</span>
									</div>
							}
							
                            <AddToCartButton product={product} />
                        </div>
						
						{ hasDiscount && <p className="text-lg text-gray-900 dark:text-gray-300">{renderedDiscountText}</p> }
                    </div>
                </div>
            </div>
        </section>
    )
}