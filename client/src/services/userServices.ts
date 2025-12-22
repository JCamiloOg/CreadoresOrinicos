import { axiosInstance } from "@/config/axios";
import type { Login } from "@/types/users";

export async function login(data: Login) {
    return await axiosInstance.post<{ message: string, redirect?: string }>("/admin/login", data);
}

export async function verifySession() {
    return await axiosInstance.get<{ message: string, redirect?: string }>("/admin/login");
}

export async function logout() {
    return await axiosInstance.post<{ message: string, redirect: string }>("/admin/users/logout");
}