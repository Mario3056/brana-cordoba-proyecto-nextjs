export default function RandomProductsSkeleton(){
    return(
        <>
            <>
			<ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<li>
					<div className="group block overflow-hidden">
                        <div className="skeleton h-[350px] w-full object-cover sm:h-[450px]"></div>

						<div className="relative bg-white pt-3">
                            <div className="flex flex-col gap-4 w-52">
                              <div className="skeleton h-4 w-1/4"></div>
                              <div className="skeleton h-4 w-1/2"></div>
                            </div>
						</div>
					</div>
				</li>

				<li>
					<div className="group block overflow-hidden">
                        <div className="skeleton h-[350px] w-full object-cover sm:h-[450px]"></div>

						<div className="relative bg-white pt-3">
                            <div className="flex flex-col gap-4 w-52">
                              <div className="skeleton h-4 w-1/4"></div>
                              <div className="skeleton h-4 w-1/2"></div>
                            </div>
						</div>
					</div>
				</li>

				<li>
					<div className="group block overflow-hidden">
                        <div className="skeleton h-[350px] w-full object-cover sm:h-[450px]"></div>

						<div className="relative bg-white pt-3">
                            <div className="flex flex-col gap-4 w-52">
                              <div className="skeleton h-4 w-1/4"></div>
                              <div className="skeleton h-4 w-1/2"></div>
                            </div>
						</div>
					</div>
				</li>

				<li>
					<div className="group block overflow-hidden">
                        <div className="skeleton h-[350px] w-full object-cover sm:h-[450px]"></div>

						<div className="relative bg-white pt-3">
                            <div className="flex flex-col gap-4 w-52">
                              <div className="skeleton h-4 w-1/4"></div>
                              <div className="skeleton h-4 w-1/2"></div>
                            </div>
						</div>
					</div>
				</li>
			</ul>
		</>
        </>
    )
}