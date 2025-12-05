import conn from "@/config/db";
import { User, UserByID, userByUserName } from "@/types/user";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export async function findUserByID(id: string) {
    try {
        const [row] = await conn.query<UserByID[]>(`SELECT id, user, status, password FROM users WHERE id = ?`, [id]);

        return row[0];
    } catch (error) {
        console.error(error);
        throw error;

    }
}

export async function findUserByUserName(username: string) {
    try {
        const [row] = await conn.query<userByUserName[]>("SELECT id, status, password, user FROM users WHERE user = ?", [username]);

        return row[0];
    } catch (error) {
        console.error(error);
        throw new Error("Error al buscar el usuario.");
    }
}

export async function findAllUsers() {
    try {
        const [rows] = await conn.query<User[] & RowDataPacket[]>("SELECT * FROM users");

        return rows;
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener los usuarios.");
    }
}

export async function modifyUser(id: string, user: string, password: string) {
    try {
        const [result] = await conn.query<ResultSetHeader>("UPDATE users SET password = ?, user = ?  WHERE id = ?", [password, user, id]);

        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar el usuario.");
    }
}

export async function modifyStatusUser(id: string, status: 0 | 1) {
    try {
        if (status == 0) {
            const [result] = await conn.query<ResultSetHeader>("UPDATE users SET status = ?, delete_at = NOW() WHERE id = ?", [status, id]);
            return result;
        } else {
            const [result] = await conn.query<ResultSetHeader>("UPDATE users SET status = ?, delete_at = NULL WHERE id = ?", [status, id]);
            return result;
        }
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar el estado del usuario.");
    }
}

export async function removeUsers() {
    try {
        const [result] = await conn.query<ResultSetHeader>("DELETE FROM users WHERE delete_at < NOW() - INTERVAL 30 DAY");

        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error al eliminar los usuarios.");
    }
}

export async function insertUser(id: string, username: string, password: string) {
    try {
        const [result] = await conn.query<ResultSetHeader>("INSERT INTO users (id, user, password) VALUES (?, ?, ?)", [id, username, password]);

        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error al crear el usuario.");
    }
}