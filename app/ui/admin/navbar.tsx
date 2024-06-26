 'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import SignOutButton from '@/app/ui/admin/signOutButton';
import { CompanyLogo } from '@/app/ui/icons';

export default function Navbar() {
    const pathName = usePathname();

    return (
        <header className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link href="/" aria-label="Ir a la pagina principal"
				  className="flex title-font font-medium items-center text-gray-900 dark:text-white mb-4 md:mb-0">
                <div className="text-indigo-500">
			        <CompanyLogo />
		        </div>
                <span className="ml-3 text-xl">LibreMercado</span>
            </Link>
			
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
			
				<div className="pl-4" />
				
				<div className="text-gray-500 dark:text-gray-300 font-semibold">
                    <Link href="/admin/ventas"
                        className={pathName === "/admin/ventas" ? "mr-5 active text-indigo-500" : "mr-5 hover:text-indigo-400"}>
                            Ventas
                    </Link>
                </div>
				
				<p className="px-4"> | </p>
			
                <div className="text-gray-500 dark:text-gray-300 font-semibold">
                    <Link href="/admin/productos" 
                        className={pathName === "/admin/productos" ? "mr-5 active text-indigo-500" : "mr-5 hover:text-indigo-400"}>
                            Listado de productos
                    </Link>
                </div>
				
				<p className="px-4"> | </p>
				
				<div className="text-gray-500 font-semibold">
                    <Link href="/admin/productos_eliminados" 
                        className={pathName === "/admin/productos_eliminados" ? "mr-5 active text-indigo-500" : "mr-5 hover:text-indigo-400"}>
                            Historial de productos eliminados
                    </Link>
                </div>
                
            </nav>
			
			<SignOutButton />
         </header>
    );
}