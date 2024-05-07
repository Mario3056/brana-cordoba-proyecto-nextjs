const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

async function createDB(client) {
	console.log("--------------------------------");
	console.log("Creating schema...");
	await client.sql`CREATE SCHEMA IF NOT EXISTS tienda;`;
	
	console.log("Creating UUID extension...");
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
	
	console.log("Creating product serial...");
	await client.sql`CREATE SEQUENCE IF NOT EXISTS tienda.serial_id START WITH 33575;`;
	console.log("--------------------------------");
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
}

let productos = [
	{ id: 33575, name: 'Producto A', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33576, name: 'Producto B', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33577, name: 'Producto C', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33578, name: 'Producto D', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33579, name: 'Producto E', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33580, name: 'Producto F', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33581, name: 'Producto G', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33582, name: 'Producto H', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33583, name: 'Producto I', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33584, name: 'Producto J', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33585, name: 'Producto K', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33586, name: 'Producto L', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33587, name: 'Producto M', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33588, name: 'Producto N', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33589, name: 'Producto O', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33590, name: 'Producto P', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33591, name: 'Producto Q', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33592, name: 'Producto R', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
	{ id: 33593, name: 'Producto S', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'products/placeholder.png' },
];

async function createProducts(client) {
	console.log("--------------------------------");
	console.log("Creating products table");
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
	console.log("Creating products table");
	console.log("--------------------------------");
	console.log("Inserting placeholder products");
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
}

const main = async () => {
	const client = await db.connect();
	
	await createDB(client);
	await createAdministrators(client);
	await createProducts(client);
	
	await client.end(() => {console.log("Closing connection...");});
}

main().catch( (err) => {
	console.error(err);
});