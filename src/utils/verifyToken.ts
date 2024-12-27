import { jwtVerify, JWTPayload } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET || "");

export const verifyToken = async (token: string): Promise<JWTPayload | null> => {
    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload; // Return the decoded token if valid
    } catch (error: any) {
        console.error('Invalid Token:', error.message);
        return null; // Return null if token is invalid
    }
};
