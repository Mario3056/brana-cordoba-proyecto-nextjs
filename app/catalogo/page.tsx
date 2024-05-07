import Card from "../ui/catalogo/card";

export default function Catalogo() {
	return (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-wrap -m-4">
					<Card/>
					<Card/>
					<Card/>
					<Card/>
					<Card/>
					<Card/>
					<Card/>
					<Card/>
				</div>
			</div>
		</section>
	);
}
