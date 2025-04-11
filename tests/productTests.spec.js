import { test, expect } from '@playwright/test';
import { getBrands, getCategories, getProductsByBrand, getImages, addNewProduct } from '../objects/api/productObjects';

test('Agregar nuevo producto a marca', async ({request}) => {

    const brands = await getBrands(request);
    const brandId = brands[0].id;
    const categories = await getCategories(request);
    const categoriyId = categories[0].id;
    const images = await getImages(request);
    const imageId = images[0].id;

    let newProduct = {
        name: "Fierro golpeador de pareja felices",
        description: "This is a simple description typed ny my own hand cause I dont want to use the lorem impsu template like a normal person would do in this situation. Here I am, typing nonsense for the sake of being unique. I like pasta with spicy mango",
        price: 2.99,
        category_id: categoriyId,
        brand_id: brandId,
        product_image_id: imageId,
        is_location_offer: 1,
        is_rental: 0
    }

    const jsonProduct = JSON.stringify(newProduct);

    const productAdded = await addNewProduct(request, jsonProduct);
    expect(productAdded.status).toBe(201);
});