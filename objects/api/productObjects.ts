import { APIRequestContext } from '@playwright/test';
import { Product, ProductResponse } from '../../types/product';

export async function getBrands(request: APIRequestContext): Promise<any[]> {
  const res = await request.get('/brands', {});
  return res.json();
}

export async function getProductsByBrand(
  request: APIRequestContext,
  brandId: string
): Promise<Product[]> {
  const res = await request.get(`/products`, {
    params: { by_brand: brandId },
  });

  const body = await res.json() as ProductResponse;
  return body.data;
}
