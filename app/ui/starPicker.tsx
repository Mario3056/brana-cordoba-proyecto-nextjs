// Must be child of a form to be useful
export default function StarPicker({ rating } : { rating?: number}) {
	const values = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
	
	const makeRatingHTML = (r?: number) => {
		if (r == undefined) { r = values[0]; }
	
		let inputs = [];

		for (let i = 0; i < values.length; i++) {
			let checked = (values[i] == r);

			if (i == 0) {
				inputs.push(<input type="radio" key={i}
								   name="rating"
								   value={values[i]}
								   className="rating-hidden hidden"
								   defaultChecked={checked} /> );
			} else if (i % 2 != 0) {
				inputs.push(<input type="radio" key={i}
								   name="rating"
								   value={values[i]}
								   className="bg-orange-500 mask mask-star-2 mask-half-1"
								   defaultChecked={checked} /> );
			} else {
				inputs.push(<input type="radio" key={i}
								   name="rating"
								   value={values[i]}
								   className="bg-orange-500 mask mask-star-2 mask-half-2"
								   defaultChecked={checked} />);
			}
		}

		return inputs;
	}

	return (
		<div className="rating rating-half">
			{ makeRatingHTML(rating) }
		</div>
	);
}