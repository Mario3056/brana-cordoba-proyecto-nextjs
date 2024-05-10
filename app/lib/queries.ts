import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import type { Product } from '@/app/lib/types';

/* To implement: search, getProductsByCategory(category: string, pageNumber: number), authenticate */

const productsPerPage = 10;

export async function getProductsByPage(pageNumber: number): Promise<Product[]> {
	noStore();
	
	if (pageNumber < 1) { return [] }; // throw an error instead?
	const pageOffset = (pageNumber - 1) * productsPerPage;
	
	try {
		const page = await sql`SELECT * FROM tienda.catalogo
				ORDER BY created_at DESC
				OFFSET ${pageOffset} LIMIT ${productsPerPage}`;
		// console.log(page.rows);
		return page.rows as Product[];
	} catch (error) {
		console.error('Failed to fetch page of products:', error);
		throw new Error('Failed to fetch page of products');
	}
}

export async function debug_getAllProducts(): Promise<Product[]> {
	noStore();
	try {
		const page = await sql`SELECT * FROM tienda.catalogo`;
		// console.log(page.rows);
		return page.rows as Product[];
	} catch (error) {
		console.error('[DEBUG] Failed to fetch page of products:', error);
		throw new Error('[DEBUG] Failed to fetch page of products');
	}
}

export async function getProductById(id: string): Promise<Product> {
	noStore();
	try {
		const page = await sql`SELECT * FROM tienda.catalogo WHERE id = ${id}`;
		return page.rows[0] as Product;
	} catch (error) {
		console.error('Failed to fetch product:', error);
		throw new Error('Failed to fetch product');
	}
}

