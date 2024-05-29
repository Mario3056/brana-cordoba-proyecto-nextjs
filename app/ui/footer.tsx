import { TwitterLogo, YoutubeLogo, FacebookLogo } from '@/app/ui/icons';

export default function Footer() {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded sticky">
            <nav className="grid grid-flow-col gap-4">
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a> <TwitterLogo /> </a>
					<a> <YoutubeLogo /> </a>
					<a> <FacebookLogo /> </a>
                </div>
            </nav>
            <aside>
                <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
            </aside>
        </footer>
    );
}