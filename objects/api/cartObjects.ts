import { APIRequestContext } from '@playwright/test';

export async function createCart(request: APIRequestContext): Promise<any> {
  const res = await request.post('/carts', {});
  return res.json();
}

export async function addProductToCart(
  request: APIRequestContext,
  cartId: string,
  productId: string,
  quantity: number = 1
): Promise<any> {
  const res = await request.post(`/carts/${cartId}`, {
    data: { product_id: productId, quantity: quantity }
  });
  return res.json();
}
