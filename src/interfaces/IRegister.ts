export interface IRegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface IRegisterResponse {
    message: string;
    user?: {
        uid: string;
        name: string;
        email: string;
        createdAt: string;
    };
    error?: string;
}
