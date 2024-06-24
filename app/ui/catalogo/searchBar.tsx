'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { SearchSymbol } from '@/app/ui/icons';

export default function SearchBar() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams);

		params.set('page', '1');

		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<>
			<div className='max-w-md px-4 mx-auto mt-8'>
				<div className="relative">
					<SearchSymbol />
					<input
						type="text"
						name="productSearch"
						placeholder="Buscar productos"
						className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 dark:bg-base-300 focus:bg-white dark:focus:bg-base-300 focus:border-indigo-600 dark:border-base-300"
						onChange={(e) => {
							handleSearch(e.target.value);
						}}
						defaultValue={searchParams.get('query')?.toString()}
					/>
				</div>
			</div>
		</>
	);
}