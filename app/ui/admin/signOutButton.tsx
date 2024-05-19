'use client';

import { log_out } from '@/app/lib/authenticate'; 

// add props: auth data from SignOutOrCart
export default function SignOutButton() {
	return <>
		<form action={log_out}>
			<button className="mr-5 active text-indigo-500">
				<span className="font-bold">[X]</span>
				<span className="hidden md:inline-block underline">Cerrar sesión</span>
			</button>
		</form>	
	</>;
}