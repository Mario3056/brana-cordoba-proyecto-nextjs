import StarRating from '@/app/ui/starRating'

export default function Producto({ params }: { params: { id: string } }) {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg"/>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">CATEGORIA</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">Producto</h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <StarRating rating={5.0} />
                                    <span className="text-gray-600 ml-3">Puntuación</span>
                                </span>
                            </div>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">$100.00</span>
                                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Agregar al carrito</button>
                            </div>
                        </div>
                </div>
            </div>
        </section>
    )
}