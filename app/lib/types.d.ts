export type AdminUser = {
	id: string;
	email: string;
	password: string;
}

export type Product = {
	id?: string;
	name?: string;
	description?: string;
	category?: string; // enum?
	rating?: number;
	price: number;
	image?: string;
	created_at?: string;
	modified_at?: string;
}

export const placeholderProduct: Product = {
	id: 'placeholder-id',
	name: 'placeholder product',
	description: 'placeholder description',
	category: 'placeholder category',
	rating: 5.0,
	price: 819264,
	image: 'products/placeholder.png',
	created_at: 'placeholder',
	modified_at: 'placeholder'
};