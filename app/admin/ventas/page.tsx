import type { SalesRecord } from '@/app/lib/types.d';

import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Ventas - LibreMercado' };

import { getAllSales } from '@/app/lib/queries'
// import { getAllSales } from '@/app/lib/queries_local'

export default async function Ventas() {
	const salesRecords = await getAllSales();
	return (
		<div className="mx-auto">
			<h1 className="text-center font-bold text-lg underline"> Ventas </h1>
			{ salesRecords.map(record => <p key={record.id}> {record.id} </p>) }
		</div>
	);
} 