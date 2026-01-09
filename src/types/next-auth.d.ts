import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Se extiende el objeto 'session' para incluir el 'id'
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  /**
   * Se extiende el objeto 'user' para cuando lo manejas en los callbacks
   */
  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Se extiende el token JWT para que guarde el 'id'
   */
  interface JWT {
    id: string;
  }
}