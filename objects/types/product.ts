export type ProductInfo = {
    name: string,
    description: string,
    price: number,
    category_id: string,
    brand_id: number,
    product_image_id: number,
    is_location_offer: number,
    is_rental: number
}

export type ProductImage = {
    id: string;
    by_name: string;
    by_url: string;
    source_name: string;
    source_url: string;
    file_name: string;
    title: string;
};

export type ProductCategory = {
    id: string;
    name: string;
    slug: string;
    parent_id: string;
};

export type ProductBrand = {
    id: string;
    name: string;
    slug: string;
};

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    is_location_offer: boolean;
    is_rental: boolean;
    in_stock: boolean;
    product_image: ProductImage;
    category: ProductCategory;
    brand: ProductBrand;
};

export type ProductResponse = {
    current_page: number;
    data: Product[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
};
  