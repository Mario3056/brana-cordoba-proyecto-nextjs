export default function StarRating({ rating } : { rating: number}) {
	const values = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

	const closestValueToRating = (r: number) => {
		if (r <= values[0]) { return values[0]; }
		if (r >= values[-1]) { return values[-1]; }
		for (let i = 0; i < values.length-1; i++) {
			if (values[i] < r && r < values[i+1]) {
				return values[i+1];
			}
		}
	}

	const makeRatingHTML = (r: number) => {
		let inputs = [];

		for (let i = 0; i < values.length; i++) {
			let checked = (values[i] == r);

			if (i == 0) {
				inputs.push(<input type="radio" key={i}
								   name="rating-viewer"
								   value={values[i]}
								   className="rating-hidden hidden"
								   checked={checked}
								   readOnly /> );
			} else if (i % 2 != 0) {
				inputs.push(<input type="radio" key={i}
								   name="rating-viewer"
								   value={values[i]}
								   className="bg-orange-500 mask mask-star-2 mask-half-1"
								   checked={checked}
								   readOnly /> );
			} else {
				inputs.push(<input type="radio" key={i}
								   name="rating-viewer"
								   value={values[i]}
								   className="bg-orange-500 mask mask-star-2 mask-half-2"
								   checked={checked}
								   readOnly />);
			}
		}

		return inputs;
	}

	return (
		<div className="rating rating-half"> {/* className="rating rating-lg rating-half p-2" */}
			{ makeRatingHTML(closestValueToRating( (rating == undefined) ? 0.0 : rating )) }
		</div>
	);
}
