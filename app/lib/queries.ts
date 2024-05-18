import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import type { AdminUser, Product } from '@/app/lib/types';

export const ITEMS_PER_PAGE = 8;

export async function getProductsByPage(pageNumber: number): Promise<Product[]> {
	noStore();
	
	if (pageNumber < 1) { return [] }; // throw an error instead?
	const pageOffset = (pageNumber - 1) * ITEMS_PER_PAGE;
	
	try {
		const page = await sql`SELECT * FROM tienda.catalogo
				ORDER BY created_at DESC
				OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`;
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
	const pageOffset = (pageNumber - 1) * ITEMS_PER_PAGE;
	
	// sanitize query: escape all characters? prepared statements?
	// https://www.postgresql.org/docs/current/sql-prepare.html
	const escapeAll = (s: string) => s.split("").map(c => "\\" + c).join("");
	query = escapeAll(query);
	
	try {
		const page = await sql`SELECT * FROM tienda.catalogo
				WHERE name ILIKE ${`%${query}%`} OR
					  description ILIKE ${`%${query}%`} OR
					  category ILIKE ${`%${query}%`}
				ORDER BY created_at DESC
				OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`;
				
		return page.rows as Product[];
	} catch (error) {
		console.error('Failed to fetch page of products:', error);
		throw new Error('Failed to fetch page of products');
	}
}

export async function getProductsByCategory(category: string, pageNumber: number): Promise<Product[]> {
	noStore();

	if (pageNumber < 1) { return [] }; // throw an error instead?
	const pageOffset = (pageNumber - 1) * ITEMS_PER_PAGE;

	try {
		const page = await sql`SELECT * FROM tienda.catalogo
				WHERE category LIKE ${category}
				ORDER BY created_at DESC
				OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`;
		
		return page.rows as Product[];
	} catch (error) {
		console.error('Failed to fetch page of category ' + category + ':', error);
		throw new Error('Failed to fetch page of category ' + category);
	}
}

export async function API_getAllProducts(): Promise<Product[]> {
	noStore();
	try {
		const page = await sql`SELECT * FROM tienda.catalogo`;
		return page.rows as Product[];
	} catch (error) {
		console.error('[API] Failed to fetch page of products:', error);
		throw new Error('[API] Failed to fetch page of products');
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

export async function fetchProductsPages(query: string) {
	noStore();
	try {
		const count = await sql`SELECT COUNT(*) 
			FROM tienda.catalogo
			WHERE 
				name ILIKE '%${query}%' OR
				description ILIKE '%${query}%' OR
				category ILIKE '%${query}%'`;

		const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch total number of products.');
	}
}

export async function getUser(email: string): Promise<AdminUser> {
	noStore();
	try {
		const user = await sql`SELECT * FROM tienda.administradores WHERE email = ${email}`;
		return user.rows[0] as AdminUser;
	} catch (error) {
		console.error('[DEBUG] Failed to fetch page of products:', error);
		throw new Error('[DEBUG] Failed to fetch page of products');
	}
}
