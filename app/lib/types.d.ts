export interface CartProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
  discount: number;
}

export type PaymentInformation = {
	id: string;
	amount: number;
	status: string;
	timestamp: number;
}

export type AdminUser = {
  id: string;
  email: string;
  password: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string; // enum?
  rating: number;
  discount: number;
  price: number;
  image: string;
  created_at: string;
  modified_at: string;
};

export type ProductFormState = {
	errors?: {
		name?: string[],
		description?: string[],
		category?: string[],
		price?: string[],
		image?: string[],
		// ...?	
	};
	
	message?: string | null;
}

export type ProductEditFormState = {
	errors?: {
    id?: string[],
		name?: string[],
		description?: string[],
		category?: string[],
		price?: string[],
		image?: string[],
		// ...?	
	};
	
	message?: string | null;
}

export const placeholderProduct: Product = {
  id: "placeholder-id",
  name: "placeholder product",
  description: "placeholder description",
  category: "placeholder category",
  rating: 5.0,
  price: 819264,
  discount: 0.0,
  image: "/products/placeholder.png",
  created_at: "placeholder",
  modified_at: "placeholder",
};

export const emptyProduct: Product = {
	id: undefined,
	name: undefined,
	description: undefined,
	category: undefined,
	rating: 0.0,
	price: undefined,
	discount: 0.0,
	image: '',
	created_at: undefined,
	modified_at: undefined
}

interface PostCompraStatusType {
  status: string;
  title: string;
  description: string;
}

interface PostCompraMessageType {
	type: "approved" | "failure" | null;
}

export type ProductComment = {
  name: string;
  rating: number;
  content: string;
}