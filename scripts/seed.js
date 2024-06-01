const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');
const productos = require('./seed_data.js');

async function createDB(client) {
	console.log("--------------------------------");
	console.log("Creating schema...");
	await client.sql`CREATE SCHEMA IF NOT EXISTS tienda;`;
	
	console.log("Creating UUID extension...");
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
	
	console.log("Creating product serial...");
	await client.sql`CREATE SEQUENCE IF NOT EXISTS tienda.serial_id START WITH 33575;`;
	console.log("--------------------------------");
	console.log("\n");
}

async function createAdministrators(client) {
	console.log("--------------------------------");
	console.log("Creating admin table");
	await client.sql`CREATE TABLE IF NOT EXISTS tienda.administradores (
		id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL
	);`;
	console.log("Admin table created");
	console.log("--------------------------------");
	
	// const adminID = "e34dbb81-8aac-41b5-805a-d6441de49a86";
	const adminEmail = "admin@admin.com";
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash('admin', saltRounds);
	
	console.log("Creating the admin account");
	await client.sql`INSERT INTO tienda.administradores (email, password) VALUES (${adminEmail}, ${hashedPassword}) ON CONFLICT (email) DO NOTHING;`;
	console.log("Admin account created");
	console.log("--------------------------------");
	console.log("\n");
}

async function createProducts(client) {	
	console.log("--------------------------------");
	console.log("Creating products table...");
	await client.sql`CREATE TABLE IF NOT EXISTS tienda.catalogo (
		id integer NOT NULL DEFAULT nextval('tienda.serial_id'),
		name text DEFAULT 'Producto'::text,
		description text DEFAULT 'Una descripcion elocuente y util para el usuario'::text,
		category text DEFAULT 'Misc.'::text,
		price integer DEFAULT 0,
		rating real DEFAULT 0,
		image text DEFAULT '/products/placeholder.png'::text,
		created_at timestamp with time zone DEFAULT NOW(),
		modified_at timestamp with time zone DEFAULT NOW(),
		CONSTRAINT catalogo_pk PRIMARY KEY (id)
	);`;
	console.log("Created products table");
	console.log("--------------------------------");
	console.log("Inserting placeholder products...");
	await Promise.all(
		productos.map(p => 
			client.sql`INSERT INTO tienda.catalogo
				(name, description, category, price, rating, image) VALUES
				(${p.name}, ${p.description},
					${p.category}, ${p.price}, ${p.rating},
					${p.image}) ON CONFLICT (id) DO NOTHING;`	)
	);	
	console.log("Placeholder products inserted");
	console.log("--------------------------------");
	console.log("\n");
}

async function createDeletedProductsTable(client) {
	console.log("--------------------------------");
	console.log("Creating deleted products table...");
	client.sql`CREATE TABLE IF NOT EXISTS tienda.deleted_products (LIKE tienda.catalogo)`;
	console.log("Created deleted products table");
	
	console.log("--------------------------------");
	
	console.log("Creating stored procedures...");
	await client.sql`CREATE OR REPLACE PROCEDURE tienda.DeleteProduct(_id integer)
		LANGUAGE plpgsql as $$
		BEGIN
			WITH moved_rows AS (
				DELETE FROM tienda.catalogo WHERE tienda.catalogo.id = _id RETURNING *
			) INSERT INTO tienda.deleted_products SELECT * FROM moved_rows;
		END; $$`;

	await client.sql`CREATE OR REPLACE PROCEDURE tienda.RestoreProduct(_id integer)
		LANGUAGE plpgsql as $$
		BEGIN
			WITH moved_rows AS (
				DELETE FROM tienda.deleted_products WHERE tienda.deleted_products.id = _id RETURNING *
			) INSERT INTO tienda.catalogo SELECT * FROM moved_rows;
		END; $$`;
	console.log("Created stored procedures");
	console.log("--------------------------------");
	console.log("\n");
}

const main = async () => {
	const client = await db.connect();
	
	await createDB(client);
	await createAdministrators(client);
	await createProducts(client);
	await createDeletedProductsTable(client);
	
	await client.end(() => {console.log("Closing connection...");});
}

main().catch( (err) => {
	console.error(err);
});