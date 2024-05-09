// Everyone who wants to add to cart must go through this component

'use client';

import { useState } from 'react';

const getLocalStorageProducts = () => {
	if (localStorage.getItem('cart_products') == null) {
		localStorage.setItem('cart_products', "");
	}

	return localStorage.getItem('cart_products');
}

const addToLocalStorage = (id, event) => {
	event.preventDefault();
	
	if (localStorage.getItem('cart_products') == "") {
		localStorage.setItem('cart_products', id);
	} else {
		let productsAlreadyInCart = localStorage.getItem('cart_products');
		if (!productsAlreadyInCart.split(",").includes(id)) {
			localStorage.setItem('cart_products', productsAlreadyInCart + "," + id);
		}
	}

	console.log("[DEBUG] >>> ", localStorage.getItem('cart_products'));
}


export default function AddToCart({ productId } : { productId: string } ) {
	const [cartProducts, setCartProducts] = useState(getLocalStorageProducts());
	const addProductToCart = addToLocalStorage.bind(null, productId);

	// console.log("id:", productId);
	// console.log(addProductToCart);
	// console.log(">>> ", localStorage.getItem('cart_products'));
	// addProductToCart(productId);
	// console.log(">>> ", localStorage.getItem('cart_products'));

	return (
		<button onClick={addProductToCart} className="p-2 m-2 btn btn-circle text-xl border border-black">+</button>
	);
}