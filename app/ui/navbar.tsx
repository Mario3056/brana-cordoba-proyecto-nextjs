import CartButton from '@/app/ui/cartButton'

export default function Navbar() {
	const logoSVG = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>;

    return (
        <header className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                {logoSVG()}
                <span className="ml-3 text-xl" style={{fontSize: "2.5rem", fontVariant: "small-caps", color: "#900"}}>Empresa</span>
            </a>
			
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                <a href="/" className="link link-hover mr-5 hover:text-gray-900">Home</a>
                <a href="/catalogo" className="link link-hover mr-5 hover:text-gray-900">Catalogo</a>
                <a href="#" className="link link-hover mr-5 hover:text-gray-900">Login</a>
            </nav>

            <CartButton />
        </header>

    );
}