import { test, expect } from '@playwright/test';

export class ApiHelper {
    static async createUser(request: any, url:any, user: { name: string; gender: string; email: string; status: string },token:string): Promise<string | null> {
        const response = await request.post(url, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            data: {
                name: user.name,
                gender: user.gender,
                email: user.email,
                status: user.status,
            },
        });

        const respJson = await response.json();
        expect(response.status()).toBe(201);
        expect(respJson.name).toEqual(user.name);
        expect(respJson.email).toEqual(user.email);
        expect(respJson.gender).toEqual(user.gender);
        expect(respJson.status).toEqual(user.status);

        if (response.status() === 201) {
            return respJson.id;
        } 
        else {
            console.error('Failed to create user:', respJson);
            return null;
        }
    }

    static async getSpecificUser(request: any, url:any, userId:any, user: { name: string; gender: string; email: string; status: string },token:string) {
        const response = await request.get(url + '/' + userId, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });

        const respJson = await response.json();
        expect(response.status()).toBe(200);
        expect(respJson.id).toEqual(userId);
        expect(respJson.name).toEqual(user.name);
        expect(respJson.email).toEqual(user.email);
        expect(respJson.gender).toEqual(user.gender);
        expect(respJson.status).toEqual(user.status);
    }

    
    static async deleteSpecificUser(request: any, url:any, userId:any, token:string){
        const response = await request.delete(url + '/' + userId, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        expect(response.status()).toBe(204);
    }

    static async createUserWithInvalidOrMissingToken(request: any, url:any, user: { name: string; gender: string; email: string; status: string },wrongToken:string) {
        const response = await request.post(url, {
            headers: {
                Authorization: wrongToken,
                'Content-Type': 'application/json',
            },
            data: {
                name: user.name,
                gender: user.gender,
                email: user.email,
                status: user.status,
            },
        });

        expect(response.status()).toBe(401);
    }

    static async createDuplicateUser(request: any, url:any, user: { name: string; gender: string; email: string; status: string },token:string) {
        const response = await request.post(url, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            data: {
                name: user.name,
                gender: user.gender,
                email: user.email,
                status: user.status,
            },
        });

        const respJson = await response.json();

        const responseForSecondTime = await request.post(url, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            data: {
                name: user.name,
                gender: user.gender,
                email: user.email,
                status: user.status,
            },
        });
        expect(responseForSecondTime.status()).toBe(422);

        return respJson.id;
    }
}