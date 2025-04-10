import { APIRequestContext, APIResponse } from '@playwright/test';

export async function login(request: APIRequestContext, email: string, password: string): Promise<string> {
    const response: APIResponse = await request.post('/users/login', {
        data: { email, password }
    });
    if (!response.ok()) {
        throw new Error(`Login failed: ${response.status()}`);
    }

    const body = await response.json();
    return body.access_token;
}
