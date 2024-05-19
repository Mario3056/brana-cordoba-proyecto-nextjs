import { auth } from "@/auth"

import SignOutButton from '@/app/ui/admin/signOutButton';
import CartButton from '@/app/ui/cart/cartButton';

export default async function SignOutOrCartButton() {
	const auth_data = await auth();
	// console.log(auth_data);
	
	if (auth_data != null && auth_data != undefined) {
		return <SignOutButton />
	} else {
		return <CartButton />	
	}
	
	
}