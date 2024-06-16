import Head from 'next/head';
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/app/ui/footer";

import Navbar from "@/app/ui/navbar";
import AdminNavbar from "@/app/ui/admin/navbar";
import { auth } from "@/auth"

const inter = Inter({ subsets: ["latin"] });

import { Metadata } from 'next';
 
export const metadata: Metadata = {
	title: 'LibreMercado - Tienda en Linea',
	description: 'Tienda en Linea - Proyecto de cursada IAW 2024',
	metadataBase: new URL('https://' + process.env.VERCEL_URL),
};

export default async function RootLayout( { children }: Readonly<{children: React.ReactNode;}>) {
	const auth_data = await auth();
	
	return (
		<html lang="en" className="min-h-screen">
			<Head>
				<title>LibreMercado - Tienda en Linea</title>
			</Head>
			
			<body className={"min-h-screen flex flex-col justify-between " + inter.className}>
				{ 
					(auth_data != null && auth_data != undefined)
						? <AdminNavbar />
						: <Navbar />
				}
				
				{children}

				<Footer/>
			</body>
		</html>
	);
}
