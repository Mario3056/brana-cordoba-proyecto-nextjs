'use client';

import { log_out } from '@/app/lib/authenticate';
import Image from 'next/image';

export default function SignOutButton() {
	return <>
		<form action={log_out}>
			<div className="dropdown dropdown-end">
				<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar focus:border focus:border-blue-400">
					<div className="w-10 rounded-full">
						<Image width={64} height={64} alt="Admin profile picture" src="/users/user.png" />
					</div>
				</div>
				
				{/* tabIndex=-1 prevents the <ul> from being focused, but its children can still be focused.
					Now, tabbing moves from the admin profile picture into the logout button rather than its container.
					https://webkit.org/blog/12578/non-interactive-elements-with-the-inert-attribute/ */}
				<ul tabIndex={-1} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
					<li><button className="focus:border focus:border-2 focus:border-blue-400 focus:font-extrabold" type='submit'>Logout</button></li>
				</ul>
			</div>
		</form>
	</>;
}