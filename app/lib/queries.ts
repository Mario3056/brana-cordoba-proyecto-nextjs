import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import type { SalesRecord, AdminUser, Product, ProductComment, ProductFilter } from '@/app/lib/types';

export const ITEMS_PER_PAGE = 8;
export const COMMENTS_PER_PAGE = 6;

// later: getAllSalesPages(pageNumber: number)
export async function getAllSales(): Promise<SalesRecord[]> {
	try {
		const salesRecords = await sql`SELECT * FROM tienda.mercadopago_records ORDER BY timestamp ASC`;
		return salesRecords.rows as SalesRecord[];
	} catch (error) {
		console.error('Failed to fetch sales records:', error);
		throw new Error('Failed to fetch sales records');
	}
}

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

export async function getProductsByPageWithFilters(pageNumber: number, filter: ProductFilter): Promise<Product[]> {
	noStore();

	if (pageNumber < 1) { return [] }; // throw an error instead?
	const pageOffset = (pageNumber - 1) * ITEMS_PER_PAGE;

	try {
		let page;

		if (filter.discounted) {
			if (filter.categories.length > 0) {
				const categoryList = filter.categories.map(category => `'${category}'`).join(', ');

				page = await sql`SELECT * FROM tienda.catalogo
					WHERE discount > 0
					AND category IN (${categoryList})
					ORDER BY created_at ASC
					OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`
				;
			}else{
				page = await sql`SELECT * FROM tienda.catalogo
					WHERE discount > 0
					ORDER BY created_at ASC
					OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`
				;
			}
		} else {
			if (filter.categories.length > 0) {
				const categoryList = filter.categories.map(category => `'${category}'`).join(', ');

				page = await sql`SELECT * FROM tienda.catalogo
					WHERE category IN (${categoryList})
					ORDER BY created_at ASC
					OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`
				;
			}else{
				page = await sql`SELECT * FROM tienda.catalogo
					ORDER BY created_at ASC
					OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`
				;
			}
		}

		return page.rows as Product[];
	} catch (error) {
		console.error('Failed to fetch page of products:', error);
		throw new Error('Failed to fetch page of products');
	}
}

export async function getSearchedProductsByPageWithFilters(pageNumber: number, query: string, filter: ProductFilter): Promise<Product[]> {
	noStore();

	if (pageNumber < 1) { return [] }; // throw an error instead?
	const pageOffset = (pageNumber - 1) * ITEMS_PER_PAGE;

	// sanitize query: escape all characters? prepared statements?
	// https://www.postgresql.org/docs/current/sql-prepare.html
	const escapeAll = (s: string) => s.split("").map(c => "\\" + c).join("");
	query = escapeAll(query);

	try {
		let page;

		if (filter.discounted) {
			if (filter.categories.length > 0) {
				const categoryList = filter.categories.map(category => `'${category}'`).join(', ');

				page = await sql`SELECT * FROM tienda.catalogo
					WHERE discount > 0
					AND (
						name ILIKE '%${query}%' OR
						description ILIKE '%${query}%' OR
						category ILIKE '%${query}%'
					)
					AND category IN (${categoryList})
					ORDER BY created_at ASC
					OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`
					;
			}else{
				page = await sql`SELECT * FROM tienda.catalogo
					WHERE discount > 0
					AND (
						name ILIKE '%${query}%' OR
						description ILIKE '%${query}%' OR
						category ILIKE '%${query}%'
					)
					ORDER BY created_at ASC
					OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`
					;
			}
		} else {
			if (filter.categories.length > 0){
				const categoryList = filter.categories.map(category => `'${category}'`).join(', ');

				page = await sql`SELECT * FROM tienda.catalogo
					WHERE category IN (${categoryList})
					AND (
						name ILIKE '%${query}%' OR
						description ILIKE '%${query}%' OR
						category ILIKE '%${query}%'
					)
					ORDER BY created_at ASC
					OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`
					;
			}else{
				page = await sql`SELECT * FROM tienda.catalogo
					WHERE name ILIKE '%${query}%' OR
						  description ILIKE '%${query}%' OR
						  category ILIKE '%${query}%'
					ORDER BY created_at ASC
					OFFSET ${pageOffset} LIMIT ${ITEMS_PER_PAGE}`
					;
			}
		}

		return page.rows as Product[];

	} catch (error) {
		console.error('Failed to fetch page of filtered products:', error);
		throw new Error('Failed to fetch page of filtered products');
	}
}

export async function fetchProductsPagesWithFilters(query: string, filter: ProductFilter): Promise<number> {
	noStore();

	try {
		let count;

		if (filter.discounted) {
			if (filter.categories.length > 0) {
				const categoryList = filter.categories.map(category => `'${category}'`).join(', ');

				count = await sql`SELECT COUNT(*) 
					FROM tienda.catalogo
					WHERE discount > 0
					AND (
						name ILIKE '%${query}%' OR
						description ILIKE '%${query}%' OR
						category ILIKE '%${query}%'	
					)
					AND category IN (${categoryList})`
				;
			} else {
				count = await sql`SELECT COUNT(*) 
					FROM tienda.catalogo
					WHERE discount > 0
					AND (
						name ILIKE '%${query}%' OR
						description ILIKE '%${query}%' OR
						category ILIKE '%${query}%'	
					)`
				;
			}
		} else {
			if (filter.categories.length > 0) {
				const categoryList = filter.categories.map(category => `'${category}'`).join(', ');

				count = await sql`SELECT COUNT(*) 
					FROM tienda.catalogo
					WHERE category IN (${categoryList})
					AND (
						name ILIKE '%${query}%' OR
						description ILIKE '%${query}%' OR
						category ILIKE '%${query}%'
					)`
				;
			} else {
				count = await sql`SELECT COUNT(*) 
					FROM tienda.catalogo
					WHERE
						name ILIKE '%${query}%' OR
						description ILIKE '%${query}%' OR
						category ILIKE '%${query}%'`
				;
			}
		}

		const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
		return totalPages;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch total number of products.');
	}
}

export async function getProductsCategories(): Promise<string[]> {
	try {
		const result = await sql`SELECT DISTINCT category FROM tienda.catalogo`;

		const categories = result.rows.map(row => row.category);

		return categories;

	} catch (error) {
		console.error('Failed to fetch page of products:', error);
		throw new Error('Failed to fetch page of products');
	}
}