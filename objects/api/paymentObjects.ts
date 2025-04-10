import { APIRequestContext } from '@playwright/test';

interface PaymentInfo {
  payment_method: string;
  payment_details: object;
}

type CheckoutResponse = {
  message: string;
};

export async function checkout(
  request: APIRequestContext,
  paymentInfo: PaymentInfo
): Promise<{ status: number; body: CheckoutResponse }> {
  const res = await request.post(`/payment/check`, {
    data: paymentInfo,
  });

  const status = res.status();
  const body = await res.json() as CheckoutResponse;

  return { status, body };
}
