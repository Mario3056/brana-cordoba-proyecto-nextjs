import Card from '@/app/ui/product/card';

import { getProductById } from '@/app/lib/queries_local'
// import { getProductById } from '@/app/lib/queries'

export default async function Producto({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);
    return (
        <>
            <Card product={product}/>
        </>
    )
}