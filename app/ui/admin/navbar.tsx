 'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import SignOutButton from '@/app/ui/admin/signOutButton';

export default function Navbar() {
    const pathName = usePathname();

    return (
        <header className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <div className="text-indigo-500">
			        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24"
				    stroke="currentColor">
				        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
					    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
			        </svg>
		        </div>
                <span className="ml-3 text-xl">LibreMercado</span>
            </a>
			
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
			
                <div className="text-gray-500 font-semibold">
                    <Link  href="/admin/productos" 
                        className={pathName === "/admin/productos" ? "mr-5 active text-indigo-500" : "mr-5 hover:text-indigo-400"}>
                            Listado de productos
                    </Link>
                </div>
                
            </nav>
			
			<SignOutButton />
         </header>
    );
}