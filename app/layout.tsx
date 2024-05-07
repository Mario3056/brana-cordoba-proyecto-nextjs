import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar";
import Footer from "./ui/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout( { children }: Readonly<{children: React.ReactNode;}>) {
	return (
		<html lang="en" className="min-h-screen">
			<body className={"min-h-screen flex flex-col justify-between " + inter.className}>
				<Navbar />
				{children}
				<Footer/>
			</body>
		</html>
	);
}
