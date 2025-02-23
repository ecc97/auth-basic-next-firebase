export interface IRegisterRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IRegisterResponse {
    message: string;
    user?: {
        uid: string;
        name: string;
        email: string;
        createdAt: string;
    };
    error?: IErrorResponse;
}

export interface IErrorResponse {
    error?: string;
    status?: number; 
    message?: string;
}