import pg from 'pg'
const { Client } = pg;
import { Product } from '@/app/lib/types';

/* To implement: search, getProductsByCategory(category: string, pageNumber: number), authenticate */

const productsPerPage = 10;

export async function getProductsByPage(pageNumber: number): Promise<Product[]> {
	if (pageNumber < 1) { return [] }; // throw an error instead?
	
	const pageOffset = (pageNumber - 1) * productsPerPage;

	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
		await client.connect()
		const page = await client.query(`SELECT * FROM tienda.catalogo
				ORDER BY created_at DESC
				OFFSET ${pageOffset} LIMIT ${productsPerPage}`);
		// console.log(page.rows);
		await client.end()
		return page.rows as Product[];
		
	} catch (error) {
		console.error('Failed to fetch page of products:', error);
		throw new Error('Failed to fetch page of products');
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
		const product = await client.query(`SELECT * FROM tienda.catalogo WHERE id = ${id}`);
		await client.end()
		return product.rows[0] as Product;
	} catch (error) {
		console.error('Failed to fetch product:', error);
		throw new Error('Failed to fetch product');
	}
}

