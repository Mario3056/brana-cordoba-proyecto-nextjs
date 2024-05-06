// Must be child of a form to be useful
export default function StarPicker() {
	return (
		<div className="rating rating-half">
			<input type="radio" name="rating" value="0.0" className="rating-hidden" defaultChecked />
			<input type="radio" name="rating" value="0.5" className="bg-orange-500 mask mask-star-2 mask-half-1" />
			<input type="radio" name="rating" value="1.0" className="bg-orange-500 mask mask-star-2 mask-half-2" />
			<input type="radio" name="rating" value="1.5" className="bg-orange-500 mask mask-star-2 mask-half-1" />
			<input type="radio" name="rating" value="2.0" className="bg-orange-500 mask mask-star-2 mask-half-2" />
			<input type="radio" name="rating" value="2.5" className="bg-orange-500 mask mask-star-2 mask-half-1" />
			<input type="radio" name="rating" value="3.0" className="bg-orange-500 mask mask-star-2 mask-half-2" />
			<input type="radio" name="rating" value="3.5" className="bg-orange-500 mask mask-star-2 mask-half-1" />
			<input type="radio" name="rating" value="4.0" className="bg-orange-500 mask mask-star-2 mask-half-2" />
			<input type="radio" name="rating" value="4.5" className="bg-orange-500 mask mask-star-2 mask-half-1" />
			<input type="radio" name="rating" value="5.0" className="bg-orange-500 mask mask-star-2 mask-half-2" />
		</div>
	);
}