export default function StarRating({ rating } : { rating?: number}) {
	const values = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

	const closestValueToRating = (r?: number) => {
		if (r == undefined) { return values[0]; }
		if (r <= values[0]) { return values[0]; }
		if (r >= values[values.length-1]) { return values[values.length-1]; }
		for (let i = 0; i < values.length-1; i++) {
			if (values[i] < r && r <= values[i+1]) {
				return values[i+1];
			}
		}
		
		return 2.5; // should be unreachable
	}
	
	const makeRandomString = () => {
		let alphabet = "abcdefghijklmnopqrstuvwxyz";
		let randomString = "";
		for ( let k = 0; k < 10; k++) {
			randomString += alphabet[Math.floor(Math.random()*alphabet.length)];
		}
		return randomString;
	}

	const makeRatingHTML = (r?: number) => {
		// unique names per rating must be used, to prevent collisions with the checked attribute
		// this will reduce collisions, at least
		let radioName = "rating-viewer-" + makeRandomString();
	
		if (r == undefined) { r = values[0]; }
	
		let inputs = [];

		for (let i = 0; i < values.length; i++) {
			let checked = (values[i] == r);

			if (i == 0) {
				inputs.push(<input type="radio" key={i}
								   name={radioName}
								   value={values[i]}
								   className="rating-hidden hidden"
								   checked={checked}
								   readOnly /> );
			} else if (i % 2 != 0) {
				inputs.push(<input type="radio" key={i}
								   name={radioName}
								   value={values[i]}
								   className="bg-orange-500 mask mask-star-2 mask-half-1"
								   checked={checked}
								   readOnly /> );
			} else {
				inputs.push(<input type="radio" key={i}
								   name={radioName}
								   value={values[i]}
								   className="bg-orange-500 mask mask-star-2 mask-half-2"
								   checked={checked}
								   readOnly />);
			}
		}

		return inputs;
	}
	
	// console.log(`Given ${rating}, closest is ${closestValueToRating( (rating == undefined) ? 0.0 : rating )}`);

	return (
		<div className="rating rating-half"> {/* className="rating rating-lg rating-half p-2" */}
			{ makeRatingHTML(closestValueToRating( (rating == undefined) ? 0.0 : rating )) }
		</div>
	);
}
