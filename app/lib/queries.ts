import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import type { Product } from '@/app/lib/types';

/* To implement: authenticate */

export const productsPerPage = 10;

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

export async function getRandomProducts(n: number): Promise<Product[]> {
	noStore();
	try {
		const page = await sql`SELECT * FROM tienda.catalogo ORDER BY random() LIMIT ${n};`;
		return page.rows as Product[];
	} catch (error) {
		console.error('[DEBUG] Failed to fetch page of products:', error);
		throw new Error('[DEBUG] Failed to fetch page of products');
	}
}

export async function getFilteredProductsByPage(pageNumber: number, query: string): Promise<Product[]> {
	noStore();
	
	if (pageNumber < 1) { return [] }; // throw an error instead?
	const pageOffset = (pageNumber - 1) * productsPerPage;
	
	// sanitize query: escape all characters? prepared statements?
	// https://www.postgresql.org/docs/current/sql-prepare.html
	const escapeAll = (s) => s.split("").map(c => "\\" + c).join("");
	query = escapeAll(query);
	
	try {
		const page = await sql`SELECT * FROM tienda.catalogo
				WHERE name ILIKE ${`%${query}%`} OR
					  description ILIKE ${`%${query}%`} OR
					  category ILIKE ${`%${query}%`}
				ORDER BY created_at DESC
				OFFSET ${pageOffset} LIMIT ${productsPerPage}`;
				
		return page.rows as Product[];
	} catch (error) {
		console.error('Failed to fetch page of products:', error);
		throw new Error('Failed to fetch page of products');
	}
}

export async function getProductsByCategory(category: string, pageNumber: number): Promise<Product[]> {
	noStore();

	if (pageNumber < 1) { return [] }; // throw an error instead?
	const pageOffset = (pageNumber - 1) * productsPerPage;

	try {
		const page = await sql`SELECT * FROM tienda.catalogo
				WHERE category LIKE ${category}
				ORDER BY created_at DESC
				OFFSET ${pageOffset} LIMIT ${productsPerPage}`;
		
		return page.rows as Product[];
	} catch (error) {
		console.error('Failed to fetch page of category ' + category + ':', error);
		throw new Error('Failed to fetch page of category ' + category);
	}
}

export async function debug_getAllProducts(): Promise<Product[]> {
	noStore();
	try {
		const page = await sql`SELECT * FROM tienda.catalogo`;
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

