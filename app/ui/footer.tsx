import { TwitterLogo, YoutubeLogo, FacebookLogo } from '@/app/ui/icons';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded sticky">
            <nav className="grid grid-flow-col gap-4">
                <Link href="/" className="link link-hover">About us</Link>
                <Link href="/" className="link link-hover">Contact</Link>
                <Link href="/" className="link link-hover">Jobs</Link>
                <Link href="/" className="link link-hover">Press kit</Link>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <Link href="/"> <TwitterLogo /> </Link>
					<Link href="/"> <YoutubeLogo /> </Link>
					<Link href="/"> <FacebookLogo /> </Link>
                </div>
            </nav>
            <aside>
                <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
            </aside>
        </footer>
    );
}