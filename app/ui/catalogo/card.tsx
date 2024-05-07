export default function Card() {
    return (
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <a href="/producto/5" className="group block overflow-hidden">
                <img
                    src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg"
                    alt=""
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />

                <div className="relative bg-white pt-3">
                    <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                        Producto
                    </h3>

                    <p className="mt-2">
                        <span className="tracking-wider text-gray-900"> $100.00 </span>
                    </p>
                </div>
            </a>
        </div>
    );
}