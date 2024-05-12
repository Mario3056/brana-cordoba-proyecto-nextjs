import CardSkeleton from "../ui/catalogo/cardSkeleton";

export default function Loading() {
    const numElements = 8;
    const elements = [];

    for (let i=0; i < numElements; i++) {
        elements.push(<CardSkeleton/>);
    }

    return (
        <section className="text-gray-600 body-font">
			
			<div className="container px-5 py-24 mx-auto">
			
				<div className="flex flex-wrap -m-4">
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
                    <CardSkeleton/>
				</div>
			</div>
		</section>
    );
  }