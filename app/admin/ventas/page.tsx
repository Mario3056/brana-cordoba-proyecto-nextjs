import type { SalesRecord } from '@/app/lib/types.d';
import { shortenString } from '@/app/lib/utils';

import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Ventas - LibreMercado' };

import { getAllSales, getAllSalesStats } from '@/app/lib/queries'
// import { getAllSales, getAllSalesStats } from '@/app/lib/queries_local'

export default async function Ventas() {
	const salesRecords = await getAllSales();
	const salesStats = await getAllSalesStats();
	return (
		<div className="mx-auto">
			<h1 className="text-center font-bold text-2xl underline"> Ventas </h1>
			<h2 className="text-center font-bold text-lg"> Ganancias totales: ${salesStats?.toLocaleString() ?? "0"} </h2>
			
			<div className="flex flex-col">
			{ salesRecords.map((record,idx) =>
				<div className="flex flex-row border border-black my-2 py-2" key={record.id}>
					<p className="px-2"> {shortenString(record.id.toString(), 14)} </p>
					<p className="px-1"> | </p>
					<p className={"px-2 " + (record.status === "approved" ? "text-green-600" : "text-red-600")}> {record.status} </p>
					<p className="px-1"> | </p>
					<p className="px-2"> ${(record.amount/100).toLocaleString()} </p>
					<p className="px-1"> | </p>
					<p className="px-2"> {record.timestamp?.toLocaleString() ?? "Sin fecha"} </p>
				</div>
				)
			}
			</div>
		</div>
	);
} 