export interface User {
    id: number;
    username: string;
    role: Role;
    empleadoId?: number;
}

export type Role = 'ADMIN' | 'COORDINADOR' | 'EMPLEADO';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}