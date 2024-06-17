'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/authenticate';
import { EmailSymbol, ShowPasswordSymbol } from '@/app/ui/icons';

export default function AdminLogin() {
	const initialState = { message: "", error: undefined };
	const [formState, checkAuth] = useFormState(authenticate, initialState);

	return (
		<div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-lg">
				<h1 className="text-center text-lg font-bold text-indigo-600 sm:text-2xl">Administración</h1>
				<h2 className="text-center text-lg font-bold text-indigo-600 sm:text-xl">Inicio de sesión</h2>
				
				<form action={checkAuth} id="adminLogin" aria-describedby="form-error"
							className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
					<p className="text-center text-lg font-medium">Ingresa tus credenciales</p>

					<div>
						<label htmlFor="email" className="sr-only">Email</label>

						<div className="relative">
							<input
								type="email"
								id="email"
								name="email"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="E-mail"
								autoComplete="off"
							/>

							<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
								<EmailSymbol />
							</span>
						</div>
					</div>

					<div>
						<label htmlFor="password" className="sr-only">Password</label>

						<div className="relative">
							<input
								type="password"
								id="password"
								name="password"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Password"
								autoComplete="off"
							/>

							<span className="absolute inset-y-0 end-0 grid place-content-center px-4">
								<ShowPasswordSymbol />
							</span>
						</div>
					</div>

					<LoginButton/>
				</form>
				
				<div id="form-error" aria-live="polite" aria-atomic="true">
					{ formState.error && 
						<div id="errorMessage" className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
							<p className="font-bold text-red-500 text-center">{formState.error}</p>
						</div>
					}
				</div>
				
			</div>
		</div>
	);
}

function clearErrorBox () {
	const elem = document.querySelector('#errorMessage');
	if (elem != null) {
		elem.classList.add("hidden");
	}
}

function LoginButton() {
	const { pending } = useFormStatus();
	return (<button aria-disabled={pending} onClick={clearErrorBox} className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
			<p>Ingresar</p>
		</button>
	);
}