export type AdminUser = {
	id: string;
	email: string;
	password: string;
}

export type Product = {
	id: string;
	name: string | null;
	description: string | null;
	category: string | null; // enum?
	rating: number | null;
	price: number | null;
	image: string | null;
}