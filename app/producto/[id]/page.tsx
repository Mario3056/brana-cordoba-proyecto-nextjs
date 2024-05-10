import { getProductById } from '@/app/lib/queries_local'
import Card from '@/app/ui/product/card';

export default async function Producto({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);
    return (
        <>
            <Card product={product}/>
        </>
    )
}