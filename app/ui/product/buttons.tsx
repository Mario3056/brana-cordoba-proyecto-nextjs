'use client';

import { useCartStore } from '@/app/lib/cart/useCartStore';
import { Product } from '@/app/lib/types';
import { useState } from 'react';

export function AddToCartButton({product}: {product: Product}) {
    const addToCarrito = useCartStore(state => state.addToCart);
    const [buttonState, setButtonState] = useState('initial'); // initial, transitioning, or clicked

    const handleClick = () => {
        if (buttonState === 'initial') {
            addToCarrito(product);
            setButtonState('transitioning');
            setTimeout(() => {
                setButtonState('clicked');
                setTimeout(() => {
                    setButtonState('initial');
                }, 2000); // 2 seconds for the 'clicked' state
            }, 300); // 300ms for the transition
        }
    };

    return (
        <>
            <button
                className={`flex ml-auto text-white dark:text-gray-300 border-0 py-2 px-6 focus:outline-none rounded transition-all duration-300 ${buttonState === 'initial' ? 'bg-indigo-500 dark:bg-indigo-800 hover:bg-indigo-600 dark:hover:bg-indigo-700 ' :
                    buttonState === 'transitioning' ? 'bg-green-500 dark:bg-green-700' :
                        buttonState === 'clicked' ? 'bg-green-500 dark:bg-green-700' : ''
                    } ${buttonState === 'initial' ? 'scale-100' : 'scale-105'}`}
                onClick={handleClick}
                disabled={buttonState !== 'initial'} // Disable the button during transition and clicked states
            >
                {buttonState === 'clicked' ? '✔' : 'Agregar al carrito'}
            </button>
        </>
    )
}