'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import CartButton from "@/app/ui/cart/cartButton";
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
			
                <div className="flex flex-row text-gray-500 dark:text-gray-300 font-semibold">
                    <Link href="/catalogo" aria-label="Ir al catálogo de productos"
                        className={pathName === "/catalogo" ? "mr-5 active text-indigo-500" : "mr-5 hover:text-indigo-400"}>
                            Catálogo
                    </Link>
					
					<p className="px-4"> | </p>
					
                    <Link href="/admin/login" aria-label="Iniciar sesión para el administrador"
                        className={pathName === "/admin/login" ? "mr-5 active text-indigo-500" : "mr-5 hover:text-indigo-400"}>
                            Login
                    </Link>
                </div>
                
            </nav>
			
            <CartButton />
        </header>
    );
}