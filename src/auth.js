import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';

async function getUser(username) {
    try {
        const user = await sql`SELECT * FROM users WHERE username=${username}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
            const {username}=credentials;
            const user = await getUser(username);
                if (!user) return null;

                return user;

            },
        }),
    ],
    callbacks:{
        async jwt({user,token}){
            if(user){
                token.username=user.username;
                token.role=user.role;
            }
            return token;
        },
           async session({token,session}){
            if(token){
                session.username=token.username;
                session.role=token.role;
            }
            return session;
        },
    }
});