"use server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { SignUpFormData } from "@/components/forms/authForm/form";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function requestPasswordReset(email: string) {
  try {
    // 1. Verificar si el usuario existe
    const userResult = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;
    if (userResult.rows.length === 0) {
      // Por seguridad, no decimos que el email no existe, 
      // solo retornamos éxito ficticio para evitar "email harvesting"
      return { success: true }; 
    }

    // 2. Generar token y expiración (1 hora)
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // +1 hora

    // 3. Guardar en la tabla password_reset_tokens
    await sql`
      INSERT INTO password_reset_tokens (email, token, expires)
      VALUES (${email}, ${token}, ${expires})
    `;

    // 4. Enviar el Email
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

    await resend.emails.send({
      from: "Stellium <onboarding@resend.dev>",
      to: email,
      subject: "Recupera tu contraseña de Stellium",
      html: `
        <p>Has solicitado restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para continuar:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Este enlace caducará en 1 hora.</p>
      `
    });

    return { success: true };
  } catch (error) {
    console.error("Reset Password Error:", error);
    return { error: "No se pudo procesar la solicitud." };
  }
}