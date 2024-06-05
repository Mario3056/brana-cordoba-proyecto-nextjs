'use client';

import StarRating from '@/app/ui/starRating';
import { useCartStore } from '@/app/lib/cart/useCartStore';
import type { Product } from '@/app/lib/types';
import Image from 'next/image';
import { useState } from 'react';

export default function Card({ product }: { product: Product }) {
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
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 pt-20 pb-12 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">

                    <Image alt={product.description} width={600} height={300}
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                        src={product.image} />

                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <StarRating rating={product.rating} />
                                <span className="text-gray-600 ml-3">Puntuación</span>
                            </span>
                        </div>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <p className="leading-relaxed">{product.description}</p>
                        </div>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">{"$" + (product.price / 100)}</span>
                            <button
                                className={`flex ml-auto text-white border-0 py-2 px-6 focus:outline-none rounded transition-all duration-300 ${buttonState === 'initial' ? 'bg-indigo-500 hover:bg-indigo-600' :
                                        buttonState === 'transitioning' ? 'bg-green-500' :
                                            buttonState === 'clicked' ? 'bg-green-500' : ''
                                    } ${buttonState === 'initial' ? 'scale-100' : 'scale-105'}`}
                                onClick={handleClick}
                                disabled={buttonState !== 'initial'} // Disable the button during transition and clicked states
                            >
                                {buttonState === 'clicked' ? '✔' : 'Agregar al carrito'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

