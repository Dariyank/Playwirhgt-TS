import { test, expect } from '@playwright/test';
import { login } from '../objects/api/authObjects';
import { getBrands, getProductsByBrand } from '../objects/api/productObjects';
import { createCart, addProductToCart } from '../objects/api/cartObjects';
import { checkout } from '../objects/api/paymentObjects';

//Fake information
let paymentInfo = {
  payment_method: "bank-transfer",
  payment_details: {
    bank_name: "BHD",
    account_name: "Dariyank S",
    account_number: "124341234123412"
  }
}

let productInfo = {
  name: "Martillo rojo",
  description: "Esta es uyna descripcion corta porque si",
  price: 1.99,
  category_id: "01JRECGR32D2ATTP5XFSPRFAF3",
  brand_id: "1",
  product_image_id: "1",
  is_location_offer: 1,
  is_rental: 0
}

test('Complete API Store Flow', async ({request}) => {

  //Token taken but not used becuase is not needed 
  const token = await login(request, 'customer@practicesoftwaretesting.com', 'welcome01');

  const brands = await getBrands(request);

  const brandId = brands[0]?.id;
  expect(brandId).toBeTruthy();

  const products = await getProductsByBrand(request, brandId);
  const productId = products[0].id;
  expect(productId).toBeTruthy();

  const cart = await createCart(request);
  // Never used but it could be used someday 
  const added = await addProductToCart(request, cart.id, productId);

  const paymentResult = await checkout(request, paymentInfo);

  expect(paymentResult.status).toBe(200);
  expect(paymentResult.body.message).toBe("Payment was successful");
});
