/*
-- Prepared statements only last for the duration of the current database session.
-- When the session ends, the prepared statement is forgotten,
-- so it must be recreated before being used again. 
PREPARE searchquery (text) AS
 	SELECT * FROM tienda.catalogo
 		WHERE name ILIKE '%' || $1 || '%' OR
 		      description ILIKE '%' || $1 || '%' OR
 		      category ILIKE '%' || $1 || '%'
 		ORDER BY created_at DESC;
EXECUTE searchquery ('pro');
DEALLOCATE  searchquery;
*/

import pg from 'pg'
const { Client } = pg;
import type { Product } from '@/app/lib/types';

/* To implement: authenticate */

export const ITEMS_PER_PAGE = 8;

export async function getProductsByPage(pageNumber: number): Promise<Product[]> {
	if (pageNumber < 1) { return [] }; // throw an error instead?
	
	const pageOffset = (pageNumber - 1) * ITEMS_PER_PAGE;

	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
		await client.connect()


		// [DEBUG] Test for skeletons - remove before production
   	 	console.log('Fetching products by page...');
    	await new Promise((resolve) => setTimeout(resolve, 3000));

		const page = await client.query(`SELECT * FROM tienda.catalogo
				ORDER BY created_at DESC
				OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`
		);
		
		console.log('Data fetch completed after 3 seconds.'); // [DEBUG]
		// console.log(page.rows); // [DEBUG]

		await client.end()
		return page.rows as Product[];
		
	} catch (error) {
		console.error('Failed to fetch page of products:', error);
		throw new Error('Failed to fetch page of products');
	}
}

export async function getRandomProducts(n: number): Promise<Product[]> {
	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
		await client.connect();
		const p = await client.query(`SELECT * FROM tienda.catalogo ORDER BY random() LIMIT ${n};`);
		await client.end();
		return p.rows as Product[];
	} catch (error) {
		console.error('Failed to fetch random products:', error);
		throw new Error('Failed to fetch random products');
	}
}

export async function getFilteredProductsByPage(pageNumber: number, query: string): Promise<Product[]> {
	if (pageNumber < 1) { return [] }; // throw an error instead?
	const pageOffset = (pageNumber - 1) * ITEMS_PER_PAGE;

	// sanitize query: escape all characters? prepared statements?
	// https://www.postgresql.org/docs/current/sql-prepare.html
	const escapeAll = (s) => s.split("").map(c => "\\" + c).join("");
	query = escapeAll(query);

	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
		
		console.log(`SELECT * FROM tienda.catalogo
				WHERE name ILIKE '%${query}%' OR
					  description ILIKE '%${query}%' OR
					  category ILIKE '%${query}%'
				ORDER BY created_at DESC
				OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`);
		
		await client.connect();
		const page = await client.query(`SELECT * FROM tienda.catalogo
				WHERE name ILIKE '%${query}%' OR
					  description ILIKE '%${query}%' OR
					  category ILIKE '%${query}%'
				ORDER BY created_at DESC
				OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`);
		await client.end();
		return page.rows as Product[];
		
	} catch (error) {
		console.error('Failed to fetch page of filtered products:', error);
		throw new Error('Failed to fetch page of filtered products');
	}
}

export async function getProductsByCategory(category: string, pageNumber: number): Promise<Product[]> {
	if (pageNumber < 1) { return [] }; // throw an error instead?
	const pageOffset = (pageNumber - 1) * ITEMS_PER_PAGE;

	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
		await client.connect();
		const page = await client.query(`SELECT * FROM tienda.catalogo
				WHERE category LIKE ${category}
				ORDER BY created_at DESC
				OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`);
		await client.end();
		return page.rows as Product[];
		
	} catch (error) {
		console.error('Failed to fetch page of category ' + category + ':', error);
		throw new Error('Failed to fetch page of category ' + category);
	}
}

export async function debug_getAllProducts(): Promise<Product[]> {
	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
		await client.connect()
		const p = await client.query(`SELECT * FROM tienda.catalogo`);
		// console.log(p.rows);
		await client.end()
		return p.rows as Product[];
	} catch (error) {
		console.error('[DEBUG] Failed to fetch all products:', error);
		throw new Error('[DEBUG] Failed to fetch all products');
	}
}

export async function getProductById(id: string): Promise<Product> {
	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
		await client.connect()

		// [DEBUG] Test for skeletons - remove before production
		console.log('Fetching product by id...');
    	await new Promise((resolve) => setTimeout(resolve, 3000));

		const product = await client.query(`SELECT * FROM tienda.catalogo WHERE id = ${id}`);

		console.log('Data fetch completed after 3 seconds.'); // [DEBUG]

		await client.end()
		return product.rows[0] as Product;
	} catch (error) {
		console.error('Failed to fetch product:', error);
		throw new Error('Failed to fetch product');
	}
}

export async function fetchProductsPages(query: string) {
	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432 });
		await client.connect();

		const count = await client.query(`SELECT COUNT(*) 
			FROM tienda.catalogo
			WHERE 
				name ILIKE '%${query}%' OR
				description ILIKE '%${query}%' OR
				category ILIKE '%${query}%'`
		);

		const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch total number of products.');
	}
}