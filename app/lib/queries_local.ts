import { AdminUser, Product } from '@/app/lib/types';

import pg from 'pg'
const { Client } = pg

export async function getProducts(): Promise<Product[]> {
	const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
	await client.connect()
	const res = await client.query('SELECT * from tienda.catalogo;')
	await client.end()
	return res.rows as Product[];
}

export async function getUsers(): Promise<AdminUser[]> {
	const client = new Client({ host: "localhost", user: "postgres", password: "postgres", database: "VercelTest", port: 5432});
	await client.connect()
	const res = await client.query('SELECT * from tienda.administradores;')
	await client.end()
	return res.rows as AdminUser[];
}

