import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import type { SalesRecord, AdminUser, Product, ProductComment } from '@/app/lib/types';

export const ITEMS_PER_PAGE = 8;
export const COMMENTS_PER_PAGE = 6;

export async function getDeletedProducts(): Promise<Product[]> {
	noStore();
	try {
		const deletedProducts = await sql`SELECT * FROM tienda.deleted_products ORDER BY created_at ASC`;		
		return deletedProducts.rows as Product[];
	} catch (error) {
		console.error('Failed to fetch deleted products:', error);
		throw new Error('Failed to fetch deleted products');
	}
}

export async function getProductsByPage(pageNumber: number): Promise<Product[]> {
	noStore();
	
	if (pageNumber < 1) { return [] }; // throw an error instead?
	const pageOffset = (pageNumber - 1) * ITEMS_PER_PAGE;
	
	try {
		const page = await sql`SELECT * FROM tienda.catalogo
				ORDER BY created_at ASC
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
				WHERE name ILIKE ${'%' + query + '%'} OR
					  description ILIKE ${'%' + query + '%'} OR
					  category ILIKE ${'%' + query + '%'}
				ORDER BY created_at ASC
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
				ORDER BY created_at ASC
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

export async function API_getAllCommentsForProduct(id: string): Promise<ProductComment[]> {
	noStore();
	try {
		const p = await sql`SELECT * FROM tienda.comments WHERE related_product_id = ${id}`;
		return p.rows as ProductComment[];
	} catch (error) {
		console.error('[API] Failed to fetch all comments for product ' + id + ':', error);
		throw new Error('[API] Failed to fetch all comments for product ' + id + ':');
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
				name ILIKE ${'%' + query + '%'} OR
				description ILIKE ${'%' + query + '%'} OR
				category ILIKE ${'%' + query + '%'}`;

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

export async function getCommentsByPage(
	product_id: string,
	pageNumber: number
): Promise<ProductComment[]> {
	noStore();
	
	if (pageNumber < 1) { return [] }; // throw an error instead?
	const pageOffset = (pageNumber - 1) * COMMENTS_PER_PAGE;
	
	try {
		// [DEBUG] Test for skeletons - remove before production
		console.log('Fetching comments...');
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const page = await sql`SELECT * FROM tienda.comments
				WHERE related_product_id = ${product_id}
				OFFSET ${pageOffset} LIMIT ${COMMENTS_PER_PAGE}`;

		console.log('Comments fetch completed after 1.5 seconds.'); // [DEBUG]

		return page.rows as ProductComment[];

	} catch (error) {
		console.error('Failed to fetch page of comments:', error);
		throw new Error('Failed to fetch page of comments');
	}
}

export async function getCommentsPages(product_id: string) {
	noStore()
	try {
		const count = await sql`SELECT COUNT(*) 
			FROM tienda.comments
			WHERE related_product_id = ${product_id}`;

		const totalPages = Math.ceil(Number(count.rows[0].count) / COMMENTS_PER_PAGE);
		return totalPages;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to get total number of pages of comments.');
	}
}

/**
 * 
 * @param product_id - id of the product
 * @returns - average rating considering both rating from comments and the internal rating of the product
 */
export async function getAvgRating(product_id: string) {
	noStore();
	try {
		const result = await sql`SELECT ROUND(AVG(rating)::numeric, 1) as avg
			FROM (
				SELECT rating
				FROM tienda.catalogo
				WHERE id = ${product_id}
				UNION
				SELECT rating
				FROM tienda.comments
				WHERE related_product_id = ${product_id}
			) AS combined_ratings`;
		const avg = Number(result.rows[0].avg);

		return avg;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to get average rating of comments for the product');
	}
}

export async function getAllSales(): Promise<SalesRecord[]> {
	try {
		const salesRecords = await sql`SELECT id, paymentid, amount, status, timestamp::date FROM tienda.mercadopago_records ORDER BY timestamp DESC`;
		return salesRecords.rows as SalesRecord[];
	} catch (error) {
		console.error('Failed to fetch sales records:', error);
		throw new Error('Failed to fetch sales records');
	}
}

export async function getAllSalesStats(): Promise<Number> {
	noStore()
	try {
		const total_earnings = await sql`select sum(amount)/100 as total_earnings from tienda.mercadopago_records`;
		return total_earnings.rows[0].total_earnings;
	} catch (error) {
		console.error('Failed to fetch sales records stats:', error);
		throw new Error('Failed to fetch sales records stats');
	}
}