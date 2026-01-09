"use server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { SignUpFormData } from "@/components/forms/authForm/form";

export async function registerUserAction(data: SignUpFormData) {
  const { name, email, password } = data;

  try {
    // 1. Verificar si el usuario ya existe
    const existingUser = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;
    
    // Usamos (existingUser.rowCount ?? 0) para evitar el error de 'null'
    if ((existingUser.rowCount ?? 0) > 0) {
      return { error: "El correo ya está registrado" };
    }

    // 2. Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insertar en PostgreSQL (Neon)
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Error interno al crear la cuenta" };
  }
}