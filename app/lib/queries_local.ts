import pg from 'pg'
const { Client } = pg;
import type { AdminUser, Product, ProductComment } from '@/app/lib/types';

export const ITEMS_PER_PAGE = 8;
export const COMMENTS_PER_PAGE = 6;

export async function getDeletedProducts(): Promise<Product[]> {
	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432 });
		await client.connect()
		const deletedProducts = await client.query("SELECT * FROM tienda.deleted_products ORDER BY created_at ASC");
		await client.end();

		return deletedProducts.rows as Product[];
	} catch (error) {
		console.error('Failed to fetch deleted products:', error);
		throw new Error('Failed to fetch deleted products');
	}
}

export async function getProductsByPage(pageNumber: number): Promise<Product[]> {
	if (pageNumber < 1) { return [] }; // throw an error instead?

	const pageOffset = (pageNumber - 1) * ITEMS_PER_PAGE;

	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432 });
		await client.connect()


		// [DEBUG] Test for skeletons - remove before production
		console.log('Fetching products by page...');
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const page = await client.query(`SELECT * FROM tienda.catalogo
				ORDER BY created_at ASC
				OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`
		);

		console.log('Data fetch completed after 1.5 seconds.'); // [DEBUG]
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
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432 });
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
	const escapeAll = (s: string) => s.split("").map(c => "\\" + c).join("");
	query = escapeAll(query);

	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432 });

		console.log(`SELECT * FROM tienda.catalogo
				WHERE name ILIKE '%${query}%' OR
					  description ILIKE '%${query}%' OR
					  category ILIKE '%${query}%'
				ORDER BY created_at ASC
				OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`);

		await client.connect();
		const page = await client.query(`SELECT * FROM tienda.catalogo
				WHERE name ILIKE '%${query}%' OR
					  description ILIKE '%${query}%' OR
					  category ILIKE '%${query}%'
				ORDER BY created_at ASC
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
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432 });
		await client.connect();
		const page = await client.query(`SELECT * FROM tienda.catalogo
				WHERE category LIKE ${category}
				ORDER BY created_at ASC
				OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`);
		await client.end();
		return page.rows as Product[];

	} catch (error) {
		console.error('Failed to fetch page of category ' + category + ':', error);
		throw new Error('Failed to fetch page of category ' + category);
	}
}

export async function API_getAllProducts(): Promise<Product[]> {
	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432 });
		await client.connect()
		const p = await client.query(`SELECT * FROM tienda.catalogo`);
		await client.end();
		return p.rows as Product[];
	} catch (error) {
		console.error('[API] Failed to fetch all products:', error);
		throw new Error('[API] Failed to fetch all products');
	}
}

export async function getProductById(id: string): Promise<Product> {
	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432 });
		await client.connect()

		// [DEBUG] Test for skeletons - remove before production
		console.log('Fetching product by id...');
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const product = await client.query(`SELECT * FROM tienda.catalogo WHERE id = ${id}`);

		console.log('Data fetch completed after 3 seconds.'); // [DEBUG]

		await client.end();
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
		await client.end();
		return totalPages;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch total number of products.');
	}
}

export async function getUser(email: string): Promise<AdminUser> {
	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432 });
		await client.connect();
		const user = await client.query(`SELECT * FROM tienda.administradores WHERE email = ${email}`);
		await client.end();
		return user.rows[0] as AdminUser;
	} catch (error) {
		console.error('Failed to fetch random products:', error);
		throw new Error('Failed to fetch random products');
	}
}

export async function getCommentsByPage(
	product_id: string,
	pageNumber: number
): Promise<ProductComment[]> {
	if (pageNumber < 1) { return [] }; // throw an error instead?

	const pageOffset = (pageNumber - 1) * COMMENTS_PER_PAGE;

	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432 });
		await client.connect();

		// [DEBUG] Test for skeletons - remove before production
		console.log('Fetching comments...');
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const page = await client.query(`SELECT * FROM tienda.comments
				WHERE related_product_id = ${product_id}
				OFFSET ${pageOffset} LIMIT ${COMMENTS_PER_PAGE}`
		);

		console.log('Comments fetch completed after 3 seconds.'); // [DEBUG]

		await client.end()
		return page.rows as ProductComment[];

	} catch (error) {
		console.error('Failed to fetch page of comments:', error);
		throw new Error('Failed to fetch page of comments');
	}
}

export async function getCommentsPages(product_id: string) {
	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432 });
		await client.connect();

		const count = await client.query(`SELECT COUNT(*) 
			FROM tienda.comments
			WHERE related_product_id = ${product_id}`
		);

		const totalPages = Math.ceil(Number(count.rows[0].count) / COMMENTS_PER_PAGE);
		await client.end();
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
	try {
		const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432 });
		await client.connect();

		const result = await client.query(`SELECT ROUND(AVG(rating)::numeric, 1) as avg
			FROM (
				SELECT rating
				FROM tienda.catalogo
				WHERE id = ${product_id}
				UNION
				SELECT rating
				FROM tienda.comments
				WHERE related_product_id = ${product_id}
			) AS combined_ratings`
		);
		const avg = Number(result.rows[0].avg);

		await client.end();
		return avg;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to get average rating of comments for the product');
	}
}