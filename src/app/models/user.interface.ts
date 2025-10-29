export interface User {
    _id: string;
    nombre: string;
    email: string;
    rol: 'ADMIN' | 'CLIENTE' | 'INVITADO';
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token: string;
    user: User;
}