export interface ApiResponse<T> {
    status: number;
    data: T;
    message?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface CreateUserRequest {
    name: string;
    email: string;
}

export interface UpdateUserRequest {
    name?: string;
    email?: string;
}