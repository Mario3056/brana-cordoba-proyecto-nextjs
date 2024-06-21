/**
 * This function renders the price for use in the application and optionally applies a discount if it has any
 * Use:
 * 
 * const product = await getProductById(id);
 * const renderedPriceInfo = renderPriceWithDiscount(product.price, product.discount);
 * if (renderedPriceInfo.hasDiscount) {
 *     ...
 * }
 *
 * If hasDiscount is false, all fields except renderedPrice shouldn't be used
 * If you know there's no discount, consider using renderPrice(product.price) instead
 *
 * Return schema => {
 *  	renderedPrice: number,
 *  	hasDiscount: boolean,
 *  	priceAfterDiscount: number,
 *  	renderedPriceAfterDiscount: number,
 *  	renderedPriceAfterDiscount: string
 *  }
 *
 * e.g. renderPriceWithDiscount(819264, 0.2) ->
 *  {
 *  	renderedPrice: 8192.64,
 *  	hasDiscount: true,
 *  	priceAfterDiscount: 655411,
 *  	renderedPriceAfterDiscount: 6554.11,
 *  	renderedDiscountText: "20% OFF!"
 *  }
*/
export function renderPriceWithDiscount(price: number, discount?: number) {
	const renderedPrice = (price / 100);
	const hasDiscount = (discount != undefined) && (discount != null) && (discount != 0.0);
	const priceAfterDiscount = (!hasDiscount) ? price : Math.trunc(price - (price * discount));
	const renderedPriceAfterDiscount = (!hasDiscount) ? renderedPrice : ((price / 100) - ((price / 100)*discount)).toFixed(2);
	const renderedDiscountText = (!hasDiscount) ? "" : Math.floor(discount*100) + "% OFF!";
	
	return {
		renderedPrice: renderedPrice,
		hasDiscount: hasDiscount,
		priceAfterDiscount: priceAfterDiscount,
		renderedPriceAfterDiscount: renderedPriceAfterDiscount,
		renderedDiscountText: renderedDiscountText
	};
}

export function renderPrice(price: number) {
	return renderPriceWithDiscount(price, 0.0).renderedPrice;
}

const iota = (n: number) => {
	let l = [];
	let i = 1;
	while (n--) {
		l.push(i++)
	};
	return l;
}

export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return iota(totalPages);
	}
	
	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, '...', totalPages - 1, totalPages];
	}
	
	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
	}
	
	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		'...',
		currentPage - 1,
		currentPage,
		currentPage + 1,
		'...',
		totalPages,
	];
};