import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // idは省略（デフォルトで"credentials"になる）
      name: "Credentials",
      credentials: {
        username: { label: "ユーザー名", type: "text" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials) {
        // 固定の認証情報を使用（環境変数が機能しない場合の対応）
        const validUsername = "admin"
        const validPassword = "password123"

        if (!credentials?.username || !credentials?.password) {
          return null
        }

        if (credentials.username === validUsername && credentials.password === validPassword) {
          return {
            id: "1",
            name: "管理者",
            email: "admin@example.com",
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30日
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  secret: "your-fallback-secret-for-development", // 固定のシークレットを使用
  debug: true, // デバッグモードを有効化
}
