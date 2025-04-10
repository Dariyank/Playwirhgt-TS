import { test, request, expect } from '@playwright/test';
import { login } from '../objects/api/authObjects';
import { getBrands, getProductsByBrand } from '../objects/api/productObjects';
import { createCart, addProductToCart } from '../objects/api/cartObjects';
import { checkout } from '../objects/api/paymentObjects';

let paymentInfo = {
  payment_method: "bank-transfer",
  payment_details: {
    bank_name: "BHD",
    account_name: "Dariyank S",
    account_number: "124341234123412"
  }
}

test('Complete API Store Flow', async ({request}) => {

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
