export interface Title {
    id: number;
    title: string;
    overview: string | null;
    created_at: string;
    user: {
        id: number;
        name: string;
    };
}

export interface User {
    id: number;
    name: string;
}

export interface JWTUserPayload extends User {
    email: string;
}
