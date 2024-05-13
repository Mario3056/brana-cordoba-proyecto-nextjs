'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>;

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

	return ( <>
		<label htmlFor="search" className="input input-bordered flex items-center gap-2 mx-64">
			<input  type="text" name="productSearch" className="grow"
					placeholder="Buscar productos"
					onChange={(e) => {
						handleSearch(e.target.value);
					}}
					defaultValue={searchParams.get('query')?.toString()}
			/>
			
			{SearchIcon()}
		</label>
	</> );
}