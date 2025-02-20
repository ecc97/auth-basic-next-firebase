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
    error?: IErrorResponse;
}

export interface IErrorResponse {
    error?: string;
    status?: number; 
    message?: string;
}