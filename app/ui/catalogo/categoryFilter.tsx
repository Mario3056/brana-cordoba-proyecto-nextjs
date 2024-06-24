'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryFilter({ categoryNames }: { categoryNames: string[] }) {
    const [itemsClicked, setItemsClicked] = useState<string[]>([]);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    useEffect(() => {
        if (searchParams.has('category')) {
            const params = new URLSearchParams(searchParams);
            setItemsClicked(params.getAll('category'));
        }
    }, [searchParams]);

    const handleClick = (categoryName: string) => {
        const params = new URLSearchParams(searchParams);

        params.set('page', '1');

        if (params.has('category', categoryName)) {
            params.delete('category', categoryName);
            setItemsClicked(itemsClicked.filter(item => item !== categoryName));
        } else {
            params.append('category', categoryName);
            setItemsClicked([...itemsClicked, categoryName]);
        }

        replace(`${pathname}?${params.toString()}`);
    };
    return (
        <>

<div className="md:w-1/4">
      <div className="space-y-2">
        <details
          className="w-full overflow-hidden rounded border border-gray-300 dark:border-gray-600 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary
            className="flex cursor-pointer items-center justify-between bg-white p-4 text-gray-900 transition dark:bg-gray-900 dark:text-white"
          >
            <span className="text-sm md:text-base font-medium"> Categoría </span>
            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 md:h-6 md:w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </summary>

          <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <ul className="space-y-1 border-t border-gray-200 p-4 dark:border-gray-700">
              {categoryNames.map((categoryName, index) => (
                <li key={index} className="flex justify-between items-center">
                  <label
                    htmlFor={`FilterInStock_${index}`}
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id={`FilterInStock_${index}`}
                      className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-offset-gray-900"
                      checked={itemsClicked.includes(categoryName)}
                      onChange={() => handleClick(categoryName)}
                    />
                    <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
                      {categoryName}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </div>

        </>
    )
}