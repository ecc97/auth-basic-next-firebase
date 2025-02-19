export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    message?: string;
    user?: {
        uid?: string;
        email: string;
        name?: string;
    };
    error?: string;
}
