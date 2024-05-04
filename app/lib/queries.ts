import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { AdminUser, Product } from '@/app/lib/types';

export async function getUsers(): Promise<AdminUser[]> {
	noStore();
	try {
		const user = await sql`SELECT * FROM tienda.administradores`;
		// console.log(user.rows);
		return user.rows as AdminUser[];
	} catch (error) {
		console.error('Failed to fetch admin account:', error);
		throw new Error('Failed to fetch admin account');
	}
}

export async function getProducts(): Promise<Product[]> {
	noStore();
	try {
		const user = await sql`SELECT * FROM tienda.catalogo`;
		// console.log(user.rows);
		return user.rows as Product[];
	} catch (error) {
		console.error('Failed to fetch admin account:', error);
		throw new Error('Failed to fetch admin account');
	}
}