import { sql } from "@vercel/postgres"; // Conector de DB
import bcrypt from "bcryptjs"; // Para comparar contraseñas
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      // 1. Esto fuerza a Google a mostrar siempre el selector de cuentas
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
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
            SELECT id, name, email, password, image
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
            throw new Error(
              "Este correo está registrado con Google. Inicia sesión con ese método.",
            );
          }

          // 5. Comparar contraseñas usando bcrypt
          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!passwordsMatch) {
            return null; // Contraseña incorrecta
          }

          // 6. Retornar objeto de usuario (esto se guardará en el JWT)
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
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
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // 1. Intentamos actualizar si ya existe, o insertar si es nuevo
          // Usamos ON CONFLICT si tienes un índice único en email,
          // si no, usamos la lógica de búsqueda manual que ya tenías:

          const result = await sql`
        SELECT id FROM users WHERE email = ${user.email} LIMIT 1
      `;

          if (result.rows.length > 0) {
            // EL USUARIO YA EXISTE: Actualizamos la foto que esté en NULL
            await sql`
          UPDATE users 
          SET image = ${user.image}, 
              name = ${user.name} 
          WHERE email = ${user.email}
        `;
            user.id = result.rows[0].id.toString();
          } else {
            // USUARIO NUEVO: Insertamos todo
            const newUser = await sql`
          INSERT INTO users (name, email, image)
          VALUES (${user.name}, ${user.email}, ${user.image})
          RETURNING id
        `;
            user.id = newUser.rows[0].id.toString();
          }
          return true;
        } catch (error) {
          console.error(
            "Error al sincronizar cuenta de Google:",
            error,
          );
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // AJUSTE 2: Mapeamos a ambas propiedades para asegurar compatibilidad
        token.image = user.image;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // AJUSTE 3: Priorizamos la imagen que viene del token
        session.user.image = (token.image || token.picture) as string;
      }
      return session;
    },
  },
};
