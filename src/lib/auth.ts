import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres"; // Conector de DB
import bcrypt from "bcryptjs"; // Para comparar contraseñas

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 1. Validación básica de campos
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        try {
          // 2. Buscar usuario en PostgreSQL (Neon)
          // Usamos LIMIT 1 por seguridad y eficiencia
          const result = await sql`
            SELECT id, name, email, password 
            FROM users 
            WHERE email = ${credentials.email} 
            LIMIT 1
          `;
          
          const user = result.rows[0];

          // 3. Verificar si el usuario existe
          if (!user) {
            return null; // El usuario no existe
          }

          // 4. Verificar si tiene contraseña (los usuarios de Google podrían no tenerla)
          if (!user.password) {
            throw new Error("Este correo está registrado con Google. Inicia sesión con ese método.");
          }

          // 5. Comparar contraseñas usando bcrypt
          const passwordsMatch = await bcrypt.compare(
            credentials.password, 
            user.password
          );

          if (!passwordsMatch) {
            return null; // Contraseña incorrecta
          }

          // 6. Retornar objeto de usuario (esto se guardará en el JWT)
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: "/auth",
    error: "/auth/error", // Personaliza esta página luego
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Al iniciar sesión por primera vez, el objeto 'user' está disponible
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Inyectamos el ID del usuario en el objeto de sesión para usarlo en el frontend
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};