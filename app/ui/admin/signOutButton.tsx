'use client';

import { log_out } from '@/app/lib/authenticate';
import Image from 'next/image';

export default function SignOutButton() {
	return <>
		<form action={log_out}>
			<div className="dropdown dropdown-end">
				<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
					<div className="w-10 rounded-full">
						<Image width={64} height={64} alt="Admin profile picture" src="/users/user.png" />
					</div>
				</div>
				<ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
					<li><button type='submit'>Logout</button></li>
				</ul>
			</div>
		</form>
	</>;
}