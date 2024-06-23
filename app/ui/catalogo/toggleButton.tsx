'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ToggleButton() {
    const router = useRouter();
    const [isDiscounted, setIsDiscounted] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    useEffect(() => {
        if (params.has('discounted')) {
            const isDiscountedValue = params.get('discounted') === 'true';
            setIsDiscounted(isDiscountedValue);
          }
    }, [params]);

    const handleToggle = () => {
        const params = new URLSearchParams(searchParams);
        const result = !isDiscounted;
        params.set('page', '1');
        params.set('discounted', result.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            <div className="flex flex-row-reverse pr-16 py-5 mx-auto">
                <label htmlFor="Toggle1"
                    className="inline-flex items-center space-x-4 cursor-pointer text-gray-800 dark:text-gray-300"
                >
                    <span>Todos</span>
                    <span className="relative">
                        <input id="Toggle1" type="checkbox" className="hidden peer" onClick={handleToggle} checked={isDiscounted} readOnly />
                        <div className="w-10 h-6 rounded-full shadow-inner bg-gray-600 peer-checked:bg-indigo-600"></div>
                        <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-gray-100"></div>
                    </span>
                    <span>Ofertas</span>
                </label>
            </div>
        </>
    )
}