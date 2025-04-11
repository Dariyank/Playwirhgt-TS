import { APIRequestContext } from '@playwright/test';
import { ProductInfo, Product, ProductResponse } from '../types/product';

export async function getBrands(request: APIRequestContext): Promise<any[]> {
  const res = await request.get('/brands', {});
  return res.json();
}

export async function getCategories(request: APIRequestContext): Promise<any[]> {
  const res = await request.get('/categories', {});
  return res.json();
}

export async function getImages(request: APIRequestContext): Promise<any[]> {
  const res = await request.get('/images', {});
  return res.json();
}

export async function addNewProduct(
  request: APIRequestContext, 
  productInfo: string
):Promise< {status: number; body: any[]}> {
  const res = await request.post('/products', {
    data: JSON.parse(productInfo)
  });

  const status = res.status();
  const body = res.json() as any;
  return {status, body};
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
