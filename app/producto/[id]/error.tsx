'use client';

import { useEffect } from 'react';

export default function Error({
    error
}: {
    error: Error & { digest?: string }
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
  
            <div className="grid h-screen place-content-center bg-white dark:bg-base-100 px-4">
                <div className="text-center">
                    <h1 className="text-9xl font-black text-gray-200 dark:text-gray-500">404</h1>

                    <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">Uh-oh!</p>

                    <p className="mt-4 text-gray-500 dark:text-gray-100">No pudimos encontrar el producto.</p>

                </div>
            </div>

    );
}