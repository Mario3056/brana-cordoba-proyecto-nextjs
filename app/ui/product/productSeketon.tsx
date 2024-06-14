export default function ProductSkeleton(){
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">

                    <div className="skeleton lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"></div>

                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <div className="skeleton h-4 w-10"></div>
                        <div className="skeleton h-4 w-1/4 mt-3"></div>
                        <div className="skeleton h-4 w-2/5 mt-3"></div>
                        
                        <div className="skeleton h-4 w-full mt-10"></div>
                        <div className="skeleton h-4 w-full mt-3"></div>
                        <div className="skeleton h-4 w-full mt-3"></div>
                        <div className="skeleton h-4 w-full mt-3"></div>
                        <div className="skeleton h-4 w-1/2 mt-3"></div>

                        <div className="flex">
                            <div className="skeleton h-4 w-1/5 mt-10"></div> 
                            <div className="skeleton w-1/5 flex ml-auto border-0 py-2 px-6 rounded"></div>
                        </div>                       
                    </div>
                </div>
            </div>
        </section>
    )
}