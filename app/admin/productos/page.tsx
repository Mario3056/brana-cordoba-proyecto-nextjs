import Table from '@/app/ui/admin/productos/table';

 export default function Productos() {
	return (
		<section className="text-gray-600 body-font">
			<Table query={""} currentPage={1}/>
		</section>
	);
 }