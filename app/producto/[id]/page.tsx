import { getProductById } from '@/app/lib/queries_local'
import Card from '@/app/ui/product/card';
import CommentCard from '@/app/ui/product/comments/card';
import { ProductComment } from '@/app/lib/types';
import AddNewCommentForm from '@/app/ui/product/comments/addNewForm';

export default async function Producto({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);
    const comentario: ProductComment = {
        name: "The Catalyzer",
        rating: 2,
        comment: "Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine."
    }

    return (
        <>
            <Card product={product} />
            
            <section className="text-gray-600 body-font">
                <div className="container pt-5 pb-15 py-5 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Comentarios</h1>

                    </div>
                    <div className="flex flex-wrap -m-4">
                        <CommentCard comment={comentario} />   
                        <CommentCard comment={comentario} />
                        <CommentCard comment={comentario} />                     
                    </div>
                </div>
            </section>

            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Agregar comentario</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Nos encantaría conocer tu opinión. Por favor, comparte tus comentarios y opiniones sobre el producto.</p>
                    </div>
                    <AddNewCommentForm/>
                </div>
            </section>
        </>
    )
}