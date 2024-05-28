/*
const productData = [
	{ id: 33575, name: 'Producto A', description: 'Un gran producto', category: 'Misc.', price: 119204, rating: 1.4, image: '/products/1.jpeg' },
	{ id: 33576, name: 'Producto B', description: 'Un gran producto', category: 'Misc.', price: 219264, rating: 2.4, image: '/products/2.jpeg' },
	{ id: 33577, name: 'Producto C', description: 'Un gran producto', category: 'Misc.', price: 319234, rating: 3.4, image: '/products/3.jpeg' },
	{ id: 33578, name: 'Producto D', description: 'Un gran producto', category: 'Misc.', price: 419254, rating: 4.4, image: '/products/4.jpeg' },
	{ id: 33579, name: 'Producto E', description: 'Un gran producto', category: 'Misc.', price: 519264, rating: 5.0, image: '/products/1.jpeg' },
	{ id: 33580, name: 'Producto F', description: 'Un gran producto', category: 'Misc.', price: 619264, rating: 5.2, image: '/products/2.jpeg' },
	{ id: 33581, name: 'Producto G', description: 'Un gran producto', category: 'Misc.', price: 719264, rating: 5.4, image: '/products/3.jpeg' },
	{ id: 33582, name: 'Producto H', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 3.4, image: '/products/4.jpeg' },
	{ id: 33583, name: 'Producto I', description: 'Un gran producto', category: 'Misc.', price: 819200, rating: 4.4, image: '/products/1.jpeg' },
	{ id: 33584, name: 'Producto J', description: 'Un gran producto', category: 'Misc.', price: 819260, rating: 2.0, image: '/products/2.jpeg' },
	{ id: 33585, name: 'Producto K', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 1.5, image: '/products/3.jpeg' },
	{ id: 33586, name: 'Producto L', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 2.1, image: '/products/4.jpeg' },
	{ id: 33587, name: 'Producto M', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.3, image: '/products/1.jpeg' },
	{ id: 33588, name: 'Producto N', description: 'Un gran producto', category: 'Misc.', price: 819200, rating: 1.4, image: '/products/2.jpeg' },
	{ id: 33589, name: 'Producto O', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: '/products/3.jpeg' },
	{ id: 33590, name: 'Producto P', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 5.6, image: '/products/4.jpeg' },
	{ id: 33591, name: 'Producto Q', description: 'Un gran producto', category: 'Misc.', price: 819200, rating: 2.9, image: '/products/1.jpeg' },
	{ id: 33592, name: 'Producto R', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 1.8, image: '/products/2.jpeg' },
	{ id: 33593, name: 'Producto S', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 2.8, image: '/products/3.jpeg' },
	{ id: 33594, name: 'Producto T', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.8, image: '/products/4.jpeg' },
];

*/

const productData = [
	{ id: 33575, name: 'Producto A', description: 'Un gran producto', category: 'Misc.', price: 119204, rating: 1.4, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162897/u8v054tp9atqnawvipni.jpg' },
	{ id: 33576, name: 'Producto B', description: 'Un gran producto', category: 'Misc.', price: 219264, rating: 2.4, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162897/ej2hqudgndw9orbsgjtw.jpg' },
	{ id: 33577, name: 'Producto C', description: 'Un gran producto', category: 'Misc.', price: 319234, rating: 3.4, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162897/emlnobiv72j4mvhe1ta3.jpg' },
	{ id: 33578, name: 'Producto D', description: 'Un gran producto', category: 'Misc.', price: 419254, rating: 4.4, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162896/mtdfvxb6fc5wql8opygl.jpg' },
	{ id: 33579, name: 'Producto E', description: 'Un gran producto', category: 'Misc.', price: 519264, rating: 5.0, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162896/v8dia4pdh0d8xlyqt75g.jpg' },
	{ id: 33580, name: 'Producto F', description: 'Un gran producto', category: 'Misc.', price: 619264, rating: 5.2, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162896/mw9ar7hf1frvnk9bzvde.jpg' },
	{ id: 33581, name: 'Producto G', description: 'Un gran producto', category: 'Misc.', price: 719264, rating: 5.4, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162896/v65f4nn0tfzaew1zr09b.jpg' },
	{ id: 33582, name: 'Producto H', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 3.4, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162895/u2x0svjwkbkphwgxqb9e.jpg' },
	{ id: 33583, name: 'Producto I', description: 'Un gran producto', category: 'Misc.', price: 819200, rating: 4.4, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162897/u8v054tp9atqnawvipni.jpg' },
	{ id: 33584, name: 'Producto J', description: 'Un gran producto', category: 'Misc.', price: 819260, rating: 2.0, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162897/ej2hqudgndw9orbsgjtw.jpg' },
	{ id: 33585, name: 'Producto K', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 1.5, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162897/emlnobiv72j4mvhe1ta3.jpg' },
	{ id: 33586, name: 'Producto L', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 2.1, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162896/mtdfvxb6fc5wql8opygl.jpg' },
	{ id: 33587, name: 'Producto M', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.3, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162896/v8dia4pdh0d8xlyqt75g.jpg' },
	{ id: 33588, name: 'Producto N', description: 'Un gran producto', category: 'Misc.', price: 819200, rating: 1.4, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162896/mw9ar7hf1frvnk9bzvde.jpg' },
	{ id: 33589, name: 'Producto O', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.4, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162896/v65f4nn0tfzaew1zr09b.jpg' },
	{ id: 33590, name: 'Producto P', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 5.6, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162895/u2x0svjwkbkphwgxqb9e.jpg' },
	{ id: 33591, name: 'Producto Q', description: 'Un gran producto', category: 'Misc.', price: 819200, rating: 2.9, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162897/u8v054tp9atqnawvipni.jpg' },
	{ id: 33592, name: 'Producto R', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 1.8, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162897/ej2hqudgndw9orbsgjtw.jpg' },
	{ id: 33593, name: 'Producto S', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 2.8, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162897/emlnobiv72j4mvhe1ta3.jpg' },
	{ id: 33594, name: 'Producto T', description: 'Un gran producto', category: 'Misc.', price: 819264, rating: 4.8, image: 'https://res.cloudinary.com/dfg5hzq3k/image/upload/v1716162896/mtdfvxb6fc5wql8opygl.jpg' },
];

module.exports = productData;